import Link from 'next/link'
import { Mic, MessageSquare, Info } from 'lucide-react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // <div className="flex flex-col h-screen overflow-hidden bg-cover bg-center" style={{ backgroundImage: 'url(/asset/bg2.jpeg)' }}>
    <div className="flex flex-col h-screen overflow-hidden bg-cover bg-center">
      {/* Navbar Fixed at Top */}
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-opacity-80 bg-black z-50">
        <Link href="/" className="text-2xl font-bold text-white dancing-script-regular">Darmi AI</Link>
        
        <div className="flex space-x-4">
          {/* About Icon */}
          <div className="relative group">
            <Link href="/about">
              <Info className="w-6 h-6 text-white transition-transform duration-200 group-hover:scale-125 group-hover:text-black" />
            </Link>
            <span className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-max opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded px-2 py-1 transition-opacity duration-200">
              Tentang Darmi
            </span>
          </div>

          {/* Voice Icon */}
          <div className="relative group">
            <Link href="/voice">
              <Mic className="w-6 h-6 text-white transition-transform duration-200 group-hover:scale-125 group-hover:text-black" />
            </Link>
            <span className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-max opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded px-2 py-1 transition-opacity duration-200">
              Voice Mode
            </span>
          </div>

          {/* Chat Icon */}
          <div className="relative group">
            <Link href="/chat">
              <MessageSquare className="w-6 h-6 text-white transition-transform duration-200 group-hover:scale-125 group-hover:text-black" />
            </Link>
            <span className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-max opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded px-2 py-1 transition-opacity duration-200">
              Chat Mode
            </span>
          </div>
        </div>
      </nav>

      {/* Scrollable Content Area */}
      <main className="flex-grow overflow-y-auto pt-16 pb-16"> {/* Adjust padding for navbar and footer */}
        {children}
      </main>

      {/* Footer Fixed at Bottom */}
      <footer className="fixed bottom-0 left-0 w-full p-4 bg-opacity-80 bg-black text-white text-center z-50">
        <p>Darmi AI created by Haidar</p>
        <p className="text-sm">© 2024</p>
      </footer>
    </div>
  );
}


// import Link from 'next/link'
// import { Mic, MessageSquare, Info } from 'lucide-react'

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex flex-col h-screen overflow-hidden">
//       {/* Navbar Fixed at Top */}
//       <nav className="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-_footer-bg z-50">
//         <Link href="/" className="text-2xl font-bold text-_footer-text dancing-script-regular">Darmi AI</Link>
        
//         <div className="flex space-x-4">
//           {/* About Icon */}
//           <div className="relative group">
//             <Link href="/about">
//               <Info className="w-6 h-6 text-white transition-transform duration-200 group-hover:scale-125 group-hover:text-black" />
//             </Link>
//             <span className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-max opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded px-2 py-1 transition-opacity duration-200">
//               Tentang Darmi
//             </span>
//           </div>

//           {/* Voice Icon */}
//           <div className="relative group">
//             <Link href="/voice">
//               <Mic className="w-6 h-6 text-white transition-transform duration-200 group-hover:scale-125 group-hover:text-black" />
//             </Link>
//             <span className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-max opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded px-2 py-1 transition-opacity duration-200">
//               Voice Mode
//             </span>
//           </div>

//           {/* Chat Icon */}
//           <div className="relative group">
//             <Link href="/chat">
//               <MessageSquare className="w-6 h-6 text-white transition-transform duration-200 group-hover:scale-125 group-hover:text-black" />
//             </Link>
//             <span className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-max opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded px-2 py-1 transition-opacity duration-200">
//               Chat Mode
//             </span>
//           </div>
//         </div>
//       </nav>

//       {/* Scrollable Content Area */}
//       <main className="flex-grow overflow-y-auto pt-16 pb-16"> {/* Adjust padding for navbar and footer */}
//         {children}
//       </main>

//       {/* Footer Fixed at Bottom */}
//       <footer className="fixed bottom-0 left-0 w-full p-4 bg-_footer-bg text-_footer-text text-center z-50">
//         <p>Darmi AI created by Haidar</p>
//         <p className="text-sm">© 2024</p>
//       </footer>
//     </div>
//   );
// }


// // import Link from 'next/link'
// // import { Mic, MessageSquare, Info } from 'lucide-react'

// // export default function Layout({ children }: { children: React.ReactNode }) {
// //   return (
// //     <div className="flex flex-col min-h-screen bg-_footer-text">
// //       <nav className="flex items-center justify-between p-4 bg-_footer-bg">
// //         <Link href="/" className="text-2xl font-bold text-_footer-text dancing-script-regular">Darmi AI</Link>
// //         {/* <div className="flex space-x-4">
// //           <Link href="/about">
// //             <Info className="w-6 h-6 text-white" />
// //           </Link>
// //           <Link href="/voice">
// //             <Mic className="w-6 h-6 text-white" />
// //           </Link>
// //           <Link href="/chat">
// //             <MessageSquare className="w-6 h-6 text-white" />
// //           </Link>
// //         </div> */}
// //         <div className="flex space-x-4">
// //           {/* About Icon */}
// //           <div className="relative group">
// //             <Link href="/about">
// //               <Info className="w-6 h-6 text-white transition-transform duration-200 group-hover:scale-125 group-hover:text-black" />
// //             </Link>
// //             <span className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-max opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded px-2 py-1 transition-opacity duration-200">
// //               Tentang Darmi
// //             </span>
// //           </div>

// //           {/* Voice Icon */}
// //           <div className="relative group">
// //             <Link href="/voice">
// //               <Mic className="w-6 h-6 text-white transition-transform duration-200 group-hover:scale-125 group-hover:text-black" />
// //             </Link>
// //             <span className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-max opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded px-2 py-1 transition-opacity duration-200">
// //               Voice Mode
// //             </span>
// //           </div>

// //           {/* Chat Icon */}
// //           <div className="relative group">
// //             <Link href="/chat">
// //               <MessageSquare className="w-6 h-6 text-white transition-transform duration-200 group-hover:scale-125 group-hover:text-black" />
// //             </Link>
// //             <span className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-max opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded px-2 py-1 transition-opacity duration-200">
// //               Chat Mode
// //             </span>
// //           </div>
// //         </div>
// //       </nav>
// //       <main className="flex-grow">
// //         {children}
// //       </main>
      
// //       <footer className="p-4 bg-_footer-bg text-_footer-text text-center dancing-script-regular">
// //         <p>Darmi AI created by Haidar</p>
// //         <p className="text-sm">© 2024</p>
// //       </footer>
// //     </div>
// //   )
// // }