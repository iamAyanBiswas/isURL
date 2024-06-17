import express from 'express'
import { randomGenerator, verifyLinkValidity } from './clint.js'

const app = express()

import 'dotenv/config'
const port = process.env.PORT;
const link = process.env.LC_HOST + port;

import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


import mongoose from 'mongoose';
import { test } from './test.js';

// let conn = await mongoose.connect("mongodb://localhost:27017/myurl")
let conn = await mongoose.connect(`mongodb+srv://${process.env.ADMIN}:${process.env.PASSWORD}@url.gtqld5r.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`)

app.get('/', (req, res) => {
  res.sendFile("./templete/index.html", { root: __dirname })
})



app.post('/api/', async (req, res) => {
  const link = req.query.link;
  let random;

  async function generateUniqueRandom() {
      random = randomGenerator();

      try {
          
          const existingDoc = await test.findOne({ random: random });
          if (existingDoc) {
            console.log("REPEAT")
              return generateUniqueRandom();
          }

          const myurl = new test({ random: random, link: link });
          await myurl.save();
      } catch (err) {
          console.error("Error saving URL:", err.message);
      }
  }
  await generateUniqueRandom();

  res.json(`https://isurl.onrender.com/` + random);
});





// Assuming you have connected to MongoDB and created an instance of the 'test' model

// async function findDocumentById(id) {
//   let validObjectId =new mongoose.Types.ObjectId(id);

//   test.findById(validObjectId, (err, doc) => {
//     if (err) {
//         console.error('Error finding document:', err.message);
//     } else if (!doc) {
//         console.log('Document not found.');
//     } else {
//         console.log('Found document:', doc);
//     }
// });
// }












app.get('/:inpLink', async (req, res) => {
  let inpLink = req.params.inpLink
  let myurl = await test.findOne({ random: inpLink });
  // console.log(myurl)
  // findDocumentById(inpLink);
  if (myurl === null) {
    res.sendFile("./templete/error404.html", { root: __dirname })
  }
  else {
    let verifyLink = await verifyLinkValidity(myurl.link)
    res.redirect(verifyLink)
  }
})

app.use('/', (req, res) => {
  res.sendFile("./templete/error404.html", { root: __dirname })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log("Visit at :", link)
})
