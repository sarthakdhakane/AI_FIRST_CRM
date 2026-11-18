import logging

from langgraph.graph import StateGraph, START, END

from app.agent.state import AgentState

from app.agent.tools.intent_classifier import classify_intent
from app.agent.tools.log_interaction import log_interaction
from app.agent.tools.edit_interaction import edit_interaction
from app.agent.tools.search_hcp import search_hcp
from app.agent.tools.summarize import summarize_interaction
from app.agent.tools.followup import suggest_followup
from app.agent.memory import save_interaction
from app.agent.memory import update_interaction
from app.services.database_service import (
    save_interaction_to_db,
    update_interaction_in_db,
)

logger = logging.getLogger(__name__)

ALLOWED_INTENTS = frozenset(
    {"extract", "edit", "search", "summary", "followup", "unknown"}
)

UNKNOWN_INTENT_RESPONSE = """I'm designed to help with CRM interaction logging. I can:
• Extract interaction details
• Edit interaction fields
• Search previous interactions
• Summarize interactions
• Suggest follow-up actions"""

# -----------------------------
# Intent Detection
# -----------------------------
def detect_intent(state: AgentState):
    try:
        intent = classify_intent(state["user_message"])
        if not isinstance(intent, str):
            intent = "unknown"
        else:
            intent = intent.strip().lower()
        if intent not in ALLOWED_INTENTS:
            intent = "unknown"
    except Exception:
        logger.exception("Intent detection failed; defaulting to unknown")
        intent = "unknown"

    logger.info("Selected intent route: %s", intent)
    state["intent"] = intent

    return state


# -----------------------------
# Log Interaction Tool
# -----------------------------
def log_node(state: AgentState):

    print("========== LOG NODE ==========")

    result = log_interaction(state["user_message"])

    print("LLM RESULT:")
    print(result)

    save_interaction(result)
    print("✅ Saved to Memory")

    save_interaction_to_db(result)
    print("✅ Saved to PostgreSQL")

    state["response"] = result

    return state


# -----------------------------
# Edit Interaction Tool
# -----------------------------
def edit_node(state: AgentState):

    result = edit_interaction(state["user_message"])

    # Update memory
    update_interaction(
        result["field"],
        result["value"],
    )

    # Update PostgreSQL
    update_interaction_in_db(
        result["field"],
        result["value"],
    )

    state["response"] = result

    return state


# -----------------------------
# Search HCP Tool
# -----------------------------
def search_node(state: AgentState):

    result = search_hcp(state["user_message"])

    state["response"] = result

    return state


# -----------------------------
# Summary Tool (Placeholder)
# -----------------------------
def summarize_node(state: AgentState):

    result = summarize_interaction()

    state["response"] = result

    return state


# -----------------------------
# Follow-up Tool (Placeholder)
# -----------------------------
def followup_node(state: AgentState):

    result = suggest_followup()

    state["response"] = result

    return state


# -----------------------------
# Unknown Intent Handler
# -----------------------------
def unknown_node(state: AgentState):
    logger.info("Handling unknown intent")
    state["response"] = UNKNOWN_INTENT_RESPONSE
    return state


# -----------------------------
# Router
# -----------------------------
def route(state: AgentState):
    try:
        intent = state.get("intent", "unknown")
        if not isinstance(intent, str):
            intent = "unknown"
        intent = intent.strip().lower()
        selected_route = intent if intent in ALLOWED_INTENTS else "unknown"
    except Exception:
        logger.exception("Intent routing failed; defaulting to unknown")
        selected_route = "unknown"

    logger.info("Selected graph route: %s", selected_route)
    return selected_route


builder = StateGraph(AgentState)

builder.add_node("intent", detect_intent)

builder.add_node("log_interaction", log_node)

builder.add_node("edit_interaction", edit_node)

builder.add_node("search_hcp", search_node)

builder.add_node("summarize_interaction", summarize_node)

builder.add_node("suggest_followup", followup_node)

builder.add_node("unknown", unknown_node)


builder.add_edge(START, "intent")


builder.add_conditional_edges(
    "intent",
    route,
    {
        "extract": "log_interaction",
        "edit": "edit_interaction",
        "search": "search_hcp",
        "summary": "summarize_interaction",
        "followup": "suggest_followup",
        "unknown": "unknown",
    },
)


builder.add_edge("log_interaction", END)
builder.add_edge("edit_interaction", END)
builder.add_edge("search_hcp", END)
builder.add_edge("summarize_interaction", END)
builder.add_edge("suggest_followup", END)
builder.add_edge("unknown", END)

graph = builder.compile()
