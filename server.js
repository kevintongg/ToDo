const express = require('express');
const path = require('path');
const mongojs = require('mongojs');
const bodyParser = require('body-parser');

const db = mongojs('todolist', ['todolist']);
const app = express();

const fullPath = path.join(__dirname, '/public');

app.use(express.static(fullPath));
app.use(bodyParser.json());

app.get('/todolist/', (request, response) => {
  console.log('Received a GET request!');
  db.todolist.find((err, docs) => {
    console.log(docs);
    if (err) {
      response.send(err);
    }
    response.json(docs);
  });
});

app.post('/todolist/', (request, response) => {
  console.log(request.body);
  db.todolist.save({
    title: request.body.title,
    text: request.body.text,
    due: request.body.due,
    status: 'Incomplete',
  }, (err, docs) => {
    response.json(docs);
  });
});

app.delete('/todolist/:id', (request, response) => {
  const id = request.params.id;
  console.log(id);
  db.todolist.remove(
    {
      _id: mongojs.ObjectId(id),
    },
    (err, docs) => {
      response.json(docs);
    });
});

app.get('/todolist/:id', (request, response) => {
  const id = request.params.id;
  db.todolist.findOne(
    {
      _id: mongojs.ObjectId(id),
    },
    (err, doc) => {
      response.json(doc);
    });
});

app.put('/todolist/:id', (request, response) => {
  const id = request.params.id;
  console.log(id);
  db.todolist.findAndModify(
    {
      query: {
        _id: mongojs.ObjectId(id),
      },
      update: {
        $set: {
          title: request.body.title,
          text: request.body.text,
          due: request.body.due,
          status: request.body.status,
        },
      },
      new: true,
    },
    (err, doc) => {
      response.json(doc);
    });
});

app.post('/todolist/:status', (request, response) => {
  db.todolist.update(
    {
      status: 'Uncomplete',
    },
    {
      $set: {
        status: 'Complete',
      },
    },
    (err, doc) => {
      response.json(doc);
    });
});

app.listen(3000);
console.log('Server running on port 3000');
