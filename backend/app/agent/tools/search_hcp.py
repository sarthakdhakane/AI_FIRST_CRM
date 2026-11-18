import json

from langchain_core.messages import HumanMessage

from app.agent.llm import llm
from app.agent.prompts import SEARCH_HCP_PROMPT

from app.services.database_service import search_interactions_from_db


def search_hcp(user_message: str):

    response = llm.invoke(
        [
            HumanMessage(
                content=f"""
{SEARCH_HCP_PROMPT}

User:

{user_message}
"""
            )
        ]
    )

    data = json.loads(response.content)

    hcp_name = data["hcpName"]

    interactions = search_interactions_from_db(hcp_name)

    results = []

    for interaction in interactions:

        results.append(
    {
        "hcpName": interaction.hcpName,
        "interactionType": interaction.interactionType,
        "date": interaction.interactionDate,
        "time": interaction.interactionTime,
        "topic": interaction.topicsDiscussed,
        "materialsShared": interaction.materialsShared,
        "sentiment": interaction.sentiment,
        "outcome": interaction.outcomes,
    }
)

    return {
        "operation": "search",
        "hcpName": hcp_name,
        "results": results,
    }