# backend/api/urls.py

from django.urls import path
from .views import ChatView, ProcessAudioView

urlpatterns = [
    path('chat', ChatView.as_view(), name='chat'),
    path('voice', ProcessAudioView.as_view(), name='voice'),
]



# from django.urls import path
# from .views import ChatView, ProcessAudioView

# urlpatterns = [
#     path('chat/', ChatView.as_view(), name='chat'),
#     path('api/process-audio/', ProcessAudioView.as_view(), name='process_audio'),
# ]