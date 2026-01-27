from dataclasses import dataclass

@dataclass
class SurfaceData:
    surface_temp_c: float
    green_cover_index: float # 0.0 to 1.0 (NDVI proxy)
    impervious_surface_index: float # 0.0 to 1.0 (Concrete/Asphalt coverage)
