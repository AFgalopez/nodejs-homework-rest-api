const mongoose = require('mongoose');
const app = require('./app')
require('dotenv').config()

app.listen(process.env.PORT, () => {
  mongoose.connect(process.env.MONGODB)
  .then(() => console.log('Database connection successful'))
  .catch((err)=>process.exit(1))
  console.log('Server running. Use our API on port: ${process.env.PORT}')
})