from django.db import models
from players.models import Player

class FeePlan(models.Model):
    name = models.CharField(max_length=50)  # Monthly, Quarterly
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    duration_months = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.name} - {self.amount}"


class PlayerFee(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    fee_plan = models.ForeignKey(FeePlan, on_delete=models.CASCADE)
    start_date = models.DateField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.player} - {self.fee_plan}"


class Payment(models.Model):
    player_fee = models.ForeignKey(PlayerFee, on_delete=models.CASCADE)
    paid_amount = models.DecimalField(max_digits=8, decimal_places=2)
    paid_on = models.DateField(auto_now_add=True)
    method = models.CharField(max_length=50)  # Cash, Card

    def __str__(self):
        return f"{self.player_fee.player} - {self.paid_amount}"
