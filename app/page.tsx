import dynamic from 'next/dynamic'

const PoliticalQuestionnaire = dynamic(() => import('../components/PoliticalQuestionnaire'), { ssr: false })

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto py-6">
        <h1 className="text-3xl font-bold">Your Political Compass</h1>
      </header>

      <main className="container mx-auto px-4 py-8">
        <PoliticalQuestionnaire />
      </main>
    </div>
  )
}