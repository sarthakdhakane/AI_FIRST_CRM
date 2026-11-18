from typing import Any, Optional, TypedDict


class AgentState(TypedDict):
    user_message: str
    intent: str
    extracted_data: dict
    response: Optional[Any]
