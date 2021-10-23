const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;


const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// user: nobisamid
// password: otUx0ZSutfYKgSYI



const uri = "mongodb+srv://nobisamid:otUx0ZSutfYKgSYI@cluster0.rnpiz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db("FleshDrill");
      const usersCollection = database.collection("users");

      // create a document to insert
    //   const doc = {
    //     name: "Babul bhai",
    //     email: "babul@gmail.com",
    //   }
    //   const result = await usersCollection.insertOne(doc);
    //   console.log(`A document was inserted with the _id: ${result.insertedId}`);

    //Get API
      app.get('/users', async (req, res) =>{
          const cursor = usersCollection.find({});
          const users = await cursor.toArray();
          res.send(users);
      })

    // update users
      app.get('/users/:id', async (req, res) =>{
          const id = req.params.id;
          const query = { _id: ObjectId(id) };
          const user = await usersCollection.findOne(query);
          console.log('load user with id:', id);
          res.send(user);
      })


    // post API
    app.post('/users', async(req, res)=>{
        const newUsesr = req.body;
        const result = await usersCollection.insertOne(newUsesr);

        console.log('got new user from line 30', req.body);
        console.log('added user', result);
        res.json(result);
    })

    // Delete Api
    app.delete('/users/:id', async(req, res) =>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        result = await usersCollection.deleteOne(query);
        console.log('deleting user with id or result ', result);
        res.json(result);
    })


    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);

// client.connect(err => {
//   const collection = client.db("fleshDril").collection("users");
//   // perform actions on the collection object
//   console.log('hitting the database from line 16');
// //   console.error(err);
// const user = { name:'Abul', email:'abul@gmail.com', phone:'4323432'};
// collection.insertOne(user)
//     .then(()=>{
//         console.log('insert success');
//     })

// //   client.close();
// });


app.get('/', (req, res)=>{
    res.send('Running my CRUD server');
});

app.listen(port, ()=>{
    console.log("Running server on port", port);
})