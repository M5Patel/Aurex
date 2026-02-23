import { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';

// IMPORT YOUR JSON DATA DIRECTLY
import productsData from '../data/products.json'; 

const SORT_OPTIONS = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest'];
const FILTERS = ['Product type', 'Availability', 'Price', 'Gender'];

export default function ProductListingPage() {
  // 1. FIX: Grab 'slug' as well, in case your App.jsx route uses path="/collections/:slug"
  const { categoryId, slug } = useParams(); 
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('Featured');
  const [sortOpen, setSortOpen] = useState(false);

  // 2. FIX: Determine the active category from the available parameters
  const activeCategory = categoryId || slug || searchParams.get('category');

  useEffect(() => {
    let filtered = [...productsData];
    const maxPrice = searchParams.get('maxPrice');

    // Filter by tags matching the URL
    if (activeCategory) {
      filtered = filtered.filter((p) => 
        p.tags && p.tags.includes(activeCategory)
      );
    }

    if (maxPrice) {
      filtered = filtered.filter((p) => p.price <= Number(maxPrice));
    }

    // Apply sorting logic
    if (sortBy === 'Price: Low to High') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setProducts(filtered);
    
  }, [activeCategory, searchParams, sortBy]);

  // Format the title beautifully
  const pageTitle = (activeCategory || 'All Watches')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());

  return (
    // 3. FIX: Changed py-12 to pt-32 pb-12 so the content starts BELOW your fixed navbar
    <div className="min-h-screen pt-52 pb-12 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">{pageTitle}</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <h2 className="font-semibold mb-4">Filter</h2>
            {FILTERS.map((f) => (
              <div key={f} className="border-b py-3">
                <span className="text-sm">{f}</span>
              </div>
            ))}
          </aside>
          
          {/* Main Content Area */}
          <div className="flex-1">
            
            {/* Sort Dropdown */}
            <div className="flex justify-end mb-6">
              <div className="relative">
                <button 
                  onClick={() => setSortOpen(!sortOpen)} 
                  className="flex items-center gap-2 text-sm"
                >
                  Sort By: {sortBy} <ChevronDown className="w-4 h-4" />
                </button>
                
                {sortOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="absolute right-0 top-full mt-1 bg-white shadow-lg border py-2 min-w-[180px] z-10"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <button 
                        key={opt} 
                        onClick={() => { setSortBy(opt); setSortOpen(false); }} 
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                      >
                        {opt}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {/* Empty State */}
            {products.length === 0 && (
              <p className="text-center text-gray-500 py-12">No products found for this category.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}