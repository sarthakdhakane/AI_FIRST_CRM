import json
import re

from langchain_core.messages import HumanMessage

from app.agent.llm import llm
from app.agent.memory import get_interaction


def summarize_interaction():

    interaction = get_interaction()

    if not interaction:
        return {
            "operation": "summary",
            "summary": "No interaction available to summarize."
        }

    prompt = f"""
You are an expert Pharmaceutical CRM Assistant.

Summarize the following interaction.

Interaction:

{json.dumps(interaction, indent=2)}

Return ONLY valid JSON.

Schema:

{{
    "operation":"summary",
    "summary":""
}}
"""

    response = llm.invoke([HumanMessage(content=prompt)])

    content = response.content.strip()

    # Remove markdown code fences
    content = re.sub(r"^```json\s*", "", content)
    content = re.sub(r"^```\s*", "", content)
    content = re.sub(r"\s*```$", "", content)

    return json.loads(content)