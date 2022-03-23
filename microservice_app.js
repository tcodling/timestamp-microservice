require('dotenv').config();
var mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const { Schema } = mongoose;

// Exports
// export.FUNCTION = FUNCTION