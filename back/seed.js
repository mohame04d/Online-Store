import mongoose from 'mongoose';
import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect('mongodb://mohakim88tr_db_user:172304@ac-qamgrxg-shard-00-00.ojnr7fb.mongodb.net:27017,ac-qamgrxg-shard-00-01.ojnr7fb.mongodb.net:27017,ac-qamgrxg-shard-00-02.ojnr7fb.mongodb.net:27017/onlineStore?ssl=true&replicaSet=atlas-12sakd-shard-0&authSource=admin&retryWrites=true&w=majority')
  .then(async () => {
    const productSchema = new mongoose.Schema({
      name: String,
      description: String,
      price: Number,
      category: String,
      image: String
    });
    const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
    
    await Product.deleteMany({});
    
    const categories = ['Men', 'Women', 'Kids', 'Electronics', 'Cosmetics'];
    
    const download = (url, dest) => new Promise((resolve) => {
      const file = fs.createWriteStream(dest);
      https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      });
    });

    const images = [];
    if(!fs.existsSync(path.join(__dirname, 'uploads'))) {
        fs.mkdirSync(path.join(__dirname, 'uploads'));
    }

    console.log("Downloading dummy images...");
    for(let i=1; i<=5; i++) {
      const filename = 'seed_img_'+i+'.jpg';
      await download('https://picsum.photos/400/400?random='+i, path.join(__dirname, 'uploads', filename));
      images.push(filename);
    }
    
    const products = [];
    for(let i=1; i<=15; i++) {
      products.push({
        name: 'Cool Product ' + i,
        description: 'This is a description for amazing product number ' + i,
        price: Math.floor(Math.random() * 200) + 20,
        category: categories[i % categories.length],
        image: images[i % images.length]
      });
    }
    
    await Product.insertMany(products);
    console.log('Database seeded with 15 products!');
    process.exit(0);
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
