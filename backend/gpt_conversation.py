import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_conversations(txtbook_txt):
    prompt = f"""
    You are generating a podcast styled conversation between two people, Alex(the learner) and Sam(the explainer). Alex asks
    curious and relevant questions about the content of the text, and Sam provides detailed explanations - as if explaining the concept from
    textbook in a friendly and conversational manner. The conversation should be engaging, informative, and easy to understand.

    Textbook content:
    {txtbook_txt}

    Instructions:
    - Use casual but intelligent language
    - Limit each speaker's turn to 2–4 sentences
    - Break down technical terms using analogies or simple examples
    - Include follow-up questions and clarifications from Alex

    Format the output like this:
    Alex: ...
    Sam: ...
    """

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant", 
        messages=[
            {"role": "user", "content": prompt}
        ],
        max_tokens=1024,
        temperature=0.7
    )

    return response.choices[0].message.content
