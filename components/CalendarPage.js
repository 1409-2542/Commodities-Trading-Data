"use client"

export default function Calendar({ data }) {
  return (
    <section className="space-y-6 mt-12">
      <h2 className="text-3xl font-bold text-gray-800">Commodity Events Calendar</h2>
        <table className="table-auto w-full bg-white rounded-lg shadow-md mt-6">
          <thead className="bg-gradient-to-r from-blue-700 to-teal-500 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Commodity</th>
              <th className="px-6 py-4 text-left">Event</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Hour</th>
            </tr>
          </thead>
          <tbody>
            {data.map((event, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-4">{event.commodity}</td>
                <td className="px-6 py-4">{event.event}</td>
                <td className="px-6 py-4">{event.date}</td>
                <td className="px-6 py-4">{event.hour}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </section>
  );
}