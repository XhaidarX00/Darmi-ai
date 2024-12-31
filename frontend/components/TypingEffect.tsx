"use client";

import { useEffect, useState } from 'react';

const TypingEffect = () => {
  const [displayedText, setDisplayedText] = useState('');
  const sentences = [
    "Kenalin nih Darmi AI adalah Personal Assistant yang dibuat oleh keresahan diri sendiri.",
    "Kaya kalo kamu ada masalah tapi bingung jawabannya? Tanya Darmi aja!"
  ];

  useEffect(() => {
    const typingEffect = async () => {
      for (const sentence of sentences) {
        for (let i = 0; i <= sentence.length; i++) {
          setDisplayedText(sentence.slice(0, i));
          await new Promise(resolve => setTimeout(resolve, 100)); // Waktu pengetikan
        }
        await new Promise(resolve => setTimeout(resolve, 500)); // Delay sebelum pindah ke kalimat berikutnya
      }
    };

    typingEffect();
  }, []);

  return (
    // <p className="text-lg text-white sofadi-one-regular bg-opacity-80 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 rounded-lg backdrop-blur-md">
    <p className="text-lg text-white sofadi-one-regular">
      {displayedText}
    </p>
  );
};

export default TypingEffect;
