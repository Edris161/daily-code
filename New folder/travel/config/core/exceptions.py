from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework.exceptions import ValidationError as DRFValidationError

def custom_exception_handler(exc, context):
    """Custom exception handler for consistent error responses"""
    
    # Call REST framework's default exception handler first
    response = exception_handler(exc, context)
    
    if response is not None:
        # Customize error response format
        custom_data = {
            'success': False,
            'error': {
                'code': response.status_code,
                'message': getattr(exc, 'detail', str(exc)),
                'details': getattr(exc, 'details', None)
            }
        }
        
        # Add field errors if it's a validation error
        if isinstance(exc, DRFValidationError):
            if hasattr(exc, 'detail') and isinstance(exc.detail, dict):
                custom_data['error']['fields'] = exc.detail
        
        response.data = custom_data
    
    # Handle Django validation errors
    elif isinstance(exc, DjangoValidationError):
        response = Response(
            {
                'success': False,
                'error': {
                    'code': status.HTTP_400_BAD_REQUEST,
                    'message': 'Validation error',
                    'details': exc.message_dict if hasattr(exc, 'message_dict') else exc.messages
                }
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Handle generic exceptions
    else:
        # Log the exception for debugging
        import logging
        logger = logging.getLogger(__name__)
        logger.error(f"Unhandled exception: {exc}", exc_info=True)
        
        response = Response(
            {
                'success': False,
                'error': {
                    'code': status.HTTP_500_INTERNAL_SERVER_ERROR,
                    'message': 'Internal server error',
                    'details': str(exc) if DEBUG else None
                }
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    
    return response