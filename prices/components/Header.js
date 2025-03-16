// components/Header.js

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-teal-500 via-blue-600 to-purple-700 text-white py-6 px-8 z-10 rounded-b-2xl">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-4xl font-extrabold">Commodities Trading Data</a>
        <nav className="space-x-6">
          <a href="#prices" className="text-lg hover:text-yellow-400">Prices</a>
          <a href="#calendar" className="text-lg hover:text-yellow-400">Calendar</a>
          <a href="#news" className="text-lg hover:text-yellow-400">News</a>
          <a href="#contact" className="text-lg hover:text-yellow-400">Contact</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;