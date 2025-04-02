// src/components/Pagination.js
import React from "react";

const Pagination = ({
  paginaAtual,
  totalItens,
  itensPorPagina,
  onPageChange,
}) => {
  const totalPaginas = Math.ceil(totalItens / itensPorPagina);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPaginas) {
      onPageChange(pageNumber);
    }
  };

  return (
    <div className="flex justify-center mt-4 gap-2">
      <button
        onClick={() => handlePageChange(paginaAtual - 1)}
        disabled={paginaAtual === 1}
        className="px-3 py-1 bg-gray-300 text-black rounded-md hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
      >
        Anterior
      </button>

      {/* Botões de página */}
      {[...Array(totalPaginas).keys()].map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber + 1)}
          className={`px-3 py-1 text-sm ${
            paginaAtual === pageNumber + 1
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          } rounded-md hover:bg-blue-400`}
        >
          {pageNumber + 1}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(paginaAtual + 1)}
        disabled={paginaAtual === totalPaginas}
        className="px-3 py-1 bg-gray-300 text-black rounded-md hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
      >
        Próximo
      </button>
    </div>
  );
};

export default Pagination;
