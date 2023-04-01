import React, { useRef } from 'react'

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
  inputClass?: string;
}

const Inputfield = ({ todo, setTodo, handleAdd, inputClass }: Props) => {

  // const inputref = useRef<HTMLInputElement>(null);

  return (
    <form className="flex justify-center mb-16 mt-8"  onSubmit={handleAdd}>
  <div className="relative border-2 border-gray-400 rounded-lg shadow-md ">
    <input
      type="text"
      className=" py-4 px-4 sm:pr-80  pr-32 border-none rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="Enter a Task"
    value={todo}
    onChange={(e) => setTodo(e.target.value)}
  />
  <div className="absolute top-1/2 transform -translate-y-1/2 right-4 flex items-center">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-full">
      GO
    </button>
  </div>
</div>
</form>


  );
};

export default Inputfield

