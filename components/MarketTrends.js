const colorClassMap = {
  'blue-700': 'text-blue-700 border-blue-700',
  'teal-500': 'text-teal-500 border-teal-500',
  'yellow-500': 'text-yellow-500 border-yellow-500'
};

export default function MarketTrends({ data }) {
  return (
    <section className="space-y-6 mt-12">
      <h2 className="text-3xl font-bold text-gray-800">Commodity Market Trends</h2>
      <div className="flex flex-col space-y-4">
        {data.map((trend, idx) => {
          const colorClasses = colorClassMap[trend.color] || '';
          return (
            <div
              key={idx}
              className={`bg-white p-6 rounded-lg shadow-lg border-l-4 ${colorClasses.split(' ')[1]}`}
            >
              <h3 className={`text-xl font-bold ${colorClasses.split(' ')[0]}`}>{trend.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{trend.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}