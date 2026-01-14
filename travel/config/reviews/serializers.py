from rest_framework import serializers
from .models import Review
from accounts.serializers import UserProfileSerializer

class ReviewSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(read_only=True)
    can_edit = serializers.SerializerMethodField()
    
    class Meta:
        model = Review
        fields = ['id', 'user', 'tour', 'rating', 'comment', 'created_at', 'can_edit']
        read_only_fields = ['user', 'created_at']
    
    def get_can_edit(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.user == request.user or request.user.is_staff
        return False
    
    def validate(self, data):
        request = self.context.get('request')
        tour = data.get('tour') or self.instance.tour if self.instance else None
        
        if request and request.user.is_authenticated and tour:
            # Check if user already reviewed this tour
            existing_review = Review.objects.filter(
                user=request.user,
                tour=tour
            ).exists()
            
            if existing_review and not self.instance:
                raise serializers.ValidationError(
                    "You have already reviewed this tour"
                )
        
        return data
    
    def create(self, validated_data):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            validated_data['user'] = request.user
        
        return super().create(validated_data)

class ReviewCreateSerializer(serializers.ModelSerializer):
    tour_slug = serializers.SlugRelatedField(
        source='tour',
        queryset=Review.objects.all(),
        slug_field='slug',
        write_only=True
    )
    
    class Meta:
        model = Review
        fields = ['tour_slug', 'rating', 'comment']
    
    def validate_rating(self, value):
        if not 1 <= value <= 5:
            raise serializers.ValidationError("Rating must be between 1 and 5")
        return value