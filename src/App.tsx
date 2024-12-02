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
  
    setDespesas([...despesas, { nome, valor }]);
    setNome("");
    setValor(0);
    setTotal(total + Number(valor));
  }

  function deletaTarefa(indexDeletar: number): void {
    const nextDespesas = despesas.filter((_, index) => index !== indexDeletar);
    setDespesas(nextDespesas);
  }

  return (
    <div>
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
        value={valor}
        onChange={(e) => setValor(Number(e.target.value))}
      />
      <button onClick={adicionaDespesa}>Adicionar</button>

      <ul>
        {despesas.map((despesa, index) => (
          <li key={index}>
            {despesa.nome} - R$ {despesa.valor.toFixed(2)}{" "}
            <button onClick={() => deletaTarefa(index)}>Deletar</button>
          </li>
        ))}
      </ul>
      <p>Valor total: R$ {total.toFixed(2)}</p>
    </div>
  );
}

export default App;