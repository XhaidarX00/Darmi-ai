"use client";

import { useState, useEffect, useRef } from 'react';
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import Layout from '../../components/Layout';
import TypingAnimation from '../../components/TypingAnimation'; // Animasi terpisah
import { FiPaperclip } from 'react-icons/fi'; // Icon untuk lampiran file

export default function Chat() {
  const [input, setInput] = useState('');
  const [file, setFile] = useState<File | null>(null); // State untuk file
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() || file) {
      const newUserMessage = { 
        text: input.trim() || 'Mengirim file...', 
        sender: 'user', 
        file 
      };
      setMessages(prev => [...prev, newUserMessage]);
      setInput('');
      setFile(null); // Reset file setelah submit
  
      setIsTyping(true);
  
      // Kirim data ke backend melalui API route Next.js
      const formData = new FormData();
      if (input.trim()) formData.append('message', input.trim());
      if (file) formData.append('file', file);
  
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log('Response:', data);
  
        if (data.response) {
          const newAiMessage = { 
            text: data.response, 
            sender: 'ai',
            file: data.file // Jika API mengembalikan file
          };
          setMessages(prev => [...prev, newAiMessage]);
        } else {
          console.warn('Unexpected response format:', data);
          setMessages(prev => [...prev, { text: 'Maaf, terjadi kesalahan dalam memproses respons.', sender: 'ai' }]);
        }
      } catch (error) {
        console.error('Error:', error);
        setMessages(prev => [...prev, { text: 'Maaf, terjadi kesalahan. Silakan coba lagi.', sender: 'ai' }]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Layout>
      <div className="flex flex-col p-4 max-w-2xl mx-auto w-full h-[calc(100vh-195px)]">
        <div className="flex-grow overflow-auto mb-4">
          {messages.map((message, index) => (
            <div key={index} className={`mb-10 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block text-black p-2 rounded-lg bg-gray-100 border-2 ${message.sender === 'user' ? 'border-green-400' : 'border-black'}`}>
                {message.text}
              </span>
              {message.file && (
                <a href={message.file} download className="block mt-2 text-blue-500 underline">Download File</a>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="text-left">
              <span className="inline-block p-2 rounded-lg border border-gray-300">
                <TypingAnimation />
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="relative flex items-center">
          {/* Input teks untuk chat dengan ikon file di dalamnya (kiri) */}
          <div className="relative w-full">
            {/* Ikon file */}
            <label htmlFor="file-upload" className="absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
              <FiPaperclip className="text-xl" />
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              className="hidden"
            />
            {/* Input teks dengan padding kiri untuk memberi ruang pada ikon */}
            <Input
              type="text"
              placeholder="Masukkan pertanyaan disini"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full pl-10 pr-12" // Padding kiri untuk ikon file dan kanan untuk tombol kirim
            />
          </div>
          {/* Tombol kirim */}
          <Button type="submit" disabled={!input.trim() && !file} className="ml-2" />
        </form>
      </div>
    </Layout>
  );
}




// "use client";

// import { useState, useEffect, useRef } from 'react';
// import { Input } from "../../components/ui/input";
// import { Button } from "../../components/ui/button";
// import Layout from '../../components/Layout';
// import TypingAnimation from '../../components/TypingAnimation'; // Animasi terpisah
// import { FiPaperclip } from 'react-icons/fi'; // Icon untuk lampiran file

// export default function Chat() {
//   const [input, setInput] = useState('');
//   const [file, setFile] = useState<File | null>(null); // State untuk file
//   const [messages, setMessages] = useState([]);
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef(null);
  
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (input.trim() || file) {
  //     // Menangani pesan dari user
  //     setMessages([...messages, { text: input || 'Mengirim file...', sender: 'user', file }]);
  //     setInput('');
  //     setFile(null); // Reset file setelah submit

  //     setIsTyping(true);

  //     // Kirim data ke backend
  //     const formData = new FormData();
  //     if (input) formData.append('message', input);
  //     if (file) formData.append('file', file);

  //     try {
  //       // const response = await fetch('/api/chat', {
  //       //   method: 'POST',
  //       //   body: formData,
  //       // });
  //       const response = await fetch('http://127.0.0.1:8000/api/chat/', {
  //           method: 'POST',
  //           body: formData,
  //       });

  //       const data = await response.json();
  //       console.log('Response:', data);
  //       // Menampilkan respons dari server
  //       setMessages(prev => [...prev, { text: data.message, file: data.file, sender: 'ai' }]);
  //     } catch (error) {
  //       console.error('Error:', error);
  //     } finally {
  //       setIsTyping(false);
  //     }
  //   }
  // };

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <Layout>
//       <div className="flex flex-col p-4 max-w-2xl mx-auto w-full h-[calc(100vh-128px)]">
//         <div className="flex-grow overflow-auto mb-4">
//           {messages.map((message, index) => (
//             <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
//               <span className={`inline-block p-2 rounded-lg shadows-into-light-regular border ${message.sender === 'user' ? 'border-green-400' : 'border-gray-300'}`}>
//                 {message.text}
//               </span>
//               {message.file && (
//                 <a href={message.file} download className="block mt-2 text-blue-500 underline">Download File</a>
//               )}
//             </div>
//           ))}
//           {isTyping && (
//             <div className="text-left">
//               <span className="inline-block p-2 rounded-lg border border-gray-300">
//                 <TypingAnimation />
//               </span>
//             </div>
//           )}
//           <div ref={messagesEndRef} />
//         </div>
//         <form onSubmit={handleSubmit} className="relative flex items-center">
//           {/* Input teks untuk chat dengan ikon file di dalamnya (kiri) */}
//           <div className="relative w-full">
//             {/* Ikon file */}
//             <label htmlFor="file-upload" className="absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
//               <FiPaperclip className="text-xl" />
//             </label>
//             <input
//               id="file-upload"
//               type="file"
//               onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
//               className="hidden"
//             />
//             {/* Input teks dengan padding kiri untuk memberi ruang pada ikon */}
//             <Input
//               type="text"
//               placeholder="Masukkan pertanyaan disini"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               className="w-full pl-10 pr-12" // Padding kiri untuk ikon file dan kanan untuk tombol kirim
//             />
//           </div>
//           {/* Tombol kirim */}
//           <Button type="submit" disabled={!input.trim() && !file} className="ml-2" />
//         </form>
//       </div>
//     </Layout>
//   );
// }













// "use client"; // Menandai bahwa komponen ini berjalan di Client Side

// import { useState, useEffect, useRef } from 'react'
// import { Input } from "../../components/ui/input"
// import { Button } from "../../components/ui/button"
// import Layout from '../../components/Layout'

// export default function Chat() {
//   const [input, setInput] = useState('')
//   const [messages, setMessages] = useState([])
//   const [isTyping, setIsTyping] = useState(false)
//   const messagesEndRef = useRef(null)

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (input.trim()) {
//       setMessages([...messages, { text: input, sender: 'user' }])
//       setInput('')
//       setIsTyping(true)
//       // Simulate AI response
//       setTimeout(() => {
//         setMessages(prev => [...prev, { text: "Ini adalah respons dari Darmi AI.", sender: 'ai' }])
//         setIsTyping(false)
//       }, 2000)
//     }
//   }

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [messages])

//   return (
//     <Layout>
//       <div className="flex flex-col p-4 max-w-2xl mx-auto w-full h-[calc(100vh-128px)]">
//         <div className="flex-grow overflow-auto mb-4">
//           {messages.map((message, index) => (
//             <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
//               <span className={`inline-block p-2 rounded-lg border ${message.sender === 'user' ? 'border-sky-500' : 'border-gray-300'}`}>
//                 {message.text}
//               </span>
//             </div>
//           ))}
//           {isTyping && (
//             <div className="text-left">
//               <span className="inline-block p-2 rounded-lg border border-gray-300">
//                 <TypingAnimation />
//               </span>
//             </div>
//           )}
//           <div ref={messagesEndRef} />
//         </div>
//         <form onSubmit={handleSubmit} className="relative">
//           <Input
//             type="text"
//             placeholder="Masukan pertanyaan disini"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             className="pr-12"
//           />
//           <Button type="submit" disabled={!input.trim()} />
//         </form>
//       </div>
//     </Layout>
//   )
// }

// function TypingAnimation() {
//   return (
//     <span className="flex space-x-1">
//       {[0, 1, 2].map((i) => (
//         <span key={i} className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
//       ))}
//     </span>
//   )
// }



// 'use client'

// import { useState, useEffect, useRef } from 'react'
// import { Button } from "../../components/ui/button"
// import { Input } from "../../components/ui/input"
// import { Send } from 'lucide-react'
// import Layout from '../../components/Layout'
// import TypingAnimation from '../../components/TypingAnimation'
// import { sendMessage } from '../../lib/api'

// export default function Chat() {
//   const [input, setInput] = useState('')
//   const [messages, setMessages] = useState([])
//   const [isTyping, setIsTyping] = useState(false)
//   const messagesEndRef = useRef(null)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (input.trim()) {
//       setMessages([...messages, { text: input, sender: 'user' }])
//       setInput('')
//       setIsTyping(true)

//       try {
//         const response = await sendMessage(input)
//         setMessages(prev => [...prev, { text: response, sender: 'ai' }])
//       } catch (error) {
//         console.error('Error sending message:', error)
//         setMessages(prev => [...prev, { text: "Sorry, there was an error processing your request.", sender: 'ai' }])
//       } finally {
//         setIsTyping(false)
//       }
//     }
//   }

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [messages])

//   return (
//     <Layout>
//       <div className="flex flex-col p-4 max-w-2xl mx-auto w-full h-[calc(100vh-128px)]">
//         <div className="flex-grow overflow-auto mb-4">
//           {messages.map((message, index) => (
//             <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
//               <span className={`inline-block p-2 rounded-lg border ${message.sender === 'user' ? 'border-sky-500' : 'border-gray-300'}`}>
//                 {message.text}
//               </span>
//             </div>
//           ))}
//           {isTyping && (
//             <div className="text-left">
//               <span className="inline-block p-2 rounded-lg border border-gray-300">
//                 <TypingAnimation />
//               </span>
//             </div>
//           )}
//           <div ref={messagesEndRef} />
//         </div>
//         <form onSubmit={handleSubmit} className="flex items-center space-x-2">
//           <Input
//             type="text"
//             placeholder="Ketik pesan Anda..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             className="flex-grow transition-all duration-300 ease-in-out focus:ring-2 focus:ring-sky-500"
//           />
//           <Button 
//             type="submit" 
//             disabled={!input.trim()} 
//             className={`bg-sky-500 hover:bg-sky-600 text-white transition-all duration-300 ease-in-out ${!input.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
//           >
//             <Send className="w-5 h-5" />
//           </Button>
//         </form>
//       </div>
//     </Layout>
//   )
// }