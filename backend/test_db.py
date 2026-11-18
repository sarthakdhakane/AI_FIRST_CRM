from app.database.database import SessionLocal
from app.models.interaction import Interaction

db = SessionLocal()

interaction = Interaction(
    hcpName="Test Doctor",
    interactionType="Meeting",
    interactionDate="15 Jul 2026",
)

db.add(interaction)
db.commit()
db.refresh(interaction)

print("✅ Database Insert Successful")
print(interaction.id)

db.close()