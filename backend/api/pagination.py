from rest_framework.pagination import PageNumberPagination


class CustomPageNumberPagination(PageNumberPagination):
    """
    Custom pagination class that allows page_size to be overridden via query parameter.
    """
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


