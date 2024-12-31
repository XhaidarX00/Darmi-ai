import { NextResponse } from 'next/server';
require('dotenv').config();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    // const backendUrl = process.env.BACKEND_URL || 'https://2yblz7t8-mlj8ws2x-w8utxxydlbr4.ac4-preview.marscode.dev/api/chat';
    console.log('process.env:', process.env);

    const backendUrl = process.env.BACKEND_URL;
    // Kirim permintaan ke backend Django
    const responseFromBackend = await fetch(`${backendUrl}/chat`, {
      method: 'POST',
      body: formData,
    });

    if (!responseFromBackend.ok) {
      throw new Error(`HTTP error! Status: ${responseFromBackend.status}`);
    }

    const backendData = await responseFromBackend.json();
    console.log('Response from backend:', backendData);

    return NextResponse.json(backendData);
  } catch (error) {
    console.error('Error handling chat request:', error);
    return NextResponse.json({ error: 'Error processing chat request' }, { status: 500 });
  }
}
