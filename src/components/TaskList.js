import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { API_URL } from '../App'
import { Task } from './Task'
import { TaskForm } from './TaskForm'

export const TaskList = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [tasks, setTasks] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    completed: false
  })
  const { name } = formData
  const [ctasks, setCtasks] = useState('')
  const [taskID, setTaskID] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  // GET TASKS
  const getTasks = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get(`${API_URL}/api/tasks`)
      setTasks(data)
      setIsLoading(false)
    } catch (err) {
      toast.error('Something went wrong, please reload the page')
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getTasks()
  }, [])

  // CREATE TASK
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const createTask = async (e) => {
    e.preventDefault()

    try {
      if (name === '') {
        return toast.error('Task can not be empty')
      }

      await axios.post(`${API_URL}/api/tasks`, formData)
      setFormData({ ...formData, name: '' })
      getTasks()
      toast.success('Task added')
    } catch (err) {
      toast.error('Something went wrong, please try again')
    }
  }

  // EDIT TASK
  const getSingleTask = async (id) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/tasks/${id}`)
      setFormData({ name: data.name, completed: false })
      setTaskID(id)
      setIsEditing(true)
    } catch (err) {
      toast.error('Something went wrong, please try again')
    }
  }

  const updateTaskName = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await axios.patch(`${API_URL}/api/tasks/${taskID}`, formData)
      setIsEditing(false)
      setFormData({ ...formData, name: '' })
      getTasks()
      toast.success('Task updated')
      setIsLoading(false)
    } catch (err) {
      toast.error('Something went wrong, please try again')
      setIsLoading(false)
    }
  }

  const updateTaskCompleted = async (task) => {
    setIsLoading(true)
    const { _id, completed } = task

    try {
      await axios.patch(`${API_URL}/api/tasks/${_id}`, { completed: !completed })
      getTasks()
      toast.success('Task updated')
      setIsLoading(false)
    } catch (err) {
      toast.error('Something went wrong, please try again')
      setIsLoading(false)
    }
  }

  // DELETE TASK
  const deleteTask = async (id) => {
    setIsLoading(true)

    try {
      await axios.delete(`${API_URL}/api/tasks/${id}`)
      getTasks()
      setIsLoading(false)
      toast.success('Task deleted')
    } catch (err) {
      toast.error('Something went wrong, please try again')
      setIsLoading(false)
    }
  }

  // COMPLETED TASKS COUNTER
  const cTasksCounter = () => {
    const completed = tasks.filter((item) => item.completed).length
    return setCtasks(completed)
  }

  useEffect(() => {
    cTasksCounter()
  }, [tasks])

  return (
    <div className='tasks-container'>
      <TaskForm
        name={name}
        handleInputChange={handleInputChange}
        createTask={createTask}
        isEditing={isEditing}
        updateTaskName={updateTaskName}
      />
      <div className='task-counter'>
        <p className='c-tasks'>Incompleted tasks: {tasks.length - ctasks}</p>
        <p className='i-tasks'>Completed tasks: {ctasks}</p>
      </div>
      {
        isLoading && <div className='loader'><img src={require('./../images/loader.gif')} alt='loader' /></div>
      }
      {
        !tasks.length > 0
          ? (
            <p style={{ textAlign: 'center', margin: '30px 0' }}>
              <i>No tasks added</i>
            </p>
            )
          : (
              tasks.map((item, index) => {
                return (
                  <Task
                    key={item._id}
                    item={item}
                    index={index}
                    getSingleTask={getSingleTask}
                    updateTaskCompleted={updateTaskCompleted}
                    deleteTask={deleteTask}
                  />
                )
              })
            )
      }
    </div>
  )
}
