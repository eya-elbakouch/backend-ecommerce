const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');
const Vet = require('./models/Vet');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // 1. Génération du compte Administrateur
    const adminExists = await User.findOne({ email: 'admin@petchologie.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin Petchologie',
        email: 'admin@petchologie.com',
        password: 'admin', // Sera haché automatiquement par le Model Mongoose
        role: 'admin'
      });
      console.log('👑 Compte Administrateur généré avec succès !');
    } else {
      console.log('👑 Compte Administrateur déjà présent.');
    }

    // 2. Génération des Vétérinaires (Module Doctolib)
    await Vet.deleteMany();
    const mockVets = [
      { name: 'Dr. Sophie Laurent', specialty: 'Généraliste & Chiens', clinic_name: 'Clinique des Paddock', address: '12 Rue de la Paix, Paris', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300', price: 45, rating: 4.8 },
      { name: 'Dr. Marc Dubois', specialty: 'Félin (Chats)', clinic_name: 'Minou Santé', address: '44 Avenue des Champs, Lyon', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300', price: 40, rating: 4.9 },
      { name: 'Dr. Emilie Roux', specialty: 'NAC & Ostéopathie', clinic_name: 'Centre Vétérinaire Horizon', address: '8 Boulevard Sud, Marseille', image: 'https://images.unsplash.com/photo-1594824432258-0027f311c1c7?auto=format&fit=crop&q=80&w=300', price: 55, rating: 4.7 }
    ];
    await Vet.insertMany(mockVets);
    console.log('🩺 Vétérinaires générés avec succès !');

    // 3. Génération des produits
    await Product.deleteMany();
    const sampleProducts = [
      { name: 'Royal Canin Maxi Adult', price: 65.99, category: 'Alimentation', description: 'Une formule nutritionnelle sur mesure pour répondre aux besoins des grands chiens adultes (26 à 44 kg). Protège les articulations et favorise la digestion.', target_animal_type: 'Chien', target_weight: 30, image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&q=80' },
      { name: 'Hill\'s Science Plan Feline', price: 25.50, category: 'Alimentation', description: 'Croquettes au poulet de haute qualité pour maintenir votre chat adulte en parfaite santé. Riche en protéines et oméga-3.', target_animal_type: 'Chat', target_weight: 5, image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&q=80' },
      { name: 'PetSafe Distributeur Smart Feed', price: 189.99, category: 'Gadgets', description: 'Programmez et contrôlez les repas de votre animal depuis votre smartphone. Idéal pour les longues journées de travail ou les week-ends.', is_gadget: true, image: 'https://images.unsplash.com/photo-1585559700398-1385b3a8aeb6?w=500&q=80' },
      { name: 'KONG Classic Jouet d\'Occupation', price: 14.99, category: 'Accessoires', description: 'Le jouet référence en caoutchouc naturel ultra-résistant. Parfait pour être fourré de friandises et occuper votre chien pendant des heures.', target_animal_type: 'Chien', image: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=500&q=80' },
      { name: 'Arbre à Chat XXL Trixie (1.80m)', price: 149.00, category: 'Accessoires', description: 'Le véritable paradis des félins. Comprend des plateformes d\'observation, des cachettes confortables et des griffoirs en sisal robuste.', target_animal_type: 'Chat', image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=500&q=80' },
      { name: 'Tracker GPS Chien Tractive', price: 49.99, category: 'Gadgets', description: 'Ne perdez plus jamais la trace de votre chien. Suivi GPS en temps réel, alertes anti-fugue et moniteur d\'activité intégrés.', is_gadget: true, target_animal_type: 'Chien', image: 'https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?w=500&q=80' },
      { name: 'Fontaine à Eau Catit Flower', price: 34.99, category: 'Gadgets', description: 'Encourage votra chat à boire davantage grâce à un flux d\'eau continu et filtré. Prévient les maladies rénales fréquentes chez les félins.', is_gadget: true, target_animal_type: 'Chat', image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=500&q=80' },
      { name: 'Orijen Original Sans Céréales', price: 89.99, category: 'Alimentation', description: 'Alimentation biologiquement appropriée, riche en viandes fraîches (poulet, dinde, poissons). 0% de céréales pour une santé optimale.', target_animal_type: 'Chien', image: 'https://images.unsplash.com/photo-1597843786411-a7ebfa204c35?w=500&q=80' },
      { name: 'Litière Catsan Hygiene Plus', price: 18.99, category: 'Accessoires', description: 'Absorption ultra-rapide et neutralisation totale des mauvaises odeurs. Ne colle pas aux pattes.', target_animal_type: 'Chat', image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=500&q=80' },
      { name: 'Brosse Étrille Furminator', price: 39.99, category: 'Accessoires', description: 'Réduit la perte de poils jusqu\'à 90%. Outil professionnel recommandé par les toiletteurs pour un brossage efficace.', image: 'https://images.unsplash.com/photo-1516734212822-43013ea01824?w=500&q=80' }
    ];
    
    await Product.insertMany(sampleProducts);
    console.log('✅ Produits générés avec succès !');
    
    process.exit();
  } catch (error) {
    console.error(`❌ Erreur: ${error.message}`);
    process.exit(1);
  }
};

importData();
