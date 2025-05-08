import yearlycommodities from '../../data/yearlycommodities'
import YearlyCommodityTable from '../../components/YearlyCommodityTable'

export default function YearlyCommoditiesPage() {
  return (
    <div className="space-y-12">
      <div>
        <YearlyCommodityTable data={yearlycommodities} />
      </div>
    </div>
  );
}