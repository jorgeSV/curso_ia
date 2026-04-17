import "./App.css";
import TaskForm from "./components/TaskForm/TaskForm";
import { useTasks } from "./hooks/useTasks";

const taskOneChecklist = [
  "Proyecto React con TypeScript inicializado",
  "Estructura de carpetas preparada para dominio, UI y servicios",
  "Contrato Task definido para el flujo del MVP",
  "Utilidades puras de cálculo y ordenación listas",
];

function App() {
  const {
    createTask,
    isPriorityModalOpen,
    selectedTaskId,
    sortedTasks,
    tasks,
  } = useTasks();

  const handleCreateTask = ({
    description,
    name,
  }: {
    name: string;
    description: string;
  }): boolean => {
    return Boolean(
      createTask({
        name,
        description,
      }),
    );
  };

  return (
    <div className="app-shell">
      <header className="hero-section">
        <span className="badge">MVP ICE · React</span>
        <h1>Gestor de tareas inteligente con ICE</h1>
        <p className="lead">
          La base técnica ya incluye un hook central para coordinar estado,
          selección y ordenación de tareas antes de conectar el formulario y la
          lista del MVP.
        </p>
      </header>

      <main className="content-grid">
        <section className="panel panel-accent">
          <h2>Estado actual</h2>
          <ul className="checklist">
            <li>{`Tareas en memoria: ${tasks.length}`}</li>
            <li>{`Tareas listas para render: ${sortedTasks.length}`}</li>
            <li>{`Tarea seleccionada: ${selectedTaskId ?? "ninguna"}`}</li>
            <li>{`Modal de prioridad: ${isPriorityModalOpen ? "abierto" : "cerrado"}`}</li>
          </ul>
        </section>

        <section className="panel">
          <h2>Alta de tareas</h2>
          <p className="panel-copy">
            La Tarea 3 habilita el alta con validación inline y deja la nueva
            tarea visible en la sesión actual sin persistencia.
          </p>
          <TaskForm onSubmit={handleCreateTask} />
        </section>

        <section className="panel">
          <h2>Tareas de la sesión</h2>
          {sortedTasks.length === 0 ? (
            <p className="empty-state">
              Aún no hay tareas creadas. Añade la primera usando el formulario.
            </p>
          ) : (
            <ul className="task-preview-list">
              {sortedTasks.map((task) => (
                <li key={task.id} className="task-preview-item">
                  <div className="task-preview-header">
                    <strong>{task.name}</strong>
                    <span>{task.status}</span>
                  </div>
                  <p>{task.description}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="panel">
          <h2>Base ya disponible</h2>
          <ul className="checklist">
            {taskOneChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
