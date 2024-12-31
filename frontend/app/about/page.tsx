import Layout from '../../components/Layout'
import TypingEffect from '../../components/TypingEffect'

export default function About() {
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[calc(100vh-150px)] p-4">
        <div className="w-full max-w-4xl mx-auto text-center"> {/* Perbaikan di sini */}
          <h1 className="text-3xl font-bold text-white mb-4 shadows-into-light-regular">Tentang Darmi AI</h1>
          <TypingEffect />
          {/* <p className="text-lg text-white sofadi-one-regular bg-opacity-50 bg-black">
            Kenalin nih Darmi AI adalah Personal Assistant yang dibuat oleh keresahan diri sendiri. Kaya kalo kamu ada masalah tapi bingung jawabannya? Tanya Darmi aja!
          </p> */}
          {/* <p className="text-lg text-white sofadi-one-regular bg-opacity-50 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 rounded-lg backdrop-blur-md relative overflow-hidden"> */}
        </div>
      </div>
    </Layout>
  )
}
