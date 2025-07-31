import requests
import os


def generate_conversations(txtbook_txt):
    prompt = f"""
    You are generating a podcast styled conversation between two people, Alex(the learner) and Sam(the explainer). Alex asks
    curious and relevant questions about the content of the text, and Sam provides detailed explanations - as if explaining the concept from
    textbook in a friendly and conversational manner. The conversation should be engaging, informative, and easy to understand.

    Textbook content:
    {txtbook_txt}

    Instructions:
    - Use casual but intelligent language
    - Limit each speaker’s turn to 2–4 sentences
    - Break down technical terms using analogies or simple examples
    - Include follow-up questions and clarifications from Alex

    Format the output like this:
    Alex: ...
    Sam: ...
    """

    headers = { 
            "Authorization" : f"Bearer {os.getenv('TOGETHER_API_KEY')}",
            "Content-Type": "application/json"
        }
    
    data = {
        "model": "mistralai/Mixtral-8x7B-Instruct-v0.1",  
        "prompt": prompt,
        "max_tokens": 1024,
        "temperature": 0.7
    }

    response = requests.post(
        "https://api.together.xyz/v1/completions",
        headers=headers,
        json=data
    )

    if response.status_code == 200:
        return response.json()["choices"][0]["text"]
    else:
        return f"Error: {response.status_code}, {response.text}"