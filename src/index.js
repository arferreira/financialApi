const express = require("express");
const { v4: uuidV4 } = require("uuid");

const app = express();
app.use(express.json());
const customers = [];

// Middleware

function verifyExistAccountCpf(request, response, next) {
  const { cpf } = request.headers;
  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer)
    return response.status(404).json({ error: "Customer not found!" });

  request.customer = customer;

  return next();
}

// function
function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === "credit") {
      return acc + operation.amout;
    } else {
      return -operation.amount;
    }
  }, 0);
  return balance;
}

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

// Endpoint get statement of customer
app.get("/statement", verifyExistAccountCpf, (request, response) => {
  const { customer } = request;
  return response.status(200).json({
    message: customer.statement,
  });
});

// Endpoint to deposit on statement
app.post("/deposit", verifyExistAccountCpf, (request, response) => {
  const { description, amount } = request.body;
  const { customer } = request;
  const statementOperation = {
    description,
    amount,
    createdAt: Date.now(),
    type: "credit",
  };

  customer.statement.push(statementOperation);
  return response
    .status(201)
    .json({ message: "Depósito realizado com sucesso!" });
});

//Endpoint to withdraw on statement
app.post("/withdraw", verifyExistAccountCpf, (request, response) => {
  const { amount } = request.body;
  const { customer } = request;

  const balance = getBalance(customer.statement);

  if (balance < amount) {
    return response.status(400).json({ error: "Saldo insuficiente!" });
  } else {
    const statementOperation = {
      amount,
      createdAt: Date.now(),
      type: "debit",
    };
    customer.statement.push(statementOperation);
    return response
      .status(201)
      .json({ message: "Saque realizado com sucesso!" });
  }
});

// Endpoint get statement of customer by date
app.get("/statement/date", verifyExistAccountCpf, (request, response) => {
  const { date } = request.query;
  const { customer } = request;

  const dateFormat = new Date(date + " 00:00");


  const statement = customer.statement.filter(
    (statement) =>
      new Date(statement.createdAt).toDateString() === 
      new Date(dateFormat).toDateString()
  );

  

  return response.status(200).json({
    data: statement,
  });
});

// Endpoint update account customer
app.put('/account', verifyExistAccountCpf, (request, response) => {
  const { name } = request.body;
  const {customer} = request;

  customer.name = name;

  return response.status(200).json({message: 'Cliente atualizado com sucesso!'});
});

// Endpoint to get account data
app.get('/account', verifyExistAccountCpf, (request, response) => {
  const { customer } = request;

  return response.json(customer);
});

// Endpoint to delete 
app.delete('/account', verifyExistAccountCpf, (request, response) => {
  const { customer } = request;

  customers.splice(customer, 1);

  return response.status(200).json(customers);
});

app.listen(3333);
