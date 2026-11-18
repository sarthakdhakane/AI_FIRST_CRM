import json

from langchain_core.messages import HumanMessage

from app.agent.llm import llm
from app.agent.prompts import EDIT_INTERACTION_PROMPT


def edit_interaction(user_message: str):

    response = llm.invoke(
        [
            HumanMessage(
                content=f"""
{EDIT_INTERACTION_PROMPT}

User:

{user_message}
"""
            )
        ]
    )

    print("========== RAW LLM RESPONSE ==========")
    print(response.content)
    print("======================================")

    return json.loads(response.content)