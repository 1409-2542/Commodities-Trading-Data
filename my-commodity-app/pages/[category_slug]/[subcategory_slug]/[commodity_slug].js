// pages/[category_slug]/[subcategory_slug]/[commodity_slug].js
import axios from "axios";
import Header from "../../../components/Header";  
import Footer from "../../../components/Footer";

export default function CommodityPage({ commodity, price, productionData }) {
  return (
    <div className="bg-gray-100 min-h-screen pt-20"> {/* Apply padding top to avoid overlap with fixed header */}
      <Header />

      {/* Hero Section */}
      <header className="bg-gray-100 text-gray-800 py-16 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold tracking-tight">{commodity?.name || "Loading..."}</h1>
          {commodity?.description && <p className="mt-4 text-lg font-medium text-gray-600">{commodity?.description}</p>}
        </div>
      </header>

      {/* Latest Price Section */}
      <section className="max-w-7xl mx-auto py-16 px-8">
        <h2 className="text-4xl font-bold text-teal-600">Latest Price</h2>
        {price ? (
          <div className="mt-6 bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
            <p className="text-xl font-bold text-blue-600">
              {price.symbol_currency}{price.price} {price.unit_description}
            </p>
            <p className="mt-4 text-gray-500">
              Updated on {new Date(price.date).toLocaleDateString('en-US', { 
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
              })}
            </p>
            {/* Daily Change */}
            <div className="mt-4">
              <p className={`text-xl font-semibold ${price.daily_change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                <span className={`mr-2 ${price.daily_change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {price.daily_change >= 0 ? '▲' : '▼'}
                </span>
                {price.daily_change} {price.currency}
              </p>
            </div>

            {/* Percent Change */}
            <div className="mt-2">
              <p className={`text-xl font-semibold ${price.percent_change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                <span className={`mr-2 ${price.percent_change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {price.percent_change >= 0 ? '▲' : '▼'}
                </span>
                {price.percent_change}%
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-6 bg-white p-8 rounded-lg shadow-lg">
            <p className="text-lg text-gray-600">No price available for this commodity.</p>
          </div>
        )}
      </section>

      {/* Production Data Section */}
      <section className="max-w-7xl mx-auto py-16 px-8">
        <h2 className="text-4xl font-bold text-teal-600">Production Data</h2>
        {productionData.length > 0 ? (
          <div className="mt-6 space-y-4">
            {productionData.map((data, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold">{data.year}</h3>
                <p className="text-xl mt-2 text-gray-600">Producer: {data.producer_name}</p>
                <p className="text-xl text-gray-600">Country: {data.country_name}</p>
                <p className="text-xl text-gray-600">Total Production: {data.total_production} {data.unit_name}</p>
                <p className="text-xl text-gray-600">Market Share: {data.market_share_percentage}%</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 bg-white p-8 rounded-lg shadow-lg">
            <p className="text-lg text-gray-600">No production data available for this commodity.</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { category_slug, subcategory_slug, commodity_slug } = context.params;
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/${category_slug}/${subcategory_slug}/${commodity_slug}`);
    return { 
      props: { 
        commodity: data.commodity, 
        price: data.price, 
        productionData: data.productionData 
      } 
    };
  } catch (error) {
    return { 
      props: { 
        commodity: null, 
        price: null, 
        productionData: [] 
      } 
    };
  }
}