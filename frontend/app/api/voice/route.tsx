import { NextResponse } from 'next/server';
require('dotenv').config();

export async function POST(request: Request) {
  try {
    // Ambil form data dari permintaan
    const formData = await request.formData();
    
    // Cek apakah URL backend telah diatur
    const backendUrl = process.env.BACKEND_URL;
    if (!backendUrl) {
      throw new Error('Backend URL is not configured');
    }

    // formData.append('message', 'Hello, ini cuma testing aja yaa');
    // Kirim permintaan ke backend Django
    const responseFromBackend = await fetch(`${backendUrl}/voice`, {
      method: 'POST',
      body: formData,
    });

    if (!responseFromBackend.ok) {
      throw new Error(`HTTP error! Status: ${responseFromBackend.status}`);
    }

    const backendData = await responseFromBackend.json();
    // console.log('Response from backend:', backendData);

    // Kembalikan respons ke frontend
    return NextResponse.json(backendData);
  } catch (error) {
    console.error('Error handling audio processing request:', error);
    return NextResponse.json({ error: 'Error processing audio request' }, { status: 500 });
  }
}


// import { NextApiRequest, NextApiResponse } from 'next';
// import FormData from 'form-data';
// import fetch from 'node-fetch';

// export const config = {
//   api: {
//     bodyParser: false, // Disable body parsing to handle FormData
//   },
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     try {
//       // Ambil form data dari request
//       const formData = new FormData();

//       // Copy incoming form data from the request to forward to backend
//       const contentType = req.headers['content-type'];

//       if (contentType && contentType.includes('multipart/form-data')) {
//         // Parse form-data yang dikirim dari frontend
//         const boundary = contentType.split('boundary=')[1];
//         const chunks = [];
        
//         req.on('data', chunk => chunks.push(chunk));
//         await new Promise(resolve => req.on('end', resolve));
//         const body = Buffer.concat(chunks);

//         // Tambahkan data ke FormData yang akan dikirimkan ke backend
//         formData.append('audio', body, { contentType: 'audio/mpeg', filename: 'audio.mp3' });
//         formData.append('message', 'Hello, this is a test.'); // Tambahkan pesan, sesuaikan jika ada pesan dari frontend
//       }

//       // const backendUrl = process.env.BACKEND_URL || 'http://127.0.0.1:8000'; // Sesuaikan URL backend Django Anda
//       const backendUrl = process.env.BACKEND_URL; // Sesuaikan URL backend Django Anda
//       console.log('process.env:', process.env);
      
//       // Lakukan POST request ke backend Django
//       const responseFromBackend = await fetch(`${backendUrl}/process-audio`, {
//         method: 'POST',
//         body: formData,
//         headers: {
//           ...formData.getHeaders(),
//         },
//       });

//       if (!responseFromBackend.ok) {
//         throw new Error(`Failed to process audio. Status: ${responseFromBackend.status}`);
//       }

//       // Ambil respons dari backend Django
//       const backendResponseData = await responseFromBackend.json();

//       // Kembalikan respons ke frontend
//       return res.status(200).json(backendResponseData);
//     } catch (error) {
//       console.error('Error forwarding request to backend:', error);
//       return res.status(500).json({ error: 'Error processing request' });
//     }
//   } else {
//     // Jika bukan POST request
//     return res.status(405).json({ error: 'Method not allowed' });
//   }
// }
