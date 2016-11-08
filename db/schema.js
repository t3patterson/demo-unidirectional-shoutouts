   const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

// ----------------------
// DATA TABLE
// ----------------------
const shoutOutSchema = new Schema({
  // example of optional fields
  msg:         { type: String, required: true },
  imgLink:     { type: String, required: true },
  from :       { type: String  },
  rating:      { type: String, required: true  },
  createdAt:    { type: Date, default: Date.now }

})



module.exports = {
   /*
    * NOTE: you would ideally change the export-value and the model-name
    */
  ShoutOut: createModel('ShoutOut', shoutOutSchema)
}
