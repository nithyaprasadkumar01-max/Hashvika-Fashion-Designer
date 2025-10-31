import mongoose from 'mongoose';
import Product from '../models/Product';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://nithyaprasadkumar01_db_user:Kumar%40Selvi8508@cluster0.rkkkpow.mongodb.net/?appName=Cluster0';

const sampleProducts = [
  {
    name: "Elegant Silk Blouse",
    price: 1299,
    originalPrice: 1599,
    category: "Blouse",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500",
    images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500"],
    colors: ["Red", "Blue", "Gold"],
    sizes: ["S", "M", "L", "XL"],
    description: "Beautiful silk blouse with intricate embroidery work",
    features: ["Pure Silk", "Hand Embroidered", "Premium Quality"],
    isNew: true,
    isSale: false,
    rating: 4.5,
    reviews: 28
  },
  {
    name: "Princess Kids Frock",
    price: 899,
    category: "Kids Frock",
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500",
    images: ["https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500"],
    colors: ["Pink", "Purple", "White"],
    sizes: ["2-3Y", "4-5Y", "6-7Y"],
    description: "Adorable princess-style frock for kids",
    features: ["Soft Cotton", "Comfortable Fit", "Party Wear"],
    isNew: false,
    isSale: true,
    rating: 4.8,
    reviews: 45
  },
  {
    name: "Designer Churidhar Set",
    price: 2499,
    originalPrice: 2999,
    category: "Churidhar",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500",
    images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500"],
    colors: ["Green", "Maroon", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    description: "Elegant churidhar with dupatta",
    features: ["Premium Fabric", "Designer Pattern", "Complete Set"],
    isNew: true,
    isSale: true,
    rating: 4.6,
    reviews: 32
  },
  {
    name: "Royal Boutique Gown",
    price: 3999,
    category: "Boutique Gown",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500",
    images: ["https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500"],
    colors: ["Black", "Wine", "Royal Blue"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Stunning boutique gown for special occasions",
    features: ["Designer Wear", "Premium Quality", "Party Wear"],
    isNew: true,
    isSale: false,
    rating: 4.9,
    reviews: 67
  },
  {
    name: "Aari Work Blouse",
    price: 1799,
    category: "Aari Work",
    image: "https://images.unsplash.com/photo-1583391733981-5ead0c0e0b5e?w=500",
    images: ["https://images.unsplash.com/photo-1583391733981-5ead0c0e0b5e?w=500"],
    colors: ["Gold", "Silver", "Red"],
    sizes: ["S", "M", "L"],
    description: "Exquisite aari work blouse with traditional design",
    features: ["Hand Crafted", "Traditional Aari Work", "Premium Fabric"],
    isNew: false,
    isSale: false,
    rating: 4.7,
    reviews: 23
  },
  {
    name: "Embroidered Lehenga",
    price: 4599,
    originalPrice: 5499,
    category: "Embroidery",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500",
    images: ["https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500"],
    colors: ["Pink", "Peach", "Mint Green"],
    sizes: ["S", "M", "L", "XL"],
    description: "Beautiful embroidered lehenga for weddings",
    features: ["Heavy Embroidery", "Bridal Wear", "Designer Collection"],
    isNew: true,
    isSale: true,
    rating: 4.8,
    reviews: 89
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    await Product.insertMany(sampleProducts);
    console.log('Added sample products');

    await mongoose.connection.close();
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
