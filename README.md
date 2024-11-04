# 💸 MyWallet - Sistema de Gerenciamento Financeiro

Os usuários podem registrar suas entradas e saídas financeiras, permitindo um maior controle sobre suas finanças.

---

## 📜 Descrição do Projeto

Este é o back-end do **MyWallet**, desenvolvido em Node.js com Express e MongoDB. O projeto possibilita o cadastro de usuários, autenticação com JWT e operações de adição, edição, listagem e exclusão de transações financeiras (entradas e saídas).

---

## 📌 Funcionalidades

- **Cadastro de Usuários** (`POST /auth/sign-up`)
- **Autenticação de Usuários** (`POST /auth/sign-in`)
- **Adição de Transações** (`POST /transactions`) - Transações de entrada (deposit) e saída (withdraw).
- **Listagem de Transações** (`GET /transactions`) - Lista todas as transações do usuário com paginação.
- **Edição de Transações** (`PUT /transactions/:id`) - Permite ao usuário editar suas transações financeiras.
- **Remoção de Transações** (`DELETE /transactions/:id`) - Permite ao usuário deletar suas transações.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** com **Express**
- **MongoDB** com **MongoAtlas**
- **JWT** para autenticação
- **Render** para deploy do servidor
- **Joi** para validação de dados
- **dotenv** para gerenciamento de variáveis de ambiente

---

## 📂 Estrutura do Projeto

A arquitetura do projeto foi organizada em:

- **Controllers**: Gerencia a lógica de cada operação do sistema.
- **Routers**: Define as rotas da aplicação.
- **Middlewares**: Inclui autenticação JWT e validações.
- **Schemas**: Valida os dados de entrada usando o Joi.

---

## 📑 Endpoints da API

### Autenticação

| Método | Endpoint     | Descrição                          |
|--------|--------------|------------------------------------|
| POST   | /auth/sign-up | Cadastra um novo usuário.         |
| POST   | /auth/sign-in | Autentica um usuário.             |

### Transações (Requer Token JWT)

| Método  | Endpoint             | Descrição                                  |
|---------|-----------------------|--------------------------------------------|
| POST    | /transactions         | Adiciona uma nova transação.               |
| GET     | /transactions         | Lista as transações com paginação.         |
| PUT     | /transactions/:id     | Edita uma transação existente do usuário.  |
| DELETE  | /transactions/:id     | Remove uma transação do usuário.           |

---

## 📜 Validações

As validações são aplicadas em todos os endpoints para garantir a integridade dos dados:

- **JWT**: Verifica se o token está presente e válido.
- **Campos Obrigatórios**: `value`, `description` e `type`.
- **Tipos de Transações**: Aceita apenas `deposit` e `withdraw`.
- **Valor da Transação**: Deve ser um número positivo.
- **ID de Transação**: Valida se o ID fornecido é válido e pertence ao usuário autenticado.

---

## 🌐 Deploy

Você pode acessar o back-end em produção no seguinte link:

- **[API MyWallet - Link do Deploy](https://my-wallet-6mc6.onrender.com)**

---
