import './App.css'

const taskOneChecklist = [
  'Proyecto React con TypeScript inicializado',
  'Estructura de carpetas preparada para dominio, UI y servicios',
  'Contrato Task definido para el flujo del MVP',
  'Utilidades puras de cálculo y ordenación listas',
]

function App() {
  return (
    <div className="app-shell">
      <header className="hero-section">
        <span className="badge">MVP ICE · React</span>
        <h1>Gestor de tareas inteligente con ICE</h1>
        <p className="lead">
          Base técnica del proyecto preparada para seguir con el formulario, la lista de tareas y
          la integración con IA en las siguientes iteraciones.
        </p>
      </header>

      <main className="content-grid">
        <section className="panel panel-accent">
          <h2>Estado actual</h2>
          <p>
            Esta pantalla deja el esqueleto visual inicial del producto y confirma que la base
            técnica ya está lista para crecer sin mezclar responsabilidades.
          </p>
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
