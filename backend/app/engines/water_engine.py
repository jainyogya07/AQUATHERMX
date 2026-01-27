from typing import List
from app.domain.heat import HeatIndex
from app.domain.intervention import Intervention, ActionType, UrgencyLevel

class WaterEngine:
    @staticmethod
    def recommend_interventions(heat_index: HeatIndex) -> List[Intervention]:
        interventions = []
        
        # Rule-based Logic
        
        # 1. High Plastic -> Cleanup
        if heat_index.plastic_density_index > 6.0:
            interventions.append(Intervention(
                title="Targeted Plastic Cleanup",
                description="High accumulation of plastic detected causing heat retention.",
                urgency=UrgencyLevel.CRITICAL if heat_index.plastic_density_index > 8 else UrgencyLevel.HIGH,
                action_type=ActionType.CLEANUP,
                estimated_impact="Reduces local surface temp by ~0.5-1.0°C"
            ))
            
        # 2. High Surface Absorption + High Temp -> Mist Cooling
        if heat_index.surface_absorption_index > 7.0 and heat_index.water_deficit_index > 5.0:
            interventions.append(Intervention(
                title="Mist Cooling Deployment",
                description="Area has high surface absorption and heat stress.",
                urgency=UrgencyLevel.HIGH,
                action_type=ActionType.COOLING,
                estimated_impact="Instant ambient temp drop of 3-5°C"
            ))
            
        # 3. Moderate Risk -> Policy/Drainage
        if heat_index.urban_risk_index > 4.0 and heat_index.plastic_density_index > 3.0:
             interventions.append(Intervention(
                title="Drainage Inspection",
                description="Plastic waste may be clogging nearby drainage.",
                urgency=UrgencyLevel.MODERATE,
                action_type=ActionType.DRAINAGE,
                estimated_impact="Prevents waterlogging and vector-borne diseases"
            ))
            
        return interventions
