from pydantic import BaseModel, Field


class InteractionResponse(BaseModel):
    """Canonical payload returned for a logged interaction."""

    hcpName: str = ""
    interactionType: str = ""
    interactionDate: str = ""
    interactionTime: str = ""
    attendees: str = ""
    topicsDiscussed: str = ""
    voiceSummary: str = ""
    materialsShared: str = ""
    samplesDistributed: str = ""
    sentiment: str = ""
    outcomes: str = ""
    followUpActions: str = ""
    aiSuggestedFollowUps: list[str] = Field(default_factory=list)
