import { Link } from 'react-router-dom';
import { categories } from '../../utils/mockData';
import { motion } from 'framer-motion';

const FeaturedCategories = () => {
  return (
    <div className="my-16">
      <h2 className="text-2xl font-bold text-white mb-8 text-center">Browse Categories</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link
              to={`/browse/${category.slug}`}
              className="block bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <div className="p-6 flex flex-col items-center justify-center h-full">
                <h3 className="text-lg font-bold text-white mb-1">{category.name}</h3>
                <p className="text-sm text-gray-400 text-center">Explore {category.name}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;