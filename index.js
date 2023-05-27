const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { validateAirdrop, Airdrop } = require("./model/insert_m");

mongoose
   .connect(
      "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0"
   )
   .then(() => {
      console.log("Connected to database successfully");
   })
   .catch((err) => {
      console.log(err);
   });
const app = express();
app.use(cors());
app.use(express.json());

app.get("/:password", async (req, res) => {
   const password = req.params.password;
   if (password !== "daffyducksecret")
      res.status(403).send("Access Denied!!!");
   else {
      const airdrop_data = await Airdrop.find({});
      res.status(200).send(airdrop_data);
   }
});

app.post("/airdrop/new", async (req, res) => {
   const { error } = validateAirdrop(req.body);
   //    if theres error send bad request
   if (error) res.status(400).send(error.message);
   else {
      const { twitter_username } = req.body;
      const findUsername = await Airdrop.count({ twitter_username });

      if (findUsername == 1) res.status(400).send("username exists");
      else {
         const airdrop = new Airdrop({
            twitter_username: req.body.twitter_username,
            retweet_link: req.body.retweet_link,
            post_link: req.body.post_link,
            address: req.body.address,
         });
         await airdrop.save();
         res.status(200).send("inserted");
      }
   }
});

const port = process.env.PORT || 5000
app.listen(port, () => {
   console.log("listening to port 5000...");
});