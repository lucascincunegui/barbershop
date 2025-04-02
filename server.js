const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const port = 3001;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Meolvide!20",
  database: "barbearia",
});

const handleDBConnection = () => {
  db.connect((err) => {
    if (err) {
      console.error("Erro ao conectar ao banco de dados:", err);
      setTimeout(handleDBConnection, 2000); // tenta conectar novamente
    } else {
      console.log("Conectado ao banco de dados MySQL");
    }
  });
};

// Chama a função para conectar ao banco
handleDBConnection();

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  } else {
    console.log("Conectado ao banco de dados MySQL");
  }
});

// Habilitando CORS
app.use(cors());

// Middleware para parsear o corpo das requisições
app.use(express.json());

// Rota para pegar os horários disponíveis
app.get("/horarios-disponiveis", (req, res) => {
  const sql = "SELECT data, hora FROM agendamentos";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar horários:", err);
      res.status(500).json({ message: "Erro ao buscar horários" });
    } else {
      const agendados = results.map((row) => `${row.data} ${row.hora}`);
      res.json(agendados);
    }
  });
});

// Rota para agendar
app.post("/agendar", (req, res) => {
  const { nome, email, telefone, data, hora } = req.body;
  const sql =
    "INSERT INTO agendamentos (nome, email, telefone, data, hora) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [nome, email, telefone, data, hora], (err, results) => {
    if (err) {
      console.error("Erro ao agendar:", err);
      res.status(500).json({ message: "Erro ao agendar" });
    } else {
      res.json({ message: "Agendamento realizado com sucesso!" });
    }
  });
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Rota para listar todos os agendamentos
app.get("/agendamentos", (req, res) => {
  const sql = "SELECT * FROM agendamentos ORDER BY data, hora";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar agendamentos:", err);
      res.status(500).json({ message: "Erro ao buscar agendamentos" });
    } else {
      res.json(results); // Retorna os agendamentos em formato JSON
    }
  });
});

// Rota para atualizar o status de um agendamento
app.put("/atualizar-status/:id", (req, res) => {
  const { id } = req.params; // Obtém o id do agendamento
  const { status } = req.body; // Obtém o novo status do corpo da requisição

  // Lógica para atualizar o status no banco de dados
  const sql = "UPDATE agendamentos SET status = ? WHERE id = ?";
  db.query(sql, [status, id], (err, results) => {
    if (err) {
      console.error("Erro ao atualizar status:", err);
      return res.status(500).json({ message: "Erro ao atualizar status" }); // Retorna erro e encerra a execução
    }

    // Verifica se o agendamento foi atualizado com sucesso
    if (results.affectedRows > 0) {
      return res.json({ message: "Status atualizado com sucesso!" }); // Retorna sucesso e encerra a execução
    } else {
      return res.status(404).json({ message: "Agendamento não encontrado" }); // Retorna erro caso o agendamento não exista
    }
  });
});

// // Rota para listar todos os agendamentos
// app.get("/agendamentos", (req, res) => {
//   const sql = "SELECT * FROM agendamentos ORDER BY data, hora";

//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error("Erro ao buscar agendamentos:", err);
//       res.status(500).json({ message: "Erro ao buscar agendamentos" });
//     } else {
//       res.json(results);
//     }
//   });
// });

// // Rota para listar horários disponíveis
// app.get("/horarios-disponiveis", (req, res) => {
//   const sql = "SELECT data, hora FROM agendamentos";

//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error("Erro ao buscar horários:", err);
//       res.status(500).json({ message: "Erro ao buscar horários" });
//     } else {
//       const agendados = results.map((row) => `${row.data} ${row.hora}`);
//       res.json(agendados);
//     }
//   });
// });
