/* jshint esversion: 8 */
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors'); // Removed extra space

const app = express(); // Added semicolon
const port = 3030; // Added semicolon

app.use(cors());
app.use(require('body-parser').urlencoded({ extended: false })); // Added semicolon

const reviews_data = JSON.parse(fs.readFileSync("reviews.json", 'utf8')); 
const dealerships_data = JSON.parse(fs.readFileSync("dealerships.json", 'utf8'));

mongoose.connect("mongodb://mongo_db:27017/",{'dbName':'dealershipsDB'}); // Added semicolon

const Reviews = require('./review'); // Added semicolon
const Dealerships = require('./dealership'); // Added semicolon

try {
  Reviews.deleteMany({}).then(() => {
    Reviews.insertMany(reviews_data.reviews); // Dot notation
  });
  Dealerships.deleteMany({}).then(() => {
    Dealerships.insertMany(dealerships_data.dealerships); // Dot notation
  }); 
} catch (error) {
  res.status(500).json({ error: 'Error fetching documents' }); // Added semicolon
}

// Express route to home
app.get('/', async (req, res) => {
  res.send("Welcome to the Mongoose API"); // Added semicolon
});

// Express route to fetch all reviews
app.get('/fetchReviews', async (req, res) => {
  try {
    const documents = await Reviews.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' }); // Added semicolon
  }
});

// Express route to insert review
app.post('/insert_review', express.raw({ type: '*/*' }), async (req, res) => {
  const data = JSON.parse(req.body); // Changed to const
  const documents = await Reviews.find().sort( { id: -1 } );
  const new_id = documents[0].id + 1; // Dot notation, added semicolon

  const review = new Reviews({
      "id": new_id,
      "name": data.name, // Dot notation
      "dealership": data.dealership, // Dot notation
      "review": data.review, // Dot notation
      "purchase": data.purchase, // Dot notation
      "purchase_date": data.purchase_date, // Dot notation
      "car_make": data.car_make, // Dot notation
      "car_model": data.car_model, // Dot notation
      "car_year": data.car_year, // Dot notation
  });

  try {
    const savedReview = await review.save();
    res.json(savedReview);
  } catch (error) {
    console.log(error); // Added semicolon
    res.status(500).json({ error: 'Error inserting review' }); // Added semicolon
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); // Added semicolon
});
