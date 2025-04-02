import { useEffect, useState } from "react";
import Pagination from "../components/Paginations";
import AgendamentoItem from "../components/AgendamentoItem";

const Admin = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1); // Página atual
  const [itensPorPagina, setItensPorPagina] = useState(10); // Itens por página (10, 15 ou 20)

  const indexOfLastItem = paginaAtual * itensPorPagina;
  const indexOfFirstItem = indexOfLastItem - itensPorPagina;

  const currentAgendamentos = agendamentos.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Função para mudar a página
  const handlePageChange = (pageNumber) => {
    setPaginaAtual(pageNumber);
  };
  useEffect(() => {
    fetch("http://localhost:3001/agendamentos")
      .then((response) => response.json())
      .then((data) => setAgendamentos(data))
      .catch((error) => console.error("Erro ao buscar agendamentos:", error));
  }, []);

  const atualizarStatus = (id, novoStatus) => {
    fetch(`http://localhost:3001/atualizar-status/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: novoStatus }), // Envia o novo status
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro no servidor: ${response.statusText}`);
        }
        return response.json(); // Parse da resposta JSON
      })
      .then((data) => {
        console.log("Resposta do servidor:", data);
        if (data.message === "Status atualizado com sucesso!") {
          setAgendamentos((prevAgendamentos) =>
            prevAgendamentos.map((agendamento) =>
              agendamento.id === id
                ? { ...agendamento, status: novoStatus }
                : agendamento
            )
          );
        }
      })
      .catch((error) => {
        console.error("Erro ao atualizar status:", error);
      });
  };
  console.log(agendamentos.length);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Agendamentos</h2>

        {agendamentos.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="p-3 text-left">Nome</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Telefone</th>
                  <th className="p-3 text-left">Data</th>
                  <th className="p-3 text-left">Hora</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Ações</th>
                </tr>
              </thead>

              <tbody>
                {currentAgendamentos.map((item) => (
                  <AgendamentoItem
                    key={item.id}
                    item={item}
                    atualizarStatus={atualizarStatus}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 text-center mt-4">
            Nenhum agendamento encontrado
          </p>
        )}

        <Pagination
          paginaAtual={paginaAtual}
          totalItens={agendamentos.length}
          itensPorPagina={itensPorPagina}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Admin;
