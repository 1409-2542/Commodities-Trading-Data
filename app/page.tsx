import liveprices from '../data/liveprices'
import commodities from '../data/commodities'
import marketTrends from '../data/markettrends'

import LiveMarketPrices from '../components/LiveMarketPrices'
import CommodityTable from '../components/CommodityTable'
import MarketTrends from '../components/MarketTrends'

export default function HomePage() {
  return (
    <div className="space-y-12">
      <div>
        <LiveMarketPrices data={liveprices} />
      </div>
      <div>
        <MarketTrends data={marketTrends} />
      </div>
      <div>
        <CommodityTable data={commodities} />
      </div>
    </div>
  );
}