import Link from 'next/link'

export default function Header() {
  return (
    <Link href="/" passHref>
      <header className="bg-gradient-to-r from-blue-700 to-teal-500 text-white py-6 px-8 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-extrabold">Commodities Trading Data</h1>
        <p className="mt-3 text-lg opacity-90">Explore prices, trends, and expert insights on commodities.</p>
      </header>
    </Link>
  )
}