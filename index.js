const express = require('express');
const {Firestore} = require('@google-cloud/firestore');

const db = new Firestore();
const app = express();
app.use = express(express.json());
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`BarkBark Rest API listening on port ${port}`);
});

app.get('/', async (req, res) => {
    res.json({status: 'Bark bark! Ready to roll.'});
});

app.get('/:breed', async (req, res) => {
    const breed = req.params.breed;
    const query = db.collection('dogs').where('name', '==', breed);
    const querySnaphost = await query.get();
    if (querySnaphost.size > 0) {
        res.json(querySnaphost.docs[0].data());
    } else {
        res.json({status: 'Not found! no banco'});
    }
});

app.post('/', async (req, res) => {
    const data = {
        name: req.body.name,
        origin: req.body.origin,
        lifeExpectancy: req.body.lifeExpectancy,
        type: req.body.type
    };
    await db.collection('dogs').doc().set(data);
    res.json({status: 'success', data: {dog: data}});
});

app.get('/test', async (req, res) => {
    // Obtain a document reference.
    const document = db.doc('posts/intro-to-firestore');

    // Enter new data into the document.
    await document.set({
        title: 'Welcome to Firestore',
        body: 'Hello World',
    });
    console.log('Entered new data into the document');

    // Update an existing document.
    await document.update({
        body: 'My first Firestore app',
    });
    console.log('Updated an existing document');

    // Read the document.
    const doc = await document.get();
    console.log('Read the document');

    // Delete the document.
    await document.delete();
    console.log('Deleted the document');
});
