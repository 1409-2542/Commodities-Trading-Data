import commodities from '../data/commodities'
import CommodityTable from '../components/CommodityTable'

export default function HomePage() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800">Commodity Prices Table</h2>
      <p className="text-sm text-gray-600">
        This is a simple, up-to-date table of key commodities data.
      </p>
      <CommodityTable data={commodities} />
    </div>
  )
}