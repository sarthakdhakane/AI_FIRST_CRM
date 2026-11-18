import json

from langchain_core.messages import HumanMessage

from app.agent.llm import llm
from app.agent.prompts import LOG_INTERACTION_PROMPT
from app.schemas.interaction import InteractionResponse


def _parse_interaction_response(content: str) -> dict:
    """Validate and normalize the LLM result before it reaches the API/UI."""
    content = content.strip()
    if content.startswith("```"):
        content = content.removeprefix("```json").removeprefix("```").strip()
        if content.endswith("```"):
            content = content[:-3].strip()

    try:
        payload = json.loads(content)
    except json.JSONDecodeError as error:
        raise ValueError("The interaction extractor returned invalid JSON.") from error

    if not isinstance(payload, dict):
        raise ValueError("The interaction extractor must return a JSON object.")

    follow_ups = payload.get("aiSuggestedFollowUps", [])
    if isinstance(follow_ups, str):
        payload["aiSuggestedFollowUps"] = [
            item.strip(" -0123456789.\t")
            for item in follow_ups.splitlines()
            if item.strip()
        ]
    elif follow_ups is None:
        payload["aiSuggestedFollowUps"] = []

    # Pydantic supplies omitted fields and rejects a response with the wrong
    # field types, giving the frontend one predictable schema.
    return InteractionResponse.model_validate(payload).model_dump()


def log_interaction(user_message: str):

    # Groq JSON mode constrains the model response to a JSON object. The prompt
    # still defines the exact keys and extraction policy.
    response = llm.bind(response_format={"type": "json_object"}).invoke(
        [
            HumanMessage(
                content=f"""
{LOG_INTERACTION_PROMPT}

User Message:

{user_message}
"""
            )
        ]
    )

    print("========== RAW LOG RESPONSE ==========")
    print(response.content)
    print("======================================")

    return _parse_interaction_response(response.content)
