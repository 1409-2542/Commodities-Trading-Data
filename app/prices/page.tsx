import commodities from '../../data/commodities'
import CommodityTable from '../../components/CommodityTable'

export default function LiveMarketPrices() {
  return (
    <section>
      <div>
        <CommodityTable data={commodities}/>
      </div>
    </section>
  );
}