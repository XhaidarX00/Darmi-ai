import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

// Tetap pertahankan metadata sebagai bagian dari Server Component
export const metadata: Metadata = {
  title: 'Darmi AI',
  description: 'Your personal AI assistant',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}


// import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
// import '../styles/globals.css'


// const inter = Inter({ subsets: ['latin'] })

// // export const metadata: Metadata = {
// //   title: 'Darmi AI',
// //   description: 'Your personal AI assistant',
// // }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   )
// }