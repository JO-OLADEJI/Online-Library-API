const express = require('express');
const cors = require('cors');
const dbConnect = require('./models/dbConnect.js');




const app = express();
dbConnect();
app.use(express.json());
app.use(cors());




app.get('/', (req, res) => res.send('Welcome to a Virtual Book Library. Choose a genre...'));
app.use('/api/books', require('./routes/books.js'));
app.use('*', (req, res) => res.status(404).send('Opps, this page doesn\'t exist'));




const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));