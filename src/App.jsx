import { useState, useEffect } from 'react'
import React from 'react'
import { LuSailboat } from 'react-icons/lu';
import { MdOutlineEdit, MdOutlineDelete, MdOutlineAdd } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinish, setShowFinish] = useState(true)


  useEffect(() => {
    if (localStorage.getItem("todos")) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const SaveTOLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const handleChange = (e) => {
    setTodo(e.target.value)

  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    SaveTOLS()
  }

  const handleEdit = (id) => {
    setTodo(todos.filter(item => {
      return item.id === id
    })[0].todo)

    const index = todos.findIndex(item => {
      return item.id === id
    })
    let newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
    SaveTOLS()
  }

  const handleDelete = (id) => {
    if (confirm("Are you sure about that?")) {

      const index = todos.findIndex(item => {
        return item.id === id
      })
      let newTodos = [...todos]
      newTodos.splice(index, 1)
      setTodos(newTodos)
      SaveTOLS()
    }
  }

  const handleThrough = (event) => {
    const id = event.target.name
    const index = todos.findIndex(item => {
      return item.id === id
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    SaveTOLS()
  }

  const handleFinished = () => {
    setShowFinish(!showFinish)
  }





  return (
    <>
      <div className="container min-h-[80vh] bg-green-100 mx-auto rounded-2xl my-4 md:w-2/5 w-10/12">
        <div className="flex flex-col items-center ">
          <h1 className='font-bold md:text-3xl my-5 text-2xl text-center'>Manage your tasks to work productively</h1>
          <div className="addtask w-full px-5 space-y-2">
            <span className='font-bold text-xl'>Add a Task</span>
            <div className="text flex h-6 gap-2">
              <input id='task' className='w-11/12 rounded-full outline-indigo-100 px-2 h-8' type="text" value={todo} onChange={handleChange} /><button onClick={handleAdd} disabled={todo.length <= 0} className='bg-amber-200 disabled:cursor-not-allowed disabled:hover:bg-blue-300 hover:bg-amber-400 p-3 py-4 rounded-2xl text-gray-600 flex items-center font-bold'><MdOutlineAdd /></button>
            </div>
            <div className='flex items-center gap-2'>
              <input onChange={handleFinished} checked={showFinish} className='my-4' type="checkbox" name="show_finisehed" id="" /><span className='text-gray-600'>Show Finished</span>
            </div>
          </div>
          <div className="separation w-10/12 border-gray-400 border"></div>
        </div>

        <div className="todos space-y-4">
          <h1 className='font-bold text-2xl p-4'>Your Todos</h1>
          {todos.length == 0 && <div className='mt-5 mx-5'>Looks like all the work's done!</div>}
          {todos.map(item => {
            if (!showFinish && item.isCompleted) {
              return
            }

            return <div key={item.id} className="todo flex justify-around items-center">
              <div className="task flex items-center gap-1">
                <input onChange={handleThrough} checked={item.isCompleted} type="checkbox" name={item.id} id="" /><span className={!item.isCompleted ? 'w-[24vw] block' : 'w-[24vw] block line-through'}>{item.todo}</span>
              </div>
              <div className="buttons space-x-2">
                <button onClick={() => { handleEdit(item.id) }} className='bg-amber-300 hover:bg-amber-500 px-2 py-1 rounded-2xl text-gray-600'><MdOutlineEdit /></button>
                <button onClick={() => { handleDelete(item.id) }} className='bg-amber-300 hover:bg-amber-500 px-2 py-1 rounded-2xl text-gray-600'><MdOutlineDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>

    </>
  )
}

export default App
