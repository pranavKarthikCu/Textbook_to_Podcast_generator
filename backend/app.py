from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import pymupdf
from dotenv import load_dotenv
from gpt_conversation import generate_conversations
from tts import text_to_speech

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS so your frontend (localhost:3000 etc.) can talk to this API

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/upload", methods=["POST"])
def upload_pdf():
    try:
        # Get file and page range
        file = request.files["file"]
        start_pg = int(request.form.get("start_pg", 0))
        end_pg = int(request.form.get("end_pg", 0))

        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filepath)

        # Extract text from the given page range
        doc = pymupdf.open(filepath)
        text = ""
        for page_num in range(start_pg, end_pg + 1):
            text += doc.load_page(page_num).get_text()
        doc.close()

        # Generate the podcast-style conversation
        conversation = generate_conversations(text)

        return jsonify({"conversation": conversation})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/tts", methods=["POST"])
def tts_route():
    try:
        data = request.get_json()
        conversation = data.get("conversation", "")
        voice_id = data.get("voice_id", "XrExE9yKIg1WjnnlVkGX")  # default Rachel
        output_file = "podcast_episode1.mp3"

        text_to_speech(conversation, filename=output_file, voice_id=voice_id)

        return send_file(output_file, as_attachment=True)

    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route("/")
def index():
    return "✅ Podcast Generator API is running!"


if __name__ == "__main__":
    app.run(debug=True)
