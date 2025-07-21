const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
  {
    name: 'Classic White T-Shirt',
    description: 'A timeless white t-shirt made from 100% organic cotton. Perfect for any occasion.',
    price: 499,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    category: 'T-Shirts',
  },
  {
    name: 'Blue Denim Jeans',
    description: 'Slim-fit blue denim jeans with a comfortable stretch. Durable and stylish.',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    category: 'Jeans',
  },
  {
    name: 'Red Summer Dress',
    description: 'Lightweight red dress perfect for summer outings. Flowy and elegant.',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
    category: 'Dresses',
  },
  {
    name: 'Black Leather Jacket',
    description: 'Premium black leather jacket for a bold look. Soft lining and zip closure.',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    category: 'Jackets',
  },
  {
    name: 'Grey Hoodie',
    description: 'Cozy grey hoodie with front pockets and adjustable drawstring. Great for layering.',
    price: 899,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    category: 'Hoodies',
  },
  {
    name: 'Green Chinos',
    description: 'Smart casual green chinos with a slim fit. Perfect for work or weekends.',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1469398715555-76331a6c7c9b?auto=format&fit=crop&w=400&q=80',
    category: 'Pants',
  },
  {
    name: 'Yellow Floral Skirt',
    description: 'Bright yellow skirt with floral prints. Flattering and fun for spring.',
    price: 999,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    category: 'Skirts',
  },
  {
    name: 'Navy Blue Polo',
    description: 'Classic navy blue polo shirt with a soft collar. Versatile and comfortable.',
    price: 799,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    category: 'T-Shirts',
  },
  {
    name: 'White Sneakers',
    description: 'Trendy white sneakers with cushioned soles. Great for everyday wear.',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
    category: 'Shoes',
  },
  {
    name: 'Black Formal Trousers',
    description: 'Elegant black trousers for formal occasions. Tailored fit and premium fabric.',
    price: 1399,
    image: 'https://images.unsplash.com/photo-1469398715555-76331a6c7c9b?auto=format&fit=crop&w=400&q=80',
    category: 'Pants',
  },
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Database seeded with products!');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seedProducts(); 