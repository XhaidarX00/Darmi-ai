// lib/api.tsx
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://f7hnqtvt-wu7bs6l3-f81w007x0awb.ac4-preview.marscode.dev/api';

// Existing function for sending messages
export async function sendMessage(message: string) {
  const response = await fetch(`${API_URL}/chat/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  const data = await response.json();
  return data.response;
}

// Functions for recording audio
export async function startRecording() {
  const { startRecording } = await import('./recording');
  await startRecording();
}

export async function stopRecording() {
  const { stopRecording } = await import('./recording');
  return stopRecording();
}

// Function to process audio
export async function processAudio(audioBlob: Blob) {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.wav');

  const response = await fetch(`${API_URL}/process-audio`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to process audio');
  }

  const data = await response.json();
  return data.response;
}



// // Add API related functions here
// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// export async function sendMessage(message: string) {
//   const response = await fetch(`${API_URL}/chat/`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ message }),
//   });

//   if (!response.ok) {
//     throw new Error('Failed to send message');
//   }

//   const data = await response.json();
//   return data.response;
// }

// export async function startRecording() {
//     // Implement the logic to start recording audio
//     // This might involve using the Web Audio API or a library like RecordRTC
//     console.log('Starting audio recording...');
//   }
  
//   export async function stopRecording() {
//     // Implement the logic to stop recording and return the audio blob
//     // This would typically return a Blob object containing the recorded audio
//     console.log('Stopping audio recording...');
//     return new Blob([]); // Placeholder, replace with actual recorded audio
//   }
  
//   export async function processAudio(audioBlob: Blob) {
//     const formData = new FormData();
//     formData.append('audio', audioBlob, 'recording.wav');
  
//     const response = await fetch(`${API_URL}/process-audio/`, {
//       method: 'POST',
//       body: formData,
//     });
  
//     if (!response.ok) {
//       throw new Error('Failed to process audio');
//     }
  
//     const data = await response.json();
//     return data.response;
//   }