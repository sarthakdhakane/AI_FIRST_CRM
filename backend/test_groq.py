import os
from dotenv import load_dotenv

from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage

load_dotenv()

llm = ChatGroq(
    model=os.getenv("MODEL_NAME"),
    groq_api_key=os.getenv("GROQ_API_KEY"),
    temperature=0,
)

response = llm.invoke(
    [
        HumanMessage(
            content="Say hello in exactly one sentence."
        )
    ]
)

print(response.content)