from app.database.database import SessionLocal
from app.repositories.interaction_repository import (
    save_interaction,
    search_interactions,
    update_interaction,
)


def save_interaction_to_db(data):

    db = SessionLocal()

    try:
        save_interaction(db, data)
    finally:
        db.close()


def search_interactions_from_db(hcp_name):

    db = SessionLocal()

    try:
        return search_interactions(db, hcp_name)
    finally:
        db.close()

def update_interaction_in_db(field, value):

    db = SessionLocal()

    try:
        return update_interaction(db, field, value)
    finally:
        db.close()