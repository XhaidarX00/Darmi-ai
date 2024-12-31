// /app/libs/transcribe.ts

import { createClient } from "@deepgram/sdk";
import 'dotenv/config';

const DEEPGRAM_API_KEY = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY || 'YOUR_DEEPGRAM_API_KEY';

const deepgram = createClient(DEEPGRAM_API_KEY);

/**
 * Function to transcribe an audio URL using Deepgram
 * @param {string} audioUrl - The URL of the audio file to transcribe
 * @returns {Promise<string>} - Transcribed text
 */
export async function transcribeAudioUrl(audioUrl: string): Promise<string> {
  try {
    const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
      {
        url: audioUrl,
      },
      {
        model: 'nova-2', // Model for transcription, you can adjust this to your needs
        smart_format: true, // Optional parameter for smart formatting
      }
    );

    if (error) throw error;
    return result.channels[0].alternatives[0].transcript;
  } catch (error) {
    console.error('Error during transcription:', error);
    throw error;
  }
}
