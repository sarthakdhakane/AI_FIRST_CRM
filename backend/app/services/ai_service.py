from app.agent.graph import graph


def process_message(message: str):

    result = graph.invoke(
        {
            "user_message": message,
            "intent": "",
            "extracted_data": {},
            "response": None,
        }
    )

    return result["response"]