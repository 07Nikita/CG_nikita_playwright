import os
from dotenv import load_dotnev
from langchain_groq import ChatGroq

load_dotenv()

groq_api_key=os.getenv("GROQ_API_KEY")

if not groq_api_key:
    raise ValueError("GROQ_API_KEY not found. Check your .env file.")

    llm=ChatGroq(
        model="openai/gpt-oss-120b",
        temperature=0.2,
        max_tokens=2000,
        groq_api_key=groq_api_key
    )