from datetime import datetime
from app.models.schemas import IngestedAsset, SynthesizedData

class SynthesizerService:
    """Fase 3: Traducción a un Formato Común y Síntesis JSON."""
    
    @staticmethod
    def synthesize(asset: IngestedAsset, content_str: str) -> SynthesizedData:
        lines = [l.strip() for l in content_str.split('\n') if l.strip()]
        
        precios_encontrados = []
        productos_mencionados = []
        
        for line in lines:
            if '$' in line or ',' in line:
                for part in line.split():
                    clean_p = part.replace('$', '').replace('.', '').replace(',', '.')
                    try:
                        val = float(clean_p)
                        if 10 < val < 500000:
                            precios_encontrados.append(val)
                    except ValueError:
                        pass

        promedio = sum(precios_encontrados)/len(precios_encontrados) if precios_encontrados else 0.0
        precio_max = max(precios_encontrados) if precios_encontrados else 0.0
        precio_min = min(precios_encontrados) if precios_encontrados else 0.0

        resumen = f"Archivo '{asset.filename}' procesado bajo tipo {asset.tipo_economico.value}. " \
                  f"Se identificaron {len(precios_encontrados)} ítems con valores entre ${precio_min:,.2f} y ${precio_max:,.2f}."

        return SynthesizedData(
            asset_id=asset.id,
            filename=asset.filename,
            fuente=asset.fuente_informacion,
            tipo_economico=asset.tipo_economico,
            metricas={
                "total_items": len(precios_encontrados),
                "promedio_precio": round(promedio, 2),
                "precio_maximo": round(precio_max, 2),
                "precio_minimo": round(precio_min, 2),
                "lineas_leidas": len(lines)
            },
            resumen_ejecutivo=resumen,
            timestamp_sintesis=datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        )
