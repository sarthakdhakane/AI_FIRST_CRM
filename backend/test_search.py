from app.agent.graph import graph

result = graph.invoke(
    {
        "user_message": "Show previous interactions with Dr Rahul Sharma",
        "intent": "",
        "extracted_data": {},
        "response": None,
    }
)

print(result)