import pymupdf
import os
from dotenv import load_dotenv
from gpt_conversation import generate_conversations
from tts import text_to_speech


# Load environment variables from .env file
load_dotenv()


#upload textbook and convert to text
def upload_txtbook(path, start_pg=0, end_pg=0):
    doc = pymupdf.open(path)
    txt = ''
    for page_num in range(start_pg,end_pg+1):
        page = doc.load_page(page_num)
        #print("page", page)
        txt += page.get_text()
    doc.close()
    return txt
#file path 
file_p = r"C:\Users\prana\Downloads\Invoice_3D87XEAJMAA.pdf"

#extract text from the textbook
txtbook_txt = upload_txtbook(file_p,0)
#print("txtbook",txtbook_txt)

#generate conversations
conversations = generate_conversations(txtbook_txt)

print("Podcast Conversations:", conversations)

#text to speech

print("\n🎧 Converting to speech...\n")
text_to_speech(conversations, filename="podcast_episode1.mp3")