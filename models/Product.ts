import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: Number,
  category: { type: String, required: true },
  image: { type: String, required: true },
  images: [String],
  colors: [String],
  sizes: [String],
  description: String,
  features: [String],
  isNew: { type: Boolean, default: false },
  isSale: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 }
}, { timestamps: true, suppressReservedKeysWarning: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
