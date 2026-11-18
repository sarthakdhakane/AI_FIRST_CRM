from sqlalchemy import Column, Integer, String, Text

from app.database.database import Base


class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)

    hcpName = Column(String(255))
    interactionType = Column(String(100))
    interactionDate = Column(String(100))
    interactionTime = Column(String(100))
    attendees = Column(Text)
    topicsDiscussed = Column(Text)
    voiceSummary = Column(Text)
    materialsShared = Column(Text)
    samplesDistributed = Column(Text)
    sentiment = Column(String(100))
    outcomes = Column(Text)
    followUpActions = Column(Text)
    aiSuggestedFollowUps = Column(Text)