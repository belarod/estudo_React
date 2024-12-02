import { useState } from "react";

type Despesa = {
  nome: string,
  valor: number
}

export function App() {
  const [despesas, setDespesas] = useState([] as Despesa[]);
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState(0);
  const [total, setTotal] = useState(0);

  function adicionaDespesa() {
    if (nome.length < 2 || nome.length > 16) {
      alert("O nome da despesa deve ter entre 2 e 16 caracteres.");
      return;
    }
    if(valor <= 0) {
      alert("O valor da despesa deve ser maior que zero.");
      return;
    }

    const despesaExistente = despesas.find((despesa) => despesa.nome === nome);
    if (despesaExistente) {
      const despesasAtualizadas = despesas.map((despesa) => {
      if (despesa.nome === nome) {
        return { ...despesa, valor: despesa.valor + valor };
      }
      return despesa;
      });
      setDespesas(despesasAtualizadas);
      setNome("");
      setValor(0);
      setTotal(total + Number(valor));
      return;
    }
  
    setDespesas([...despesas, { nome, valor }]);
    setNome("");
    setValor(0);
    setTotal(total + Number(valor));
  }

  function deletaTarefa(indexDeletar: number, valor: number): void {
    const nextDespesas = despesas.filter((_, index) => index !== indexDeletar);
    setDespesas(nextDespesas);
    setTotal(total - Number(valor));
  }

  function formatarValor(valor: number): string {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
  }
  

  return (
    <div>
      <style>
        {`
          table {
            border-collapse: collapse;
            width: 80%;
            font-family: Arial, sans-serif;
          }

          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }

          th {
            background-color: #f2f2f2;
            font-weight: bold;
          }

          tr:hover {
            background-color: #f1f1f1;
          }
        `}
      </style>
      <h1>Gerenciador de Despesas</h1>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="number"
        placeholder="Valor"
        value={valor === 0 ? "" : valor}
        onChange={(e) => setValor(Number(e.target.value))}
      />
      <button onClick={adicionaDespesa}>Adicionar</button>

      <table>
        <thead>
          <tr>
            <th>Despesa</th>
            <th>Valor</th>
            <th>Botão</th>
          </tr>
        </thead>
        
        <tbody>
          {despesas.map((despesa, index) => (
            <tr key={index}>
              <td>{despesa.nome}</td>
              <td>{formatarValor(despesa.valor)}</td>
                <td><button onClick={() => deletaTarefa(index, despesa.valor)}>Deletar</button></td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <th>Total</th>
            <th>{formatarValor(total)}</th>
          </tr>
        </tfoot>
      </table>
      
    </div>
  );
}

export default App;