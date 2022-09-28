require('dotenv').config();

const express = require('express');
const routerApi = require('./routes/index');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());

const whitelist = [`http://127.0.0.1:${port}`, 'https://myapp.co'];
const options = {
  options: (origin, callback) => {
    if (!whitelist.includes(origin)) {
      return callback(new Error('Not allowed'));
    }

    callback(null, true);
  },
};
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
