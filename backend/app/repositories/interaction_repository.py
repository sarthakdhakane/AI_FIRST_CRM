import json

from sqlalchemy.orm import Session

from app.models.interaction import Interaction


def save_interaction(db: Session, data: dict):

    interaction = Interaction(
        hcpName=data.get("hcpName"),
        interactionType=data.get("interactionType"),
        interactionDate=data.get("interactionDate"),
        interactionTime=data.get("interactionTime"),
        attendees=data.get("attendees"),
        topicsDiscussed=data.get("topicsDiscussed"),
        voiceSummary=data.get("voiceSummary"),
        materialsShared=data.get("materialsShared"),
        samplesDistributed=data.get("samplesDistributed"),
        sentiment=data.get("sentiment"),
        outcomes=data.get("outcomes"),
        followUpActions=data.get("followUpActions"),
        # The API uses an array; PostgreSQL currently stores this column as Text.
        # Serialize it explicitly so existing migrations and search keep working.
        aiSuggestedFollowUps=json.dumps(data.get("aiSuggestedFollowUps", [])),
    )

    db.add(interaction)
    db.commit()
    db.refresh(interaction)

    return interaction


# -----------------------------
# Search Interactions
# -----------------------------
def search_interactions(db: Session, hcp_name: str):

    return (
        db.query(Interaction)
        .filter(Interaction.hcpName.ilike(f"%{hcp_name}%"))
        .all()
    )

def update_interaction(db: Session, field: str, value: str):

    interaction = (
        db.query(Interaction)
        .order_by(Interaction.id.desc())
        .first()
    )

    if interaction is None:
        return None

    setattr(interaction, field, value)

    db.commit()
    db.refresh(interaction)

    return interaction
