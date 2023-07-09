const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const user = require('./routes/user');
const bodyParser=require("body-parser")

//initilze express.js
const app = express();
//to receive json data
app.use(express.json());
//initilze cors 
app.use(cors({
    origin: '*'
}));

//connect mongobd
mongoose.connect('mongodb+srv://devilikhitha:devilikhitha@cluster0.estft3j.mongodb.net/details?retryWrites=true&w=majority').then(
    console.log("Db is connected")
);

//auth api's
app.use('/api/auth', auth);
//users api's
app.use('/api/user', user);
app.get('/',(req,res)=>{
    res.send("api is working")
})
// Define a schema for the form data (bookform)
const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    username: String,
    accommodationType: String,
    roomNumber: String,
    acPreference: String,
    fixedAmount: String,
  });

  const FormData = mongoose.model('FormData', formSchema);
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  
  // Endpoint to handle form submission
  app.post('/SubmitForm', (req, res) => {
    const formData = new FormData({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      accommodationType: req.body.accommodationType,
      roomNumber: req.body.roomNumber,
      acPreference: req.body.acPreference,
      fixedAmount: req.body.fixedAmount,
    });
  
    formData.save()
      .then(() => {
        console.log('Form data saved');
        res.json({ message: 'Form submitted successfully!' });
      })
      .catch((error) => {
        console.error('Error saving form data:', error);
        res.status(500).json({ error: 'An error occurred while saving the form data' });
      });
  });

  // Endpoint to retrieve form data
app.get('/api/formData', (req, res) => {
  FormData.find()
    .then((formData) => {
      res.json(formData);
    })
    .catch((error) => {
      console.error('Error retrieving form data:', error);
      res.status(500).json({ error: 'An error occurred while retrieving form data' });
    });
});
//   // Create a model based on the schema
//   const FormModel = mongoose.model('Form', formSchema);
  
//   // API endpoint to handle form submission
//   app.post('/SubmitForm', async (req, res) => {
//     try {
//       // Create a new instance of the FormModel with the submitted data
//       const form = new FormModel(req.body);
  
//       // Save the form data to the database
//       await form.save();
  
//       // Send a response indicating success
//       res.json({ message: 'Form submitted successfully' });
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       // Send a response indicating failure
//       res.status(500).json({ error: 'Failed to submit form' });
//     }
//   });
  // Define a schema for the form data (contact)
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
  });
  
  // Create a model based on the schema
  const ContactModel = mongoose.model('Contact', contactSchema);
  
  // API endpoint to handle form submission
  app.post('/submitContactForm', async (req, res) => {
    try {
      // Create a new instance of the ContactModel with the submitted data
      const contact = new ContactModel(req.body);
  
      // Save the contact data to the database
      await contact.save();
  
      // Send a response indicating success
      res.json({ message: 'Contact form submitted successfully' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      // Send a response indicating failure
      res.status(500).json({ error: 'Failed to submit contact form' });
    }
  });
  
//run server
app.listen(5000, () => console.log('server is running'));