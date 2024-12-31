import os
from dotenv import load_dotenv

from deepgram import (
    DeepgramClient,
    PrerecordedOptions,
    FileSource,
)

load_dotenv()
# Path to the audio file
# AUDIO_FILE = "temp_audio.mp3"

API_KEY = '6973b0fba4107fd8209f2b3b557b9bf39a469a19'

def transcribe_audio(file):
    # Create a Deepgram client using the API key
    deepgram = DeepgramClient(API_KEY)

    # Read the file data directly from InMemoryUploadedFile
    buffer_data = file.read()

    payload: FileSource = {
        "buffer": buffer_data,
    }

    # Configure Deepgram options for audio analysis
    options = PrerecordedOptions(
        model="nova-2",
        smart_format=True,
        language='id',
    )

    # Call the transcribe_file method with the text payload and options
    response = deepgram.listen.prerecorded.v("1").transcribe_file(payload, options)

    # Get and return the transcript from the response
    text_ = response['results']['channels'][0]['alternatives'][0]['transcript']
    return text_



# def transcribe_audio(AUDIO_FILE):
#     # try:
#         # STEP 1 Create a Deepgram client using the API key
#         deepgram = DeepgramClient(API_KEY)

#         with open(AUDIO_FILE, "rb") as file:
#             buffer_data = file.read()

#         payload: FileSource = {
#             "buffer": buffer_data,
#         }

#         #STEP 2: Configure Deepgram options for audio analysis
#         options = PrerecordedOptions(
#             model="nova-2",
#             smart_format=True,
#             language='id',
#         )

#         # STEP 3: Call the transcribe_file method with the text payload and options
#         response = deepgram.listen.prerecorded.v("1").transcribe_file(payload, options)

#         # STEP 4: Print the response
#         # print(response.to_json(indent=4))
#         # response_json = response
#         text_ = response['results']['channels'][0]['alternatives'][0]['transcript']
#         # print(f'Result text : {text_}')
#         return text_

    # except Exception as e:
    #     print(f"Exception: {e}")




# if __name__ == "__main__":
    # transcribe_audio()




# data = {
#     "metadata": {
#         "transaction_key": "deprecated", 
#         "request_id": "61c6a013-7396-461f-8d5c-4b91f1d0debf", 
#         "sha256": "4126a2bf6ee22bb858b009bdd103afc09224b084b1cfbb68e88b90ae047a19bd", 
#         "created": "2024-09-21T19:24:42.258Z", 
#         "duration": 3.1439376, 
#         "channels": 1, 
#         "models": ["74d55303-a1b1-4cbc-9b41-4c2911a74fe3"], 
#         "model_info": {
#             "74d55303-a1b1-4cbc-9b41-4c2911a74fe3": 
#             {
#                 "name": "2-general-nova", 
#                 "version": "2024-01-19.28800", 
#                 "arch": "nova-2"
#                 }
#             }
#         }, 
#         "results": {
#             "channels": [
#                 {
#                     "alternatives": [
#                         {
#                             "transcript": "Hello, ini cuma testing aja ya.", 
#                             "confidence": 0.96240234, "words": [{"word": "hello", "start": 0.16, "end": 0.65999997, "confidence": 0.6105957, "punctuated_word": "Hello,"}, {"word": "ini", "start": 0.96, "end": 1.1999999, "confidence": 0.9277344, "punctuated_word": "ini"}, {"word": "cuma", "start": 1.1999999, "end": 1.5999999, "confidence": 0.9863281, "punctuated_word": "cuma"}, {"word": "testing", "start": 1.5999999, "end": 2.1, "confidence": 0.9951172, "punctuated_word": "testing"}, {"word": "aja", "start": 2.1599998, "end": 2.56, "confidence": 0.96240234, "punctuated_word": "aja"}, {"word": "ya", "start": 2.56, "end": 3.06, "confidence": 0.78686523, "punctuated_word": "ya."}], "paragraphs": {"transcript": "\nHello, ini cuma testing aja ya.", "paragraphs": [{"sentences": [{"text": "Hello, ini cuma testing aja ya.", "start": 0.16, "end": 3.06}], "start": 0.16, "end": 3.06, "num_words": 6}]}}]}]}}


# data = data['results']['channels'][0]['alternatives'][0]['transcript']
# print(data)