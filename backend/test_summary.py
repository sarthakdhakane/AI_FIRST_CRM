from app.agent.graph import graph

result = graph.invoke(
    {
        "user_message": "Summarize today's interaction.",
        "intent": "",
        "extracted_data": {},
        "response": None,
    }
)

print(result)