// pages/[category_slug].js
import axios from "axios";
import Link from "next/link";
import '../app/globals.css';
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";


export default function CategoryPage({ category, subcategories }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category && subcategories) {
      setLoading(false);
    }
  }, [category, subcategories]);

  return (
    <div className="bg-gray-100 min-h-screen pt-20"> {/* Apply padding top to avoid overlap with fixed header */}
      <Header />

      {/* Hero Section */}
      <header className="bg-gray-200 text-gray-800 py-12 px-8 mt-24">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-semibold">{category?.title || "Loading..."}</h1>
          {category?.description && <p className="mt-2 text-lg text-gray-600">{category?.description}</p>}
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

      <Footer />
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