import './App.css'
import { useTasks } from './hooks/useTasks'

const taskOneChecklist = [
  'Proyecto React con TypeScript inicializado',
  'Estructura de carpetas preparada para dominio, UI y servicios',
  'Contrato Task definido para el flujo del MVP',
  'Utilidades puras de cálculo y ordenación listas',
]

const taskTwoChecklist = [
  'Estado de tareas centralizado en useTasks',
  'Selección de tarea aislada del componente App',
  'Ordenación derivada desde el hook antes del render',
  'API preparada para formulario, lista y modal',
]

function App() {
  const { isPriorityModalOpen, selectedTaskId, sortedTasks, tasks } = useTasks()

  return (
    <div className="app-shell">
      <header className="hero-section">
        <span className="badge">MVP ICE · React</span>
        <h1>Gestor de tareas inteligente con ICE</h1>
        <p className="lead">
          La base técnica ya incluye un hook central para coordinar estado, selección y ordenación
          de tareas antes de conectar el formulario y la lista del MVP.
        </p>
      </header>

      <main className="content-grid">
        <section className="panel panel-accent">
          <h2>Estado actual</h2>
          <ul className="checklist">
            <li>{`Tareas en memoria: ${tasks.length}`}</li>
            <li>{`Tareas listas para render: ${sortedTasks.length}`}</li>
            <li>{`Tarea seleccionada: ${selectedTaskId ?? 'ninguna'}`}</li>
            <li>{`Modal de prioridad: ${isPriorityModalOpen ? 'abierto' : 'cerrado'}`}</li>
          </ul>
        </section>

        <section className="panel">
          <h2>Alcance de la Tarea 1</h2>
          <ul className="checklist">
            {taskOneChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="panel">
          <h2>Alcance de la Tarea 2</h2>
          <ul className="checklist">
            {taskTwoChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="panel">
          <h2>Siguientes bloques del MVP</h2>
          <div className="next-steps">
            <span>Formulario de alta</span>
            <span>Lista de tareas</span>
            <span>Cálculo ICE</span>
            <span>Revisión con IA</span>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
