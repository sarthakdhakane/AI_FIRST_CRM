from app.agent.graph import graph

result = graph.invoke(
    {
        "user_message": "Actually the doctor's name was Dr Amit Sharma.",
        "intent": "",
        "extracted_data": {},
        "response": None,
    }
)

print(result)