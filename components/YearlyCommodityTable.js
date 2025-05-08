"use client"

export default function YearlyCommodityTable({ data }) {
  return (
    <section>
      <h2 className="text-3xl font-bold text-gray-800">Commodity Prices Table</h2>
        <table className="table-auto w-full bg-white rounded-lg shadow-xl mt-6">
          <thead className="bg-gradient-to-r from-blue-700 to-teal-500 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Commodity</th>
              <th className="px-6 py-4 text-left">Current Price</th>
              <th className="px-6 py-4 text-left">Unit</th>
              <th className="px-6 py-4 text-left">Change</th>
              <th className="px-6 py-4 text-left">Frequency</th>
              <th className="px-6 py-4 text-left">Last</th>
              <th className="px-6 py-4 text-left">Source</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.price}</td>
                  <td className="px-6 py-4">{item.unit}</td>
                  <td className={`px-6 py-4 ${item.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {item.change}%
                  </td>
                  <td className="px-6 py-4">{item.frequency}</td>
                  <td className="px-6 py-4">{item.last}</td>
                  <td className="px-6 py-4">{item.source}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
    </section>
  )
}