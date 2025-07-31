import requests
import os
from dotenv import load_dotenv

load_dotenv()
ELEVEN_API_KEY = os.getenv('ELEVEN_API_KEY')
VOICE = "XrExE9yKIg1WjnnlVkGX" 

def text_to_speech(text, filename="output.mp3", voice_id="XrExE9yKIg1WjnnlVkGX"):
    if not ELEVEN_API_KEY:
        raise ValueError("ELEVEN_API_KEY is not set.")

    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
    
    headers = {
        "xi-api-key": ELEVEN_API_KEY,
        "Content-Type": "application/json"
    }

    payload = {
        "text": text,
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.75
        }
    }

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        with open(filename, "wb") as f:
            f.write(response.content)
        print(f"✅ Audio saved to {filename}")
    else:
        print(f"❌ Error: {response.status_code}")
        print(response.text)    
