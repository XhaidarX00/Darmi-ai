'use client'

import { useState, useEffect, useRef } from 'react';
import { Mic, Square, Volume2 } from 'lucide-react';
import Layout from '../../components/Layout';
import VoiceWaveform from '../../components/VoiceWaveform';
import { startRecording, stopRecording } from '../../lib/recording';

export default function Voice() {
  const [state, setState] = useState('idle');
  const [transcript, setTranscript] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleRecording = async () => {
    if (state === 'idle') {
      setState('recording');
      await startRecording();
    } else if (state === 'recording') {
      setState('thinking');
      const blob = await stopRecording();
      setAudioBlob(blob);
      
      try {
        const formData = new FormData();
        // formData.append('message', 'Hello, this is a test.');
        formData.append('audio', blob);

        const response = await fetch('/api/voice', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.message) {
          setTranscript(data.message.split(' '));
          speakResponse(data.message);
        }

        if (data.audio_blob) {
          const audioBlob = base64ToBlob(data.audio_blob, 'audio/mp3');
          const audioUrl = URL.createObjectURL(audioBlob);
          if (audioRef.current) {
            audioRef.current.src = audioUrl;
            audioRef.current.load();
            audioRef.current.play();
          }
        }

        setState('idle');
      } catch (error) {
        console.error('Failed to process audio or response:', error);
        setState('idle');
      }
    }
  };

  const base64ToBlob = (base64: string, mimeType: string) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };

  const speakResponse = (text: string) => {
    const words = text.split(' ');
    words.forEach((word, index) => {
      setTimeout(() => {
        setCurrentWordIndex(index);
        if (index === words.length - 1) {
          setTimeout(() => {
            setState('idle');
            setCurrentWordIndex(-1);
          }, 1000);
        }
      }, index * 515);
    });
  };

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [currentWordIndex]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-128px)] p-4">
        <div className="relative mb-8">
          {state === 'idle' && (
            <div className="relative group">
              <button
                onClick={toggleRecording}
                className="p-8 rounded-full bg-_footer_text border-4 border-white hover:bg-icon_mic_new transition-colors duration-300 flex items-center justify-center"
                aria-label="Start recording"
              >
                <Mic className="w-12 h-12 text-white"/>
              </button>
              <span className="absolute left-1/2 -translate-x-1/2 -bottom-10 w-max opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded px-2 py-1 border border-black transition-opacity duration-200">
                Klik untuk merekam
              </span>
            </div>
          )}
          {(state === 'recording' || state === 'speaking') && (
            <div className="relative">
              <div className="w-48 h-48 rounded-full flex items-center justify-center">
                <VoiceWaveform />
              </div>
              <button
                  onClick={state === 'recording' ? toggleRecording : undefined}
                  className="absolute bottom-0 right-0 p-2 rounded-full"
                  aria-label={state === 'recording' ? "Stop recording" : "Speaking"}
                >
                <div className="relative group">
                  {state === 'recording' ? (
                    <Square className="w-6 h-6 text-white bg-red-500 border border-red-500 rounded flex items-center justify-center" />
                  ) : (
                    <Volume2 className="w-6 h-6 text-green-500 flex items-center justify-center" />
                  )}
                  {state === 'recording' && (
                    <span className="absolute left-1/2 -translate-x-1/2 -bottom-10 w-max opacity-100 bg-black text-white text-xs rounded px-2 py-1 border border-black transition-opacity duration-200">
                      Klik untuk berhenti merekam
                    </span>
                  )}
                </div>
              </button>
            </div>
          )}
          {state === 'thinking' && (
            <div className="text-2xl font-bold text-white animate-bounce">
              Darmi sedang Berpikir
            </div>
          )}
        </div>
        {transcript.length > 0 && (
          <div 
            ref={transcriptRef}
            className="w-full max-w-md h-32 overflow-y-auto text-white border p-4 rounded-lg shadow-md"
            aria-live="polite"
          >
            {transcript.map((word, index) => (
              <span 
                key={index} 
                className={`inline-block mr-1 mb-1 px-1 rounded transition-colors duration-300 ease-in-out
                  ${index === currentWordIndex ? 'bg-black' : 'bg-transparent'}` }
              >
                {word}
              </span>
            ))}
          </div>
        )}
        {audioBlob && (
          <audio ref={audioRef} className="mt-4" />
        )}
      </div>
    </Layout>
  );
}