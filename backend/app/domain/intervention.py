from dataclasses import dataclass
from enum import Enum

class UrgencyLevel(Enum):
    LOW = "low"
    MODERATE = "moderate"
    HIGH = "high"
    CRITICAL = "critical"

class ActionType(Enum):
    CLEANUP = "cleanup"
    COOLING = "cooling"
    DRAINAGE = "drainage"
    POLICY = "policy"

@dataclass
class Intervention:
    title: str
    description: str
    urgency: UrgencyLevel
    action_type: ActionType
    estimated_impact: str  # e.g., "Reduces local temp by 2C"
