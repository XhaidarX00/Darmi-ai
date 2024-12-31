import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[calc(100vh-128px)] p-4">
        <h1 className="text-4xl font-bold text-white shadows-into-light-regular">Welcome to Darmi AI</h1>
      </div>
    </Layout>
  )
}