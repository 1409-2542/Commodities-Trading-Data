// components/Footer.js

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-teal-500 via-blue-600 to-purple-700 text-white py-6 px-8 mt-16 rounded-t-2xl">
      <div className="container mx-auto text-center">
        <div className="text-sm">
          <p>&copy; 2025 Commodities Trading Data. All rights reserved.</p>
        </div>
        <div className="mt-4 text-sm">
          <p>
          Disclaimer: The content on this website is for informational purposes only and does not constitute financial advice or recommendations. Please conduct your own research before making any investment decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;