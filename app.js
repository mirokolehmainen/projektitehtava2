// Otetaan express-moduulit käyttöön
const express = require("express");
const app = express();
const mongoose = require('mongoose')
const Kala = require('./Mallit/kalat')

// Tämä tarvitaan json datan lukemista varten
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Luodaan reitit ja niiden toiminnallisuudet

//Kokeillaan, että sivusto toimii
app.get('/', (req, res) => {
  res.send('Terve sivusto toimii!')
})

// Tulostetaan kaikki kalat
app.get('/api/kala', async(req, res) => {
  try {
      const kalat = await Kala.find({});
      res.status(200).json(kalat);
  } catch (error) {
      res.status(500).json({message: error.message})
  }
})

// Haetaan kala id:n perusteella
app.get('/api/kala/:id', async(req, res) =>{
  try {
      const {id} = req.params;
      const kala = await Kala.findById(id);
      res.status(200).json(kala);
  } catch (error) {
      res.status(500).json({message: error.message})
  }
})


// Lisätään uusia kaloja
app.post('/api/lisaa', async(req, res) => {
  try {
      const kala = await Kala.create(req.body)
      res.status(200).json(kala);
      
  } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message})
  }
})


// Muokataan kalojen tietoja id-numeron perusteella. 
app.put('/api/muokataan/:id', async(req, res) => {
  try {
      const {id} = req.params;
      const kala = await Kala.findByIdAndUpdate(id, req.body);
      // Viesti jos ei löydy tuloksia
      if(!kala){
          return res.status(404).json({message: `Hakusi ei tuota tuloksia ${id}`})
      }
      const Muokattu = await Kala.findById(id);
      res.status(200).json(Muokattu);
      
  } catch (error) {
      res.status(500).json({message: error.message})
  }
})

// Poistetaan kaloja
app.delete('/api/poista/:_id', async(req, res) =>{
  try {
      const {_id} = req.params;
      const product = await Kala.findByIdAndDelete(_id);
      if(!kala){
          return res.status(404).json({message: `Hakusi ei tuota tuloksia ${_id}`})
      }
      res.status(200).json(kala);
      
  } catch (error) {
      res.status(500).json({message: error.message})
  }
})

// Web-palvelimen luonti Expressin avulla
app.listen(8000, function() {
  console.log("Kuunnellaan porttia 8000!");
});

// Mongooseen yhdistäminen
mongoose.connect('mongodb+srv://admin:admin@cluster1.hmhscon.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
console.log("Yhteys toimii");
}).catch(() => {
  console.log("Ei tomi")
});
