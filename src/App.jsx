import { useState, useEffect } from 'react'
import { useRef } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import Navbar from './components/Navbar'
function App() {


  //Reference for Input:text
  const inpRef = useRef()
  // Usestate used to todo title
  const [todo, setTodo] = useState("") 


  //Usestate used to set array of todo including dates, isCompleted etc
  const [todos, setTodos] = useState(() => {

    //Recieve todos saved in Local Storage
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });



  //Function Run When User Add empty todo
  const notify = () =>
    toast.error('😝 Input Required !', {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce
    });

  // Function to add todo to array
  const handleAdd = () => {
    if (todo.length == 0) {
      notify()
    }
    else {
      setTodos([...todos, { todo, isCompleted: false, key: uuidv4(), addedDate: Date.now(), completedDate: "" }])
      setTodo("")
    }
  }
  // Function Run When User Type om Input Section
  const handleChange = (e) => {
    setTodo(e.target.value)


  }

  // Add todo when User Press Enter
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAdd()
    }

  }

  // Toggle completion of todo
  const handleCheck = (e) => {
    let id = e.target.name;
    todos.map(item => {
      if (item.key == id) {
        const index = todos.findIndex(item => {
          return item.key === id
        })
        const newTodos = [...todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted
        if(newTodos[index].isCompleted){
          done()
        }
        newTodos[index].completedDate = Date.now()
        setTodos(newTodos)
        



      }
    })
  }
      // Function to Delete todo From array
  const handleDelete = (e) => {
    const id = e.target.id;
    const newTodos = todos.filter(item => item.key !== id);
    setTodos(newTodos);

  };

  // Toast Run when todo is completed
  const done = () => toast.success(' 🎉 Yay! You Have Done it.', {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition:  Bounce ,
  });

  // Function to Edit A todo
  const handleEdit = (e) => {
    const id = e.target.value;
    const index = todos.findIndex(item => item.key === id);
    const newTodos = [...todos];
    if (index !== -1) {
      setTodo(newTodos[index].todo);
      newTodos.splice(index, 1);
      setTodos(newTodos);
      inpRef.current.focus();

    }
  };

// Save Todos To Local Storage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);


  return (
    < >
      <div  className="darkMode h-screen">
        <Navbar />
        <div>
          <button className='hidden' onClick={notify}>Notify!</button>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
        <div className="inpSection flex justify-evenly mt-5  items-center">

          <input ref={inpRef} onChange={handleChange} onKeyDown={handleKeyDown} type="text" value={todo ? todo : ""} className='w-[80vw]  bg-slate-300 px-5 py-2 rounded-lg' placeholder='Enter Your Todo' name="" />

          <button onClick={handleAdd} type="button" className="text-white bg-blue-700 hover:bg-blue-500  font-medium rounded-xl text-sm px-5 py-2.5 text-center  dark:bg-blue-600 max-lg:px-3 max-lg:py-2 dark:hover:bg-blue-700 ">Add</button>

        </div>
        <h1 className='text-center mt-5 mb-5 italic'>-------- Your Todos --------</h1>

            {/* A loop which target all the member of array */}
        {todos.map(item => {


          return (item.todo != undefined &&  (<div key={item.key} className="mainbodyUpper flex max-lg:flex-col flex-row justify- items-center">

            <div className="showTodo flex justify-evenly  items-center mt-5">

              <div className="ShowAndButtons w-[70vw] max-lg:w-screen max-lg:justify-evenly  flex justify-center flex-row h-max items-center gap-0">
                <div className='flex flex-row max-lg:gap-3 items-center gap-20 w-[40vw]'>

                  <input onChange={handleCheck} onKeyUp={handleAdd} type="checkbox" checked={item.isCompleted} name={item.key} id="" className='p-2' />


                  <h1 className={item.isCompleted ? "line-through break-all max-lg:m-0 mr-[50px]  text-red-500 h-full  w-[30vw]" : " max-lg:w-[100vw] mr-[50px] max-lg:m-0 break-all"} >{item.todo}</h1>

                </div>

                <div className="editAndDelete  flex flex-row max-lg:gap-3 gap-10">
                  {item.isCompleted ? <button onClick={handleEdit} value={item.key} type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 max-lg:px-2 max-lg:py-1 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Redo</button> : <button onClick={handleEdit} value={item.key} type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 max-lg:px-2 max-lg:py-1 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Edit</button>}

                  <button onClick={handleDelete} id={item.key} type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg max-lg:px-2 max-lg:py-1 text-sm px-5 py-2.5 text-center ">Delete</button>

                </div>
              </div>
            </div>
            <div className="mainBodyLower max-lg:w-full w-[40vw] flex flex-row gap-6 max-lg:gap-2 justify-evenly italic mt-3 items-center">
              <h3 className=' text-green-600 text-sm max-lg:text-[10px]'>Added on : {new Date(item.addedDate).toString().replace(/GMT.*/, '').trim()}</h3>

              {item.isCompleted ? <h3 className='text-sm  max-lg:text-[10px] text-red-600'>Completed on : {new Date(item.completedDate).toString().replace(/GMT.*/, '').trim()}</h3> : <h3 className='text-sm max-lg:text-[10px] text-red-600'>Not Completed Yet</h3>}


            </div>
          </div>))


        })}
      </div>
      <h1 className='copyright fixed bottom-0 text-lg ml-5'>Created By TheBinod</h1>
    </>
  )
}

export default App
