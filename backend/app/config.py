import os

class Settings:
    PROJECT_NAME: str = "AMIGA - Análisis y Manejo de Información para la Gestión Autónoma"
    VERSION: str = "1.0.0"
    LAYA_MODEL_VERSION: str = "Laya-v2.5-Formosa"
    API_PREFIX: str = "/api"
    
    # Feature Flag de N8N: se puede poner en False si no se desea usar n8n
    ENABLE_N8N_WEBHOOK: bool = True

settings = Settings()
