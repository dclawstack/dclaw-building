"""Services package.

Business logic and service-layer functions live here.
"""

from app.services.dashboard import get_dashboard_metrics

__all__ = ["get_dashboard_metrics"]
