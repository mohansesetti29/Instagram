import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatNumber } from '../../utils/formatNumber.js';

const allProducts = [
  { id: 1, name: 'Classic Sneakers', price: '$89.99', category: 'Clothing', image: 'https://picsum.photos/300/300?random=200' },
  { id: 2, name: 'Leather Bag', price: '$129.99', category: 'Accessories', image: 'https://picsum.photos/300/300?random=201' },
  { id: 3, name: 'Face Serum', price: '$34.99', category: 'Beauty', image: 'https://picsum.photos/300/300?random=202' },
  { id: 4, name: 'Throw Pillow', price: '$24.99', category: 'Home', image: 'https://picsum.photos/300/300?random=203' },
  { id: 5, name: 'Denim Jacket', price: '$79.99', category: 'Clothing', image: 'https://picsum.photos/300/300?random=204' },
  { id: 6, name: 'Sunglasses', price: '$49.99', category: 'Accessories', image: 'https://picsum.photos/300/300?random=205' },
  { id: 7, name: 'Lipstick Set', price: '$29.99', category: 'Beauty', image: 'https://picsum.photos/300/300?random=206' },
  { id: 8, name: 'Candle Set', price: '$19.99', category: 'Home', image: 'https://picsum.photos/300/300?random=207' },
  { id: 9, name: 'Summer Dress', price: '$59.99', category: 'Clothing', image: 'https://picsum.photos/300/300?random=208' },
  { id: 10, name: 'Watch', price: '$199.99', category: 'Accessories', image: 'https://picsum.photos/300/300?random=209' },
];

const categories = ['All', 'Clothing', 'Accessories', 'Beauty', 'Home'];

export default function ShopPage() {
  const navigate = useNavigate();
  const [activeCat, setActiveCat] = useState('All');
  const [scrollIndex, setScrollIndex] = useState(0);

  const filtered = activeCat === 'All' ? allProducts : allProducts.filter(p => p.category === activeCat);
  const featured = allProducts.slice(0, 5);

  return (
    <div className="max-w-[935px] mx-auto py-4 px-4">
      <div className="flex items-center gap-4 mb-4">
        <svg className="w-6 h-6 text-gray-900 dark:text-gray-200" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
        </svg>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Instagram Shop</h1>
        <Search size={24} className="text-gray-900 dark:text-gray-200 ml-auto" />
      </div>

      {/* Featured Carousel */}
      <div className="relative mb-6">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {featured.map(product => (
            <div key={product.id} className="flex-shrink-0 w-36">
              <img src={product.image} alt={product.name} className="w-full h-36 object-cover rounded-lg" />
              <p className="text-xs font-semibold text-gray-900 dark:text-gray-200 mt-1">{product.name}</p>
              <p className="text-xs text-gray-500">{product.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-4">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCat(cat)}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors
              ${activeCat === cat ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map(product => (
          <div key={product.id} className="cursor-pointer">
            <img src={product.image} alt={product.name} className="w-full aspect-square object-cover rounded-lg" />
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-200 mt-1">{product.name}</p>
            <p className="text-sm text-gray-500">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
