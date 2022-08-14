const express = require('express');
const routerApi = require('./routes/index');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//New route
app.get('/nueva-ruta', (req, res) => {
  res.send("Hi, I'm a new route");
});

//Route with query params
app.get('/users', (req, res) => {
  const { limit, offset } = req.query;

  if (!limit && !offset) return res.send('Paremeters not provided');

  res.json({ limit, offset });
});

routerApi(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
