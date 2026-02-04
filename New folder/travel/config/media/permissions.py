from rest_framework import permissions

class IsOwnerOrAdmin(permissions.BasePermission):
    """Permission to only allow owners or admins to access media"""
    def has_object_permission(self, request, view, obj):
        # Admin and staff can access
        if request.user.is_staff_member:
            return True
        
        # Users can access their own uploads
        return obj.uploaded_by == request.user

class CanUploadMedia(permissions.BasePermission):
    """Permission to check if user can upload media"""
    def has_permission(self, request, view):
        # Only authenticated users can upload
        if request.method == 'POST':
            return request.user and request.user.is_authenticated
        return True