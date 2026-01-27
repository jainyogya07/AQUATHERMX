from PIL import Image
from app.domain.region import Region
from app.domain.surface import SurfaceData
from app.engines.vision_engine import VisionEngine
from app.engines.heat_engine import HeatEngine
from app.engines.water_engine import WaterEngine
from app.engines.confidence_engine import ConfidenceEngine
from app.engines.sensor_engine import SensorEngine
from app.infra.sentinel_service import sentinel_service
from app.schemas.report import AnalysisReport
import random 

class UrbanHeatPipeline:
    def __init__(self):
        self.vision_engine = VisionEngine()
        self.sentinel_service = sentinel_service
        
    def run(self, image: Image.Image = None, region: Region = None, simulation_mode: str = None, simulation_factor: float = 1.0) -> AnalysisReport:
        # 0. Infrastructure Layer: Fetch Satellite Data if no image provided
        if image is None:
            if region is None:
                raise ValueError("Region context required to fetch satellite data")
            image = self.sentinel_service.get_satellite_image(region)

        # 1. Vision Engine: Detect Plastic
        plastic_analysis = self.vision_engine.analyze(image)
        
        # --- SIMULATION INTERVENTION ---
        # --- SIMULATION INTERVENTION ---
        if simulation_mode == "cleanup":
            # Apply reduction factor (e.g., factor 0.7 means we KEEP 70%, remove 30%)
            # OR factor denotes REMOVAL? Let's stick to factor = Fraction remaining for simplicity in math, 
            # BUT for UI slider (0-100% removal), we might receive "remova_rate".
            # Let's assume simulation_factor is "Fraction of Plastic Remaining" (1.0 = all, 0.0 = none)
            
            plastic_analysis.object_count = int(plastic_analysis.object_count * simulation_factor)
            plastic_analysis.density_score = plastic_analysis.density_score * simulation_factor
            
            # Filter detections logic (optional, randomly drop detections)
            if simulation_factor < 1.0:
                 import random
                 plastic_analysis.detections = [d for d in plastic_analysis.detections if random.random() < simulation_factor]
        # -------------------------------
        # -------------------------------
        
        # 2. Mock Infrastructure Data Fetching (Phase 3 will make this real)
        # We need SurfaceData for the HeatEngine
        surface_data = self._fetch_surface_data_stub(region)
        
        # 2a. Sensor Engine: Get Ground Truth
        sensor_readings = SensorEngine.get_readings(region)

        # 3. Heat Engine: Calculate Risk/Indices (Fused with Sensor Data)
        heat_index = HeatEngine.assess_risk(
            plastic_analysis, 
            surface_data, 
            region.population_density,
            sensor_data=sensor_readings
        )
        
        # 4. Water Engine: Generate Interventions
        interventions = WaterEngine.recommend_interventions(heat_index)
        
        # 5. Confidence Engine
        confidence = ConfidenceEngine.evaluate(plastic_analysis)
        
        return AnalysisReport(
            region=region,
            plastic=plastic_analysis,
            heat_index=heat_index,
            interventions=interventions,
            confidence=confidence,
            sensor_readings=sensor_readings
        )
        
    def _fetch_surface_data_stub(self, region: Region) -> SurfaceData:
        # Mocking data fetching based on region or random for demo
        return SurfaceData(
            surface_temp_c=random.uniform(25.0, 45.0),
            green_cover_index=random.uniform(0.1, 0.6),
            impervious_surface_index=random.uniform(0.4, 0.9)
        )

# Singleton instance
pipeline = UrbanHeatPipeline()
