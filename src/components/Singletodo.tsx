import React, { useEffect, useState } from 'react'
import { Todo } from './model';
import Todolist from './Todolist';
import { AiFillCheckCircle } from 'react-icons/ai';
import { RiDeleteBin3Fill } from 'react-icons/ri';
import { AiFillEdit } from 'react-icons/ai';
import { Draggable } from 'react-beautiful-dnd';

interface Props {
    index: number;
    to: Todo;
    listtodos: Todo[];
    setlisttodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    onMoveToActive: (todo: Todo) => void;
    onMoveToCompleted: (todo: Todo) => void;

}

const Singletodo = ({
    index,
    to,
    listtodos,
    setlisttodos,
    onMoveToActive,
    onMoveToCompleted,
}: Props) => {
    const handleDone = () => {
        const updatedTodos = [...listtodos];
        updatedTodos[index].isDone = !updatedTodos[index].isDone;
        setlisttodos(updatedTodos);

        if (updatedTodos[index].isDone) {
            // move to completed
            onMoveToCompleted(updatedTodos[index]);  //problem
        } else {
            // move to active
            onMoveToActive(updatedTodos[index]);
        }
    };


    const handleDelete = (id: number) => {
        setlisttodos(listtodos.filter((to) => to.id !== id));
      };

    const [edit, setEdit] = useState<boolean>(false);
    const [edittodo, setEdittodo] = useState<string>(to.todo);

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();

        setlisttodos(listtodos.map((to) => to.id === id ? { ...to, todo: edittodo } : to));
        setEdit(false);
    }

    // console.log(to);
    
    const inputref = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputref.current) 
        {
            inputref.current.focus();
        }
    }, [edit]);

    return (
        <Draggable draggableId={to.id.toString()} index={index} >

            {(provided) => (
                <form
                    className='border  mt-2 mb-5 mx-4 border-l-0'
                    onSubmit={(e) => handleEdit(e, to.id)}

                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef} >
                    <div className={`border-l-4 rounded-r-md px-8 py-3 bg-white rounded-md shadow-md  ${to.isDone === true ? 'border-active' : 'border-completed'} `} >


                        <div className='px-8 py-3 '>
                            {edit ? (
                                <input className='pl-2' type="input" value={edittodo} ref={inputref} onChange={(e) => setEdittodo(e.target.value)} />
                            ) : (
                                to.isDone ? (
                                    <s>{to.todo}</s>
                                ) : (
                                    <span>{to.todo}</span>
                                )


                            )}
                        </div>
                        <div className='flex justify-between px-4 py-2'>
                            <span onClick={() => handleDelete(to.id)} ><RiDeleteBin3Fill className="w-6 h-6 " /> </span>

                            <span
                                className={`text-sm px-2 py-1 rounded-md ${to.isDone ? "bg-green-500 text-white" : "bg-gray-200"
                                    }`}
                                onClick={handleDone}
                            >
                                {to.isDone ? "Completed" : "Active"}
                            </span>

                            <span onClick={() => {
                                if (!edit && !to.isDone) {
                                    setEdit(!edit);
                                }
                            }} ><AiFillEdit className="w-6 h-6 " /> </span>

                        </div>
                    </div>



                </form>

            )

            }


        </Draggable>
    )
};

export default Singletodo