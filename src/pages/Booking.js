import React, { useState } from "react";

const Booking = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [horariosOcupados, setHorariosOcupados] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita recarregar a página

    // Definir corretamente o objeto `agendamento`
    const agendamento = {
      nome,
      email,
      telefone,
      data,
      hora,
    };

    console.log("Enviando agendamento:", agendamento); // Debug para ver se os dados estão corretos

    fetch("http://localhost:3001/agendar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(agendamento),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message);
        // Limpar os campos após o envio
        setNome("");
        setEmail("");
        setTelefone("");
        setData("");
        setHora("");
      })
      .catch((error) => console.error("Erro ao agendar:", error));
  };

  // Função para aplicar a máscara
  const mascaraTelefone = (value) => {
    // Remove tudo o que não for número
    let valor = value.replace(/\D/g, "");

    // Aplica a máscara (XX) XXXXX-XXXX
    if (valor.length <= 2) {
      valor = `(${valor}`;
    } else if (valor.length <= 6) {
      valor = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
    } else {
      valor = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(
        7,
        11
      )}`;
    }

    return valor;
  };

  // Função de onChange para atualizar o valor do telefone
  const handleTelefoneChange = (e) => {
    const value = e.target.value;
    setTelefone(mascaraTelefone(value));
  };

  // Definindo a data mínima para ser o dia de hoje
  const today = new Date();
  const minDate = today.toISOString().split("T")[0]; // Apenas a parte da data no formato YYYY-MM-DD

  return (
    <div className="agendar-cita">
      <h2>Agendar Cita</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu Nome"
          required
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu Email"
          required
        />
        <input
          type="tel"
          name="telefone"
          value={telefone}
          onChange={handleTelefoneChange}
          placeholder="(00) 00000-0000"
          required
        />
        <input
          type="date"
          name="data"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
          min={minDate} // Impede a seleção de datas anteriores a hoje
        />
        <input
          type="time"
          name="hora"
          value={hora}
          onChange={(e) => {
            const horarioEscolhido = `${data} ${e.target.value}`;
            if (horariosOcupados.includes(horarioEscolhido)) {
              alert("Este horário já está reservado! Escolha outro.");
            } else {
              setHora(e.target.value);
            }
          }}
          required
          min="08:00" // Limita o horário mínimo para 08:00
          max="20:00" // Limita o horário máximo para 20:00
        />
        <button type="submit">Confirmar Agendamento</button>
      </form>
    </div>
  );
};

export default Booking;
