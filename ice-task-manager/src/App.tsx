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

  const confirmedTasks = tasks.filter(
    (task) => typeof task.iceScore === "number",
  );
  const pendingReviewTasks = tasks.filter(
    (task) => task.status === "ready" && Boolean(task.suggestion),
  );
  const failedTasks = tasks.filter((task) => task.status === "error");

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
          Crea tareas, pide una sugerencia ICE a Gemini, revísala antes de
          aplicarla y mantén la lista priorizada con edición manual en tiempo
          real.
        </p>
      </header>

      <main className="content-grid">
        <section className="panel panel-accent">
          <h2>Resumen de priorización</h2>
          <div className="summary-grid">
            <div className="summary-item">
              <strong>{tasks.length}</strong>
              <span>Tareas en sesión</span>
            </div>
            <div className="summary-item">
              <strong>{confirmedTasks.length}</strong>
              <span>Con ICE confirmado</span>
            </div>
            <div className="summary-item">
              <strong>{pendingReviewTasks.length}</strong>
              <span>Pendientes de revisión</span>
            </div>
            <div className="summary-item">
              <strong>{failedTasks.length}</strong>
              <span>Con error</span>
            </div>
          </div>
          <p className="panel-copy summary-copy">
            La lista muestra primero las tareas con score confirmado y reacciona
            al instante cuando cambian los valores ICE.
          </p>
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
          <p className="panel-copy">
            Selecciona una tarea para revisarla. Si confirmas una sugerencia o
            ajustas sus campos manualmente, la prioridad se recalcula y la lista
            se reordena automáticamente.
          </p>
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
