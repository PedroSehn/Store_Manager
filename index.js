require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/sales', salesController);
app.use('/products', productController);

// middleware erro dominio
app.use((err, req, res, next) => {
  const errorMap = {
    notFound: 404,
  };

  const status = errorMap[err.code];

  if (!status) {
    return next(err);
  }

  res.status(status)
  .json(err);
});

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
