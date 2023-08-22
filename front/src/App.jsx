import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    obtenerTareas();
  }, []);

  // const obtenerTareas = () => {
  //   fetch('http://localhost:5000/getTasks')
  //     .then(response => response.json())
  //     .then(data => setTareas(data.tasks))
  //     .catch(error => console.error(error));
  // };
  const obtenerTareas = () => {
    fetch('http://localhost:5000/getTasks')
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudieron obtener las tareas');
        }
        return response.json();
      })
      .then(data => setTareas(data.tasks))
      .catch(error => {
        console.error(error);
        setTareas([]); // Si ocurre un error, establecer tareas como vacías
      });
  };
  

  const agregarTarea = () => {
    const nuevaTarea = {
      title: titulo,
      description: descripcion
    };

    fetch('http://localhost:5000/postTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevaTarea)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        obtenerTareas(); 
        setTitulo('');
        setDescripcion('');
      })
      .catch(error => console.error(error));
  };

  const eliminarTarea = _id => {
    fetch(`http://localhost:5000/deleteTask/${_id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        obtenerTareas();
      })
      .catch(error => console.error(error));
  };

  const completarTarea = _id => {
    fetch(`http://localhost:5000/putTask/${_id}`, {
      method: 'PUT',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        obtenerTareas();
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <ul>
        {tareas.length > 0 ? (
          tareas.map(task => (
            <li key={task._id}>
              <input type="checkbox" checked={task.finished} onChange={() => completarTarea(task._id)} />
              <span style={{ textDecoration: task.finished ? 'line-through' : 'none' }}></span>
              {task.title} - {task.description}
              <button onClick={() => eliminarTarea(task._id)}>Eliminar</button>
            </li>
          ))
        ) : (
          <li>No hay tareas disponibles</li>
        )}
      </ul>

      <h2>Agregar Tarea</h2>
      <input type="text" placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} />
      <input type="text" placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
      <button onClick={agregarTarea}>Agregar</button>

    </div>
  );
}


export default App
