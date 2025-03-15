// pages/[category_slug]/[subcategory_slug].js
import axios from "axios";
import Link from "next/link";

export default function SubcategoryPage({ category, subcategory, commodities }) {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-teal-500 via-blue-600 to-purple-700 text-white py-16 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold tracking-tight">{subcategory?.title || "Loading..."}</h1>
          <p className="mt-4 text-lg font-medium text-gray-200">{subcategory?.description}</p>
        </div>
      </header>

      {/* Commodities Section */}
      <section className="max-w-7xl mx-auto py-16 px-8">
        <h2 className="text-4xl font-bold text-teal-600">Commodities</h2>

        {/* Loading state */}
        {commodities?.length === 0 ? (
          <div className="text-center mt-6 text-gray-600">No commodities found in this subcategory.</div>
        ) : (
          <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {commodities?.map((commodity) => (
              <div
                key={commodity.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
              >
                <Link
                  href={`/${category.slug}/${subcategory.slug}/${commodity.slug}`}
                  className="block text-xl font-bold text-blue-600 hover:text-blue-800 transition"
                >
                  {commodity.name}
                </Link>
                <p className="mt-2 text-gray-500">{commodity.description || "Explore this commodity"}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-sm">© 2025 Commodity Insights. All Rights Reserved.</p>
          <p className="mt-2 text-xs">Disclaimer: Information provided is for informational purposes only and is not investment advice.</p>
        </div>
      </footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { category_slug, subcategory_slug } = context.params;
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/${category_slug}/${subcategory_slug}`);  
    return { props: { category: data.category, subcategory: data.subcategory, commodities: data.commodities } };
  } catch (error) {
    return { props: { category: null, subcategory: null, commodities: [] } };
  }
}