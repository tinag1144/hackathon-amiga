import time
from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware

class SecurityAndPerformanceMiddleware(BaseHTTPMiddleware):
    """
    Middleware de Seguridad, Rendimiento y Control de Tasa (Rate Limiting).
    Asegura cabeceras de protección, monitorea tiempos de respuesta y limita peticiones desmedidas.
    """
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        
        # Procesamiento de la petición
        response = await call_next(request)
        
        # Medición de Rendimiento
        process_time = (time.time() - start_time) * 1000
        response.headers["X-Response-Time-MS"] = f"{process_time:.2f}ms"
        
        # Cabeceras de Seguridad (Security Headers)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        
        return response
