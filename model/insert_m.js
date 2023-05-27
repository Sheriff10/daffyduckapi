const mongoose = require("mongoose");
const Joi = require("joi");

const AirdropSchema = new mongoose.Schema({
   twitter_username: {
      type: String,
      required: true,
   },
   retweet_link: {
      type: String,
      required: true,
   },
   post_link: {
      type: String,
      required: true,
   },
   address: {
      type: String,
      required: true,
   },
});

// Create Airdrop model
const Airdrop = mongoose.model("Airdrop", AirdropSchema);

// Validate Data
const validateAirdrop = (data) => {
   const schema = Joi.object({
      twitter_username: Joi.string().required(),
      retweet_link: Joi.string().required(),
      post_link: Joi.string().required(),
      address: Joi.string().required(),
   });

   return schema.validate(data);
};

exports.validateAirdrop = validateAirdrop
exports.Airdrop = Airdrop