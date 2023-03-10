import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { TaskList } from './components/TaskList'

export const API_URL = process.env.REACT_APP_API_URL

function App () {
  return (
    <div className='container app'>
      <h1>Sparx27 Tasks Manager</h1>
      <TaskList />
      <ToastContainer autoClose={1300} />
    </div>
  )
}

export default App
