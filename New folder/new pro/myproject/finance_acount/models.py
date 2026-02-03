from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

class Wallet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    balance_total = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    balance_escrow = models.DecimalField(max_digits=12, decimal_places=2, default=0)  # Locked
    balance_available = models.DecimalField(max_digits=12, decimal_places=2, default=0)  # قابل برداشت

    def __str__(self):
        return f"{self.user.username} Wallet"

class Transaction(models.Model):
    TRANSACTION_TYPE = [
        ('in', 'Credit'),
        ('out', 'Debit'),
    ]
    CATEGORY_CHOICES = [
        ('order_payment', 'Order Payment'),
        ('commission', 'Commission'),
        ('payout', 'Payout'),
        ('refund', 'Refund'),
        ('adjustment', 'Adjustment'),
    ]
    PAYMENT_METHOD = [
        ('internal', 'Internal'),
        ('bank', 'Bank Transfer'),
    ]
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('paid', 'Paid'),
    ]

    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE, related_name='transactions')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    type = models.CharField(max_length=3, choices=TRANSACTION_TYPE)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    payment_method = models.CharField(max_length=10, choices=PAYMENT_METHOD)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    related_order = models.ForeignKey('Order', null=True, blank=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    admin_note = models.TextField(blank=True, null=True)  # Optional internal note

    def __str__(self):
        return f"Transaction {self.id} - {self.wallet.user.username}"

class PayoutRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('paid', 'Paid'),
    ]
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE, related_name='payout_requests')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    payment_method = models.CharField(max_length=10, choices=[('internal','Internal'),('bank','Bank')])
    bank_account = models.CharField(max_length=50, blank=True, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    receipt_file = models.FileField(upload_to='payout_receipts/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"PayoutRequest {self.id} - {self.wallet.user.username}"

class Order(models.Model):
    order_number = models.CharField(max_length=50, unique=True)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)
    paid_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    commission = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    seller_share = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    
    PAYMENT_STATUS = [
        ('unpaid', 'Unpaid'),
        ('paid', 'Paid'),
        ('refunded', 'Refunded'),
    ]
    FUND_RELEASE_STATUS = [
        ('locked', 'Locked'),
        ('released', 'Released'),
    ]

    payment_status = models.CharField(max_length=10, choices=PAYMENT_STATUS, default='unpaid')
    fund_release_status = models.CharField(max_length=10, choices=FUND_RELEASE_STATUS, default='locked')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.order_number}"

class FinancialAlert(models.Model):
    ALERT_TYPE = [
        ('payout_request', 'New Payout Request'),
        ('pending_payment', 'Pending Payment'),
        ('suspicious', 'Suspicious Transaction'),
    ]
    alert_type = models.CharField(max_length=20, choices=ALERT_TYPE)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
