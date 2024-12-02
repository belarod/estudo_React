import { useState } from "react";

export function App() {
  // Estado para armazenar tarefas e entrada do usuário
  const [task, setTask] = useState(''); // Tarefa em edição
  const [tasks, setTasks] = useState([]); // Lista de tarefas

  // Função para adicionar uma nova tarefa
  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      setTask(''); // Limpa o campo de entrada
    }
  };

  // Função para alternar entre tarefa concluída e não concluída
  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  };

  // Função para excluir uma tarefa
  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Lista de Tarefas</h1>
      
      {/* Campo de entrada para adicionar tarefas */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Digite uma tarefa"
          style={{ padding: '10px', width: '250px' }}
        />
        <button
          onClick={addTask}
          style={{
            padding: '10px',
            marginLeft: '10px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Adicionar
        </button>
      </div>
      
      {/* Lista de tarefas */}
      <ul style={{ padding: '0' }}>
        {tasks.map((t) => (
          <li
            key={t.id}
            style={{
              listStyle: 'none',
              marginBottom: '10px',
              textDecoration: t.completed ? 'line-through' : 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span
              onClick={() => toggleComplete(t.id)}
              style={{
                cursor: 'pointer',
                flexGrow: 1,
                textAlign: 'left',
                padding: '5px 10px',
              }}
            >
              {t.text}
            </span>
            <button
              onClick={() => deleteTask(t.id)}
              style={{
                padding: '5px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App