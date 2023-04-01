import { Droppable } from "react-beautiful-dnd";
import { Todo } from "./model"
import Singletodo from "./Singletodo";

interface Props {
  listtodos: Todo[],
  setlisttodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  completedTodos: Array<Todo>,
  setcompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
}



const Todolist: React.FC<Props> = ({
  listtodos,
  setlisttodos,
  completedTodos,
  setcompletedTodos,
}) => {

  const handleMoveToCompleted = (task: Todo) => {
    // Filter the listtodos array to get the tasks that have isDone=true
    const completedTask = listtodos.filter((t) => t.id === task.id && t.isDone);
  
    // Update the completedTodos state with the completedTask
    setcompletedTodos((prev) => [...prev, ...completedTask]);
   
    // Remove the completedTask from the listtodos array
    setlisttodos((prev) => prev.filter((t) => t.id !== task.id || !t.isDone));
  };

  

  const handleMoveToActive = (task: Todo) => {
    // Filter the completedTodos array to get the tasks that have isDone=false
    const activeTask = completedTodos.filter((t) => t.id === task.id && !t.isDone);
    // Update the listtodos state with the activeTask
    setlisttodos((prev) => [...prev, ...activeTask]);
    
    // Remove the activeTask from the completedTodos array
    setcompletedTodos((prev) => prev.filter((t) => t.id !== task.id || t.isDone));
  };


 
  return (
    <div className="sm:grid grid-cols-2 lg:gap-40 lg:w-4/5  md:w-[85] md:gap-20   justify-items-stretch align-items-center m-auto  sm:w-[90%] sm:gap-8 ">
      <Droppable droppableId="TodosList">
        {(provided) => (

          <div className="" ref={provided.innerRef} {...provided.droppableProps}>

            <div className=" text-2xl border-b border-solid border-blue-600 pb-2 px-2 mb-10">Active Tasks</div>


            {listtodos?.map((to, index) => (
             <Singletodo
             index={index}
             to={to}
             key={to.id}
             listtodos={listtodos} 
             setlisttodos={setlisttodos}
             onMoveToActive={handleMoveToActive}
             onMoveToCompleted={handleMoveToCompleted}
           />
            ))}
            {provided.placeholder}

          </div>)
        }

      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>

            <div className=" text-2xl border-b border-solid border-red-600 pb-2 px-2 mb-10 sm:mt-0 mt-12 ">Completed Tasks </div>
            {completedTodos.map((to, index) => (
             <Singletodo
             index={index}
             to={to}
             key={to.id}
             listtodos={completedTodos}
             setlisttodos={setcompletedTodos}
             onMoveToActive={handleMoveToActive}
             onMoveToCompleted={handleMoveToCompleted}

           />
            ))}
            {provided.placeholder}

          </div>

        )}
      </Droppable>
    </div>
  );
};

export default Todolist;