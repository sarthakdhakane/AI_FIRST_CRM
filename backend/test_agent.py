from app.agent.graph import graph

result = graph.invoke(
    {
        "user_message": "Today I met Dr Rahul Sharma. We discussed CardioX. I gave him two brochures. He showed positive interest.",
        "intent": "",
        "extracted_data": {},
        "response": None,
    }
)

print(result)