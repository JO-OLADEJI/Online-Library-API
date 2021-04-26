const mongoose = require('mongoose');
require('dotenv/config.js');


const dbConnect = () => {
  mongoose.connect(
    process.env.DB_CONNECTION_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('DB connect: success')
  );
}


module.exports = dbConnect;