import Link from 'next/link'
import liveprices from '../data/liveprices'
import commodities from '../data/commodities'
import marketTrends from '../data/markettrends'
import calendar from '../data/calendar'

import LiveMarketPrices from '../components/LiveMarketPrices'
import CommodityTable from '../components/CommodityTable'
import MarketTrends from '../components/MarketTrends'
import CalendarPage from '../components/CalendarPage'

export default function HomePage() {
  return (
    <div className="space-y-12">
      <div>
        <LiveMarketPrices data={liveprices} />
      </div>
      <div>
        <CalendarPage data={calendar.slice(0, 3)} />
        <Link href="/calendar" className="text-blue-600 hover:underline">View All →</Link>
      </div>
      <div>
        <MarketTrends data={marketTrends} />
      </div>
      <div>
        <CommodityTable data={commodities.slice(0, 9)} />
        <Link href="/prices" className="text-blue-600 hover:underline">View All →</Link>
      </div>
      <div>
      <Link href="/yearly-prices" className="text-3xl font-bold text-gray-800 hover:text-blue-800">View Yearly Commodity Prices &#62;</Link>
      </div>      
    </div>
  );
}