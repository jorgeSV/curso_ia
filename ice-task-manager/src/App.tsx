import "./App.css";
import PriorityModal from "./components/PriorityModal/PriorityModal";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import { useTasks } from "./hooks/useTasks";

const taskOneChecklist = [
  "Proyecto React con TypeScript inicializado",
  "Estructura de carpetas preparada para dominio, UI y servicios",
  "Contrato Task definido para el flujo del MVP",
  "Utilidades puras de cálculo y ordenación listas",
];

function App() {
  const {
    closePriorityModal,
    confirmTaskSuggestion,
    createTask,
    isPriorityModalOpen,
    openPriorityModal,
    requestTaskIceSuggestion,
    selectTask,
    selectedTask,
    selectedTaskId,
    sortedTasks,
    tasks,
    updateTaskIceValues,
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
          <TaskList
            tasks={sortedTasks}
            selectedTaskId={selectedTaskId}
            onSelectTask={selectTask}
            onCalculateTaskIce={requestTaskIceSuggestion}
            onReviewTaskSuggestion={openPriorityModal}
            onUpdateTaskIceValues={(taskId, values) => {
              updateTaskIceValues({ taskId, values });
            }}
          />
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

      <PriorityModal
        open={isPriorityModalOpen}
        task={selectedTask}
        onClose={closePriorityModal}
        onConfirm={confirmTaskSuggestion}
      />
    </div>
  );
}

export default App;
