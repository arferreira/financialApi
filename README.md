# Financial API


### Instalacao

-> Instalar nodeJS
-> Rodar yarn install
-> Rodar yarn dev




### Configs

Crie os endpoints no Postman ou insomia passando sempre no header params o cpf do cliente a ser criado,
exceto no endpoint de criacao de conta.




### Requisitos

[x] - Deve ser possível criar uma conta
[x] - Deve ser possível buscar o extrato bancário do cliente
[x] - Deve ser possível realizar um depósito
[x] - Deve ser possível realizar um saque
[x] - Deve ser possível buscar o extrato bancário do cliente por data
[x] - Deve ser possível atualizar dados da conta do cliente
[x] - Deve ser possível obter dados da conta do cliente
[x] - Deve ser possível deletar uma conta


### Regras de negócio

[x] - Não deve ser possivel cadastrar uma conta com cpf já existente
[x] - Não deve ser possivel fazer deposito em uma conta não existente
[x] - Não deve ser possível buscar extrato em uma conta não existente
[x] - Não deve ser possivel fazer saque em uma conta não existente
[x] - Não deve ser possível excluir uma conta não existente
[x] - Não deve ser possivel saque quando o saldo for insuficiente