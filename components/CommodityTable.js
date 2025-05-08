"use client"

export default function CommodityTable({ data }) {
  return (
    <section>
      <h2 className="text-3xl font-bold text-gray-800">Commodity Prices Table</h2>
      <div className="overflow-x-auto mt-6">
        <table className="table-auto w-full bg-white rounded-lg shadow-xl mt-6">
          <thead className="bg-gradient-to-r from-blue-700 to-teal-500 text-white">
            <tr>
              <th className="px-4 py-2 text-left text-sm md:text-base">Commodity</th>
              <th className="px-4 py-2 text-left text-sm md:text-base">Current Price</th>
              <th className="px-4 py-2 text-left text-sm md:text-base">Change</th>
              <th className="px-4 py-2 text-left text-sm md:text-base">Last</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 text-left text-sm md:text-base">{item.name}</td>
                  <td className="px-4 py-2 text-left text-sm md:text-base">{item.price}</td>
                  <td className={`px-4 py-2 text-left text-sm md:text-base ${item.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {item.change}%
                  </td>
                  <td className="px-4 py-2 text-left text-sm md:text-base">{item.last}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        </div>
    </section>
  )
}