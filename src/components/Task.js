import { BsCheck2Circle } from 'react-icons/bs'
import { BiEdit } from 'react-icons/bi'
import { AiTwotoneDelete } from 'react-icons/ai'

export const Task = ({
  item, index, getSingleTask, updateTaskCompleted, deleteTask
}) => {
  return (
    <div className={!item.completed ? 'task-box' : 'task-box-completed'}>
      <div className='task-box-content'>
        <p>
          <b>{index + 1}. </b>
          {item.name}
        </p>
      </div>

      <div className='task-box-options'>
        <BsCheck2Circle color='green' onClick={() => updateTaskCompleted(item)} />
        <BiEdit color='orange' onClick={() => getSingleTask(item._id)} />
        <AiTwotoneDelete color='red' onClick={() => deleteTask(item._id)} />
      </div>
    </div>
  )
}
