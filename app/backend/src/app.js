const express = require('express');
const cors = require('cors');

const menuItems = [
  {
    id: 'dish-biryani',
    name: 'Hyderabadi Biryani',
    description: 'Slow-cooked basmati rice with layered spices and tender chicken.',
    price: 12.5,
    category: 'Main Course'
  },
  {
    id: 'dish-tikka',
    name: 'Paneer Tikka Bowl',
    description: 'Char-grilled paneer with roasted peppers over fragrant jeera rice.',
    price: 10.0,
    category: 'Vegetarian'
  },
  {
    id: 'dish-brownie',
    name: 'Molten Chocolate Brownie',
    description: 'Gooey chocolate brownie served with vanilla bean ice cream.',
    price: 6.0,
    category: 'Dessert'
  }
];

const app = express();

app.use(cors());

app.get('/menu', (_req, res) => {
  res.json({
    items: menuItems,
    metadata: {
      currency: 'USD',
      generatedAt: new Date().toISOString()
    }
  });
});

module.exports = {
  app,
  menuItems
};
