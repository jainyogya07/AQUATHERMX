from dataclasses import dataclass

@dataclass
class HeatIndex:
    plastic_density_index: float  # PDI (0-10)
    surface_absorption_index: float # SAI (0-10)
    water_deficit_index: float # WDI (0-10)
    
    # Aggregated Score
    urban_risk_index: float # 0-10
