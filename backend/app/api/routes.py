from fastapi import APIRouter

from app.schemas.chat import ChatRequest
from app.services.ai_service import process_message

router = APIRouter()


@router.post("/chat")
async def chat(request: ChatRequest):

    result = process_message(request.message)

    return result