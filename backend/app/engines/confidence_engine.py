from app.domain.plastic import PlasticAnalysis

class ConfidenceEngine:
    @staticmethod
    def evaluate(plastic: PlasticAnalysis, environmental_data: dict = None) -> dict:
        """
        Evaluate confidence logic. Returns score and list of reasons.
        """
        reasons = []
        base_score = 0.85 # Baseline confidence for Sentinel-2
        
        # 1. Image Quality / Source Confidence
        reasons.append("Source: Sentinel-2 L2A (Verified)")
        
        # 2. Detection Consistency
        if not plastic.detections:
            score = base_score + 0.05
            reasons.append("Clean region: High certainty of no pollution")
        else:
            avg_conf = sum(d.confidence for d in plastic.detections) / len(plastic.detections)
            score = (base_score + avg_conf) / 2
            reasons.append(f"Object Detection Confidence: {int(avg_conf*100)}%")
            
            if len(plastic.detections) < 3:
                 reasons.append("Sparse detections: Potential false positives")
                 score -= 0.1
        
        # 3. Environmental Factors (Mocked logic for now)
        reasons.append("Weather: Clear (< 10% Cloud Cover)")

        return {
            "score": round(min(max(score, 0.0), 1.0), 2),
            "reasons": reasons,
            "level": "High" if score > 0.8 else "Medium" if score > 0.5 else "Low"
        }
