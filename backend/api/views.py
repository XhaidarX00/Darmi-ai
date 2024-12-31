import os
import speech_recognition as sr
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.parsers import MultiPartParser, FormParser


@method_decorator(csrf_exempt, name='dispatch')
class ChatView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        message = request.data.get('message')
        file = request.FILES.get('file')
        format_file = ''

        if file:
            return Response({'response': "Maaf fitur file belum tersedia teman..."})
            file_type = file.content_type
            file_name, file_extension = os.path.splitext(file.name)
            
            if file_type == 'application/pdf':
                format_file = 'pdf'
                # return Response({'response': 'File is a PDF.'})
            elif file_type.startswith('image/'):
                format_file = 'image'
                # return Response({'response': 'File is an image.'})
            elif file_type.startswith('audio/'):
                format_file = 'audio'
                # return Response({'response': 'File is an audio file.'})
            else:
                format_file = 'unknown'
                # return Response({'response': 'File is of unknown type.'}  
        
        if message:
            get_answer_gpt = getAnswer2(message)
            # if format_file != '':
            #     response += f"\nFile type: {format_file}"

            return Response({'response': get_answer_gpt})
        
        return Response({'error': 'No message or file provided'}, status=status.HTTP_400_BAD_REQUEST)



import base64
from django.http import JsonResponse
from .module import *

AUDIO_SAVE_DIR = '/cloudide/workspace/Django/backend/api/'

@method_decorator(csrf_exempt, name='dispatch')
class ProcessAudioView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        # message = request.data.get('message')
        audio_file = request.FILES.get('audio')

        # if not message:
        #     return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        if not audio_file:
            return Response({'error': 'Audio file not found'}, status=status.HTTP_400_BAD_REQUEST)

        message_transcribe = transcribe_audio(audio_file)
        # print(f"Message transcribe: {message_transcribe}")
        get_answer_gpt = getAnswer2(message_transcribe)
        audio_path = getVoice(get_answer_gpt, AUDIO_SAVE_DIR)
        if not audio_path:
            return Response({'error': 'Audio generation failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            with open(audio_path, 'rb') as audio_file:
                audio_content = audio_file.read()
                audio_base64 = base64.b64encode(audio_content).decode('utf-8')
                
                return JsonResponse({
                    'message': get_answer_gpt,
                    'audio_blob': audio_base64
                })
        except FileNotFoundError:
            print(f"File not found: {audio_path}")
            return Response({'error': 'Audio file not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f"Error reading file: {str(e)}")
            return Response({'error': f'An error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# @method_decorator(csrf_exempt, name='dispatch')
# class ProcessAudioView(APIView):
#     parser_classes = (MultiPartParser, FormParser)

#     def post(self, request):
#         # Ambil pesan dan file audio dari formData
#         message = request.data.get('message')
#         audio_file = request.FILES.get('audio')  # Ambil file audio dari request

#         # Validasi jika tidak ada pesan yang disertakan
#         if not message:
#             return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)
        
#         # Validasi jika tidak ada file audio yang ditemukan
#         if not audio_file:
#             return Response({'error': 'Audio file not found'}, status=status.HTTP_400_BAD_REQUEST)
#         # file_name = f"{audio_file.name}.wav"
#         # # Tentukan path untuk menyimpan file audio
#         # audio_file_path = os.path.join(AUDIO_SAVE_DIR, file_name)

#         # # Simpan file audio ke filesystem
#         # try:
#         #     with open(audio_file_path, 'wb') as f:
#         #         for chunk in audio_file.chunks():
#         #             f.write(chunk)
#         # except Exception as e:
#         #     return Response({'error': f'Failed to save audio file: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#         # Format response message
#         response = f"You said: {message}"
        
#         audio_path = getVoice(message)
#         # try:
#         with open(audio_path, 'rb') as audio_file:
#             response = HttpResponse(audio_file.read(), content_type='audio/wav')
#             response['Content-Disposition'] = 'attachment; filename="output.wav"'
#             response['X-Response-Text'] = message  # Menyimpan teks dalam header

#             # Mengembalikan audio dan teks sebagai respons
#             return response
#         # except FileNotFoundError:
        #     return HttpResponse("Audio file not found.", status=404)
        # except Exception as e:
        #     return HttpResponse(f"An error occurred: {str(e)}", status=500)

        # Kembalikan response dengan path audio file
        # return Response({
        #     'response': response,
        #     'audioUrl': audioUrl  # Path file audio yang disimpan
        # })


# @method_decorator(csrf_exempt, name='dispatch')
# class ProcessAudioView(APIView):
#     parser_classes = (MultiPartParser, FormParser)

#     def post(self, request):
#         message = request.data.get('message')
        
#         if message:
#             # Simulate an audio response (In real cases, you might use a TTS service)
#             audio_path = 'backend/api/temp_part_0.mp3'  # Replace with actual audio file path

#             if not os.path.exists(audio_path):
#                 return Response({'error': 'Audio file not found'}, status=status.HTTP_404_NOT_FOUND)
            
#             # Assuming 'message' is text to send back
#             response_text = f"You said: {message}"

#             # Create the full URL for audio file (assuming static or media file served via a URL)
#             # Adjust the 'request.build_absolute_uri' path to match your media or static URL setup
#             audio_url = request.build_absolute_uri(f'backend/api/temp_part_0.mp3')

#             # Return JSON response with both text and audio URL
#             return JsonResponse({
#                 'response': response_text,
#                 'audioUrl': audio_url
#             })

#         return Response({'error': 'No message or file provided'}, status=status.HTTP_400_BAD_REQUEST)

    # def post(self, request):
    #     print("Request Files:", request.FILES)
    #     audio_file = request.FILES.get('audio')
    #     if not audio_file:
    #         return Response({'error': 'No audio file provided'}, status=status.HTTP_400_BAD_REQUEST)
        
    #     recognizer = sr.Recognizer()
    #     try:
    #         with sr.AudioFile(audio_file) as source:
    #             audio_data = recognizer.record(source)
    #             text = recognizer.recognize_google(audio_data)
    #             return Response({'response': text})
    #     except sr.UnknownValueError:
    #         return Response({'error': 'Could not understand audio'}, status=status.HTTP_400_BAD_REQUEST)
    #     except sr.RequestError as e:
    #         return Response({'error': f'Error with the speech recognition service: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# import speech_recognition as sr
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from django.views.decorators.csrf import csrf_exempt
# from django.utils.decorators import method_decorator
# from rest_framework.parsers import MultiPartParser, FormParser

# @method_decorator(csrf_exempt, name='dispatch')
# class ChatView(APIView):
#     parser_classes = (MultiPartParser, FormParser)

#     def post(self, request):
#         message = request.data.get('message')
        
#         if not message:
#             return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)
        
#         # Proses pesan dan generate respons
#         response = f"You said: {message}"
#         return Response({'response': response})

# class ProcessAudioView(APIView):
#     def post(self, request):
#         audio_file = request.FILES.get('audio')
#         if not audio_file:
#             return Response({'error': 'No audio file provided'}, status=status.HTTP_400_BAD_REQUEST)
        
#         recognizer = sr.Recognizer()
#         try:
#             with sr.AudioFile(audio_file) as source:
#                 audio_data = recognizer.record(source)
#                 text = recognizer.recognize_google(audio_data)
#                 return Response({'response': text})
#         except sr.UnknownValueError:
#             return Response({'error': 'Could not understand audio'}, status=status.HTTP_400_BAD_REQUEST)
#         except sr.RequestError as e:
#             return Response({'error': f'Error with the speech recognition service: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)