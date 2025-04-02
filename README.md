# 🪒 Sistema de Agendamentos para Barbearia

Este projeto é um sistema de agendamentos para uma barbearia, desenvolvido utilizando **React.js** no frontend e **Node.js** com **Express** e **MySQL** no backend. Ele permite que clientes façam agendamentos online e que os administradores gerenciem esses agendamentos de forma eficiente.

## 📌 Funcionalidades

✅ **Clientes:**
- Escolher uma data e horário disponíveis para agendamento.
- Inserir nome, e-mail e telefone com máscara de input.
- Receber confirmação do agendamento.

✅ **Administração:**
- Visualizar agendamentos em uma interface organizada.
- Filtrar agendamentos por status (em espera, atendido, cancelado).
- Atualizar status do agendamento (Atendido ou Cancelado).
- Paginação para melhor visualização dos registros.

✅ **Geral:**
- Estilização moderna utilizando Tailwind CSS.
- Banco de dados MySQL para armazenar os agendamentos.
- API REST para comunicação entre frontend e backend.

## 🚀 Como rodar o projeto

### 🖥️ Backend (Node.js + Express + MySQL)

1. Instale as dependências:
   ```sh
   cd backend
   npm install
   ```

2. Configure o banco de dados MySQL e altere as credenciais no arquivo `.env`:
   ```env
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=barbearia
   ```

3. Inicie o servidor:
   ```sh
   npm start
   ```

### 💻 Frontend (React.js + Tailwind CSS)

1. Instale as dependências:
   ```sh
   cd frontend
   npm install
   ```

2. Inicie o projeto:
   ```sh
   npm run dev
   ```

3. Acesse no navegador:
   ```
http://localhost:5173
```

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Banco de Dados:** MySQL

## 📌 Melhorias Futuras
- Implementação de autenticação para administradores.
- Notificações por e-mail para clientes.
- Dashboard com gráficos sobre agendamentos.

## 📄 Licença
Este projeto é de código aberto e pode ser modificado conforme necessário.

---
📩 **Contato:** Se tiver dúvidas ou sugestões, sinta-se à vontade para abrir uma *issue* ou enviar uma *pull request*!
