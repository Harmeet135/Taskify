import React, { useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import "./App.css"; 
import Inputfield from './components/Inputfield';
import { Todo } from './components/model';
import Todolist from './components/Todolist';

const App: React.FC = () => {
  const[todo,setTodo] = useState<string>('');

  const [listtodos , setlisttodos] = useState<Todo[]>([]);
  const [completedTodos , setcompletedTodos] = useState<Todo[]>([]);


  const handleAdd = (e : React.FormEvent) =>{
    e.preventDefault(); 

    if(todo) {
      setlisttodos([...listtodos, {id: Date.now() , todo, isDone: false }])
      setTodo("")
    }
  };


  const onDragEnd = (result: DropResult) => {
   const {destination, source} = result;

    if(!destination) return;

    if(destination.droppableId === source.droppableId && destination.index === source.index) return;

    let add;
    let active = listtodos;
    let complete = completedTodos;

console.log("active" , destination,"comp" , source, "res" , result)
    
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      // add.isDone = true;

      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      // add.isDone = false;
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      add.isDone = false;
      active.splice(destination.index, 0, add);
      
    } else {
      add.isDone = true;
      complete.splice(destination.index, 0, add);
    }

    setcompletedTodos(complete);
    setlisttodos(active);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
       <div className='App min-h-screen bg-{#d7dade} sm:w-[100%] w-[80%] mx-auto '>
      <h1 className=' text-5xl font-normal text-center py-8 ' >Taskify</h1>
      <Inputfield todo={todo} setTodo={setTodo} handleAdd= {handleAdd}  inputClass="border border-gray-300 rounded-md   p-2"/> 
      <Todolist listtodos={listtodos}  setlisttodos={setlisttodos} completedTodos={completedTodos} setcompletedTodos={setcompletedTodos} />
    </div>
    </DragDropContext>
  )
};

export default App;
