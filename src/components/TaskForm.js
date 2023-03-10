
export const TaskForm = ({ name, handleInputChange, createTask, isEditing, updateTaskName }) => {
  return (
    <form className='task-form' onSubmit={!isEditing ? createTask : updateTaskName}>
      <input
        type='text'
        placeholder='Add task'
        name='name'
        value={name}
        onChange={handleInputChange}
      />
      <button>{!isEditing ? 'Add' : 'Edit'}</button>
    </form>
  )
}
