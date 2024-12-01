import { useState } from "react";

export function App() {
  const [tarefas, setTarefas] = useState([] as string[]);
  const [tarefa, setTarefa] = useState("");

  function deletaTarefa(indexDeletar: number) {
    const nextTarefas = tarefas.filter(
      (tarefa, index) => indexDeletar !== index
    );
    setTarefas(nextTarefas);
  }

  function adicionarTarefa(tarefa: string) {
    setTarefas(tarefas.concat(tarefa));
    setTarefa("");
  }


  
  const tarefasList = tarefas.map((tarefa, index) => (
    <li key={index}>
      {tarefa}
      <button onClick={() => deletaTarefa(index)}>X</button>
    </li>
  ));

  return (
    <div>
      <div>
        <input
          type="text"
          value={tarefa}
          onChange={(event) => setTarefa(event.target.value)}
        />
        <button onClick={() => adicionarTarefa(tarefa)}>Add</button>
      </div>
      <ul>{tarefasList}</ul>
    </div>
  );
}

export default App