import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';

const PORT = 'http://localhost:3000/Todos'

function App() {
  const [data, setData] = useState(0)
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    axios.get(PORT).then((response) => {
      setData(response.data)
    }).catch(error => console.error(error))
  }, [data])

  const addTodo = () => {
    axios.post('http://localhost:3000/Todos', { tache: newTask, etat: "En cours" }).then((response) => {
      setTasks(previous => [...previous, response.data])
    }).catch((error) => {
      console.error(error)
    })

    setNewTask('')
  }

  const deleteTodo = () => {
    const todoDelete = data.find(todo => todo.etat === 'Fait');
  
    if (todoDelete) {
      axios.delete(`http://localhost:3000/Todos/${todoDelete.id}`)
        .then(() => console.log(`Tâche avec l'id ${todoDelete.id} a été supprimée avec succès`))
        .catch((error) => {
          console.error(error);
        });
    }
  }

  const updateTodo = () => {
    const todoUpdate = data.find(todo => todo.etat === 'En cours');
  
    if (todoUpdate && todoUpdate.id) {
      const tache = 'Créer une todolist';
  
      axios.put(`http://localhost:3000/TodoS/${todoUpdate.id}`, { tache: tache, etat: 'Fait' })
        .then(() => console.log(`Tâche avec l'id ${todoUpdate.id} a été modifiée avec succès`))
        .catch(error => console.error(error));
    } else {
      console.log('Aucune tâche avec l\'état "En cours" trouvée.');
    }
  };

  return (
    <>
      <h1 className='fw-light mb-5'>To Do List</h1>
      <div className='d-flex justify-content-center flex-column my-5'>

      <label>Nouvelle Tâche: </label>
      <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value.toUpperCase())} className='rounded my-2'/>
      
      <button onClick={addTodo} className='btn btn-success'>Ajouter une tâche</button>
      </div>
      {
        data && (
          <ul >
            {
              data.map((todo) => (
                <>
                  <li key={todo.id}>{todo.title}</li>
                  <p>Etat : {todo.etat}</p>
                </>
              ))
            }
          </ul>
        )
      }
      <button onClick={updateTodo} className='btn btn-warning mx-2'>Modifier une tâche</button>
      
      <button onClick={deleteTodo} className='btn btn-danger ml-2'>Supprimer une tâche</button>
    </>
  )
}

export default App