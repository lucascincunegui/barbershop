// src/components/AgendamentoItem.js
import React from "react";

const AgendamentoItem = ({ item, atualizarStatus }) => {
  const formattedDate = new Date(item.data).toLocaleDateString("pt-BR");
  const formattedTime = item.hora.slice(0, 5);

  return (
    <tr key={item.id} className="border-b hover:bg-gray-100">
      <td className="p-3">{item.nome}</td>
      <td className="p-3">{item.email}</td>
      <td className="p-3">{item.telefone}</td>
      <td className="p-3">{formattedDate}</td>
      <td className="p-3">{formattedTime}</td>
      <td className="p-3">{item.status}</td>
      <td className="p-3 flex gap-2">
        {item.status === "em_espera" && (
          <>
            <button
              onClick={() => atualizarStatus(item.id, "atendido")}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Marcar como Atendido
            </button>
            <button
              onClick={() => atualizarStatus(item.id, "cancelado")}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Marcar como Cancelado
            </button>
          </>
        )}
        {item.status === "atendido" && (
          <span className="text-green-500">Atendido</span>
        )}
        {item.status === "cancelado" && (
          <span className="text-red-500">Cancelado</span>
        )}
      </td>
    </tr>
  );
};

export default AgendamentoItem;
