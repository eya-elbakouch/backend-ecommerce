const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecommendations = async (req, res) => {
  try {
    const Pet = require('../models/Pet');
    const Product = require('../models/Product');
    const pets = await Pet.find({ user_id: req.user._id });
    if (pets.length === 0) return res.json([]);
    
    const allProducts = await Product.find({});
    
    // Algorithme de Match personnalisé Avancé
    let scoredProducts = allProducts.map(product => {
      let score = 0;
      pets.forEach(pet => {
        // Match par Espèce
        if (product.target_animal_type === pet.type) score += 50;
        if (product.target_animal_type === 'Général') score += 10;
        
        // --- LOGIQUE METIER EXPERTE ---
        // 1. Animal âgé (>= 8 ans) -> Booster les produits Senior
        if (pet.age >= 8 && (product.name.toLowerCase().includes('senior') || product.name.toLowerCase().includes('âgé') || product.description.toLowerCase().includes('âgé'))) {
           score += 200; // Perfect match
        }
        
        // 2. Chat en surpoids (>= 6kg) ou Chien en surpoids (>= 30kg) -> Booster les produits Light
        const isCatOverweight = pet.type === 'Chat' && pet.weight >= 6;
        const isDogOverweight = pet.type === 'Chien' && pet.weight >= 30;
        
        if ((isCatOverweight || isDogOverweight) && (product.name.toLowerCase().includes('light') || product.name.toLowerCase().includes('surpoids') || product.name.toLowerCase().includes('minceur'))) {
           score += 200; // Perfect match
        }
        
        // Standard proximities
        if (product.target_age && pet.age >= product.target_age - 2 && pet.age <= product.target_age + 2) score += 20;
        if (product.target_weight && pet.weight >= product.target_weight - 5 && pet.weight <= product.target_weight + 5) score += 20;
      });
      return { product, score };
    });
    
    // Trier par score décroissant et prendre les 4 meilleurs
    const recommendations = scoredProducts
      .filter(p => p.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map(p => p.product);
      
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct, getRecommendations };
