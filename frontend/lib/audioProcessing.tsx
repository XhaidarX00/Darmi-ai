// import fs from 'fs';
// import path from 'path';
// import speech from 'speech-to-text'; // Sesuaikan dengan library pilihan Anda

// export const recognizeAudio = async (audioBuffer: Buffer): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     // Save the buffer to a temporary file
//     const tempFilePath = path.join(__dirname, 'temp_audio.wav');
//     fs.writeFile(tempFilePath, audioBuffer, (err) => {
//       if (err) return reject(err);

//       // Process the file
//       speech.recognize(tempFilePath, (err, result) => {
//         if (err) return reject(err);
//         resolve(result.text);
//       });
//     });
//   });
// };
