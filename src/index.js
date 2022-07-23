const express = require("express");
const { v4: uuidV4 } = require("uuid");

const app = express();
app.use(express.json());
const customers = [];

/**
 * cpf - string
 * name - string
 * id - uuid
 * statement - []
 */

// Endpoint create account
app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExist = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (!customerAlreadyExist) {
    customers.push({
      id: uuidV4(),
      cpf: cpf,
      name: name,
      statement: [],
    });

    return response.status(201).send({
      message: "Account created success!",
    });
  } else {
    return response.status(400).send({
      message: "Customer already exist!",
    });
  }
});

app.get("/statement", (request, response) => {
  const { cpf } = request.headers;
  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return response.status(404).json({
      error: "Customer not found!",
    });
  }
  return response.status(200).json({
    message: customer.statement,
  });
});

app.listen(3333);