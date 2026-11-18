import json
import re

from langchain_core.messages import HumanMessage

from app.agent.llm import llm
from app.agent.memory import get_interaction


def suggest_followup():

    interaction = get_interaction()

    if not interaction:
        return {
            "operation": "followup",
            "followUps": [
                "No interaction found."
            ]
        }

    prompt = f"""
You are an expert Pharmaceutical CRM Assistant.

The following interaction has already happened.

Interaction:

{json.dumps(interaction, indent=2)}

Generate 3-5 professional follow-up actions.

Return ONLY valid JSON.

Schema:

{{
    "operation":"followup",
    "followUps":[
        "",
        "",
        ""
    ]
}}
"""

    response = llm.invoke(
        [
            HumanMessage(content=prompt)
        ]
    )

    content = response.content.strip()

    # Remove markdown code fences
    content = re.sub(r"^```json\s*", "", content)
    content = re.sub(r"^```\s*", "", content)
    content = re.sub(r"\s*```$", "", content)

    return json.loads(content)