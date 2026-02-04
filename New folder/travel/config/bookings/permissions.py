from rest_framework import permissions

class IsOwnerOrAdmin(permissions.BasePermission):
    """Permission to only allow owners or admins to access"""
    def has_object_permission(self, request, view, obj):
        # Admin and staff can access
        if request.user.is_staff_member:
            return True
        
        # Users can access their own bookings
        if hasattr(obj, 'user'):
            return obj.user == request.user
        
        return False

class IsAdminOrStaff(permissions.BasePermission):
    """Permission to only allow admin or staff"""
    def has_permission(self, request, view):
        return request.user and request.user.is_staff_member