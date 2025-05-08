export default function LiveMarketPrices({ data }) {
  return (
    <section className="space-y-6 mt-12">
      <h2 className="text-3xl font-bold text-gray-800">Prices</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((commodity, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className={`text-2xl font-bold ${commodity.titleColor}`}>{commodity.name}</h3>
            <p className="text-lg text-gray-600">
              Current Price:{' '}
              <span className={`font-bold ${commodity.priceColor}`}>${commodity.price.toLocaleString()}</span>
            </p>
            <p className="text-sm text-gray-600 mt-2">{commodity.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}