// pages/[category_slug].js
import axios from "axios";
import Link from "next/link";
import '../app/globals.css';
import { useState, useEffect } from "react";


export default function CategoryPage({ category, subcategories }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category && subcategories) {
      setLoading(false);
    }
  }, [category, subcategories]);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-teal-500 via-blue-600 to-purple-700 text-white py-16 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold tracking-tight">{category?.title || "Loading..."}</h1>
          <p className="mt-4 text-lg font-medium text-gray-200">{category?.description}</p>
        </div>
      </header>

      {/* Subcategories Section */}
      <section className="max-w-7xl mx-auto py-16 px-8">
        <h2 className="text-4xl font-bold text-teal-600">Subcategories</h2>

        {/* Loading state */}
        {loading ? (
          <div className="flex justify-center mt-6">
            <div className="animate-spin border-4 border-t-4 border-teal-500 border-dotted rounded-full w-16 h-16"></div>
          </div>
        ) : (
          <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {subcategories?.map((sub) => (
              <div key={sub.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                <Link href={`/${category.slug}/${sub.slug}`} className="block text-xl font-bold text-blue-600 hover:text-blue-800 transition">
                  {sub.title}
                </Link>
                <p className="mt-2 text-gray-500">{sub.description || "Explore this subcategory"}</p>
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

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function getServerSideProps({ params }) {
  const { category_slug } = params;  // Get category from URL

  try {
    const response = await fetch(`${API_URL}/api/${category_slug}`);  // Dynamic API call
    if (!response.ok) throw new Error("API request failed");

    const data = await response.json();
    return {
      props: {
        category: data.category,
        subcategories: data.subcategories || []
      }
    };
  } catch (error) {
    console.error("API Error:", error);
    return { notFound: true };  // Show 404 page if API fails
  }
}