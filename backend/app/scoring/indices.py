from app.domain.plastic import PlasticAnalysis
from app.domain.surface import SurfaceData

class PlasticIndexScorer:
    @staticmethod
    def calculate(analysis: PlasticAnalysis) -> float:
        # PDI: Plastic Density Index
        # Simplified logic: Density score is already 0-10 from vision engine
        return round(analysis.density_score, 2)

class SurfaceIndexScorer:
    @staticmethod
    def calculate(data: SurfaceData) -> float:
        # SAI: Surface Absorption Index
        # High absorption (concrete/asphalt) = High Score
        # High green cover = Low Score
        
        # Formula: (Impervious * 0.7) + (1 - GreenCover) * 0.3 -> scaled to 10
        raw_score = (data.impervious_surface_index * 7.0) + ((1.0 - data.green_cover_index) * 3.0)
        return round(max(0, min(raw_score, 10)), 2)

class WaterDeficitScorer:
    @staticmethod
    def calculate(data: SurfaceData, population_density: float) -> float:
        # WDI: Water Deficit Index
        # High Temp + High Pop + Low Green = High Deficit Risk
        
        # Normalize Temp (20C - 50C range) -> 0-1
        temp_factor = max(0, min((data.surface_temp_c - 20) / 30, 1.0))
        
        # Normalize Pop (0 - 10000 range) -> 0-1
        pop_factor = max(0, min(population_density / 10000, 1.0))
        
        score = (temp_factor * 6.0) + (pop_factor * 4.0)
        return round(score, 2)
