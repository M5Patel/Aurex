import { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { fetchProducts } from '../utils/api';

const SORT_OPTIONS = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest'];
const FILTERS = ['Product type', 'Availability', 'Price', 'Gender'];

export default function ProductListingPage() {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('Featured');
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    fetchProducts().then((data) => {
      let filtered = Array.isArray(data) ? data : [];
      const category = categoryId || searchParams.get('category');
      const maxPrice = searchParams.get('maxPrice');
      if (category) filtered = filtered.filter((p) => p.category === category || p.slug?.includes(category));
      if (maxPrice) filtered = filtered.filter((p) => p.price <= Number(maxPrice));
      setProducts(filtered);
    });
  }, [searchParams, categoryId]);

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <nav className="text-sm text-gray-500 mb-8">Home / {(categoryId || 'All Watches').replace(/-/g, ' ')}</nav>
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">{(categoryId || 'All Watches').replace(/-/g, ' ')}</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 shrink-0">
            <h2 className="font-semibold mb-4">Filter</h2>
            {FILTERS.map((f) => <div key={f} className="border-b py-3"><span className="text-sm">{f}</span></div>)}
          </aside>
          <div className="flex-1">
            <div className="flex justify-end mb-6">
              <div className="relative">
                <button onClick={() => setSortOpen(!sortOpen)} className="flex items-center gap-2 text-sm">Sort By: {sortBy} <ChevronDown className="w-4 h-4" /></button>
                {sortOpen && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute right-0 top-full mt-1 bg-white shadow-lg border py-2 min-w-[180px] z-10">
                  {SORT_OPTIONS.map((opt) => <button key={opt} onClick={() => { setSortBy(opt); setSortOpen(false); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">{opt}</button>)}
                </motion.div>}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
            {products.length === 0 && <p className="text-center text-gray-500 py-12">No products found.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
