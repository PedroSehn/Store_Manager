require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const joi = require('joi');
const productController = require('./controllers/productController');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productController);

app.get('/products', (req, res) => {
  const result = productController.getAll();
  res.status(200).json(result);
});

// midlewere de erro JOI
app.use((err, req, res, next) => {
    if (!joi.isError(err)) {
      return next(err);
    }

    res
      .status(422)
      .json({ code: 'unprocessable_entity', message: err.message });
});

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

// middlewere erros gerais
app.use((err, req, res, _next) => {
  console.error(err);
  res.status(500).json({ code: 'internal_server_error', message: 'error processing request' });
});

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});