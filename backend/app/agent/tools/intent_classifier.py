import logging

from langchain_core.messages import HumanMessage

from app.agent.llm import llm
from app.agent.prompts import INTENT_PROMPT

logger = logging.getLogger(__name__)

ALLOWED_INTENTS = frozenset(
    {"extract", "edit", "search", "summary", "followup", "unknown"}
)


def classify_intent(user_message: str):
    """Return a safe, canonical intent for LangGraph routing."""
    raw_response = ""

    try:
        response = llm.invoke(
            [
                HumanMessage(
                    content=f"""
{INTENT_PROMPT}

User:

{user_message}
"""
                )
            ]
        )
        raw_response = getattr(response, "content", "")
        if not isinstance(raw_response, str):
            raw_response = str(raw_response)
    except Exception:
        logger.exception("Intent classification failed; defaulting to unknown")
        logger.info("Intent raw LLM response: %r", raw_response)
        logger.info("Intent normalized: unknown")
        return "unknown"

    normalized_intent = raw_response.strip().lower()
    if normalized_intent not in ALLOWED_INTENTS:
        normalized_intent = "unknown"

    logger.info("Intent raw LLM response: %r", raw_response)
    logger.info("Intent normalized: %s", normalized_intent)
    return normalized_intent
