// lib/recording.ts

let mediaRecorder: MediaRecorder | null = null;
let recordedChunks: Blob[] = [];

// Memulai proses perekaman
export async function startRecording() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error('Media devices are not supported on this browser.');
  }

  // Minta akses mikrofon
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  
  // Buat MediaRecorder
  mediaRecorder = new MediaRecorder(stream);

  // Saat data tersedia, simpan di chunk
  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };

  // Mulai merekam
  mediaRecorder.start();
}

// Menghentikan perekaman dan mengembalikan Blob audio
export function stopRecording(): Promise<Blob> {
  return new Promise((resolve, reject) => {
    if (!mediaRecorder) {
      return reject(new Error('No media recorder found'));
    }

    // Hentikan perekaman
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(recordedChunks, { type: 'audio/webm' });
      recordedChunks = []; // Reset chunks
      resolve(audioBlob);
    };

    mediaRecorder.onerror = (event) => {
      reject(new Error(`Recording error: ${event.error.message}`));
    };

    mediaRecorder.stop();
  });
}


// export let mediaRecorder: MediaRecorder | null = null;
// export let audioChunks: Blob[] = [];

// // Memulai rekaman
// export const startRecording = () => {
//   return new Promise<void>((resolve, reject) => {
//     navigator.mediaDevices.getUserMedia({ audio: true })
//       .then(stream => {
//         mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
//         mediaRecorder.ondataavailable = event => {
//           audioChunks.push(event.data);
//         };
//         mediaRecorder.onstop = () => {
//           resolve();
//         };
//         mediaRecorder.start();
//       })
//       .catch(error => reject(error));
//   });
// };

// // Berhenti rekaman
// export const stopRecording = () => {
//   return new Promise<Blob>((resolve, reject) => {
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//       mediaRecorder.stream.getTracks().forEach(track => track.stop());
//       mediaRecorder = null;

//       const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
//       audioChunks = [];
//       resolve(audioBlob);
//     } else {
//       reject(new Error('MediaRecorder not initialized'));
//     }
//   });
// };
