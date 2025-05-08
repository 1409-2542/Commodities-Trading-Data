"use client"

export default function YearlyCommodityTable({ data }) {
  return (
    <section className="space-y-6 mt-12">
      <h2 className="text-3xl font-bold text-gray-800">Commodity Prices Table</h2>
      <div className="overflow-x-auto mt-6">
        <table className="table-auto w-full bg-white rounded-lg shadow-xl mt-6">
          <thead className="bg-gradient-to-r from-blue-700 to-teal-500 text-white">
            <tr>
              <th className="px-4 py-2 text-left text-sm md:text-base">Commodity</th>
              <th className="px-4 py-2 text-left text-sm md:text-base">Current Price</th>
              <th className="px-4 py-2 text-left text-sm md:text-base">Unit</th>
              <th className="px-4 py-2 text-left text-sm md:text-base">Change</th>
              <th className="px-4 py-2 text-left text-sm md:text-base">Frequency</th>
              <th className="px-4 py-2 text-left text-sm md:text-base">Last</th>
              <th className="px-4 py-2 text-left text-sm md:text-base">Source</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 text-left text-sm md:text-base">{item.name}</td>
                  <td className="px-4 py-2 text-left text-sm md:text-base">{item.price}</td>
                  <td className="px-4 py-2 text-left text-sm md:text-base">{item.unit}</td>
                  <td className={`px-4 py-2 text-left text-sm md:text-base ${item.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {item.change}%
                  </td>
                  <td className="px-4 py-2 text-left text-sm md:text-base">{item.frequency}</td>
                  <td className="px-4 py-2 text-left text-sm md:text-base">{item.last}</td>
                  <td className="px-4 py-2 text-left text-sm md:text-base">{item.source}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        </div>
    </section>
  )
}