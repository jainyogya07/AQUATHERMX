from app.domain.plastic import PlasticAnalysis
from app.domain.surface import SurfaceData
from app.domain.heat import HeatIndex
from app.scoring.indices import PlasticIndexScorer, SurfaceIndexScorer, WaterDeficitScorer
from app.domain.sensor import SensorReading

class HeatEngine:
    @staticmethod
    def assess_risk(plastic: PlasticAnalysis, surface: SurfaceData, pop_density: float, sensor_data: SensorReading = None) -> HeatIndex:
        pdi = PlasticIndexScorer.calculate(plastic)
        sai = SurfaceIndexScorer.calculate(surface)
        wdi = WaterDeficitScorer.calculate(surface, pop_density)
        
        # Base Satellite Risk Score (0-10)
        satellite_risk = (pdi * 0.4) + (sai * 0.3) + (wdi * 0.3)
        
        final_risk = satellite_risk
        
        # If sensor data is available, fuse it (Ground Truth Calibration)
        if sensor_data:
            # Simple Heat Index-like component (0-10 scale approximation)
            # High temp (>35C) & High humidity (>70%) = High Risk
            temp_score = min(10, max(0, (sensor_data.ambient_temp_c - 25) * 0.8))
            
            # Fuse: 70% Satellite (Macro), 30% Sensor (Micro)
            final_risk = (satellite_risk * 0.7) + (temp_score * 0.3)

        return HeatIndex(
            plastic_density_index=pdi,
            surface_absorption_index=sai,
            water_deficit_index=wdi,
            urban_risk_index=round(final_risk, 2)
        )
