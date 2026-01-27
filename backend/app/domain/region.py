from dataclasses import dataclass
from typing import Optional

@dataclass
class Region:
    lat: float
    lng: float
    name: Optional[str] = None
    area_km2: float = 1.0  # Default to 1 sq km for tile analysis
    population_density: float = 0.0
