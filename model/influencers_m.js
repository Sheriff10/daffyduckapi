const mongoose = require("mongoose");
const Joi = require("joi");

const InfluencerSchema = new mongoose.Schema({
   name: {
      type: String,
   },
   address: {
      type: String,
   },
});

// const create model

const Influencers = mongoose.model("Influencers", InfluencerSchema);

const validateInfluencer = (data) => {
   const schema = Joi.object({
      name: Joi.string().required(),
      address: Joi.string().required(),
   });

   return schema.validate(data);
};


exports.validateInfluencer = validateInfluencer
exports.Influencer = Influencers