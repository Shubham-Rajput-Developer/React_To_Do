import { createContext, useContext, useState, type ReactNode } from "react";

// Props for provider
export type TodosProviderProps = {
    children: ReactNode;
};

// Single todo structure
export type Todo = {
    id:string;
    task:string;
    completed: boolean;
    createdAt:Date;
};

// Context type
export type TodosContext = {
    todos:Todo[];
    handleAddToDo:(task:string)=>void;
    toggleTodoCompleted:(id:string)=>void;
    handleDeleteTodo:(id:string)=>void;
};

// Create context
export const todosContext = createContext<TodosContext | null>(null);

export const TodosProvider = ({children}:TodosProviderProps)=>{
    const[todos,setTodos] = useState<Todo[]>(
        ()=>{
            try{
                const newTodos = localStorage.getItem("todos") || "[]";
                return JSON.parse(newTodos) as Todo[]

            }catch(e){
                return[]
            }
        }
    );

    const handleAddToDo = (task:string) =>{
        setTodos((prev)=>{ 
            const newTodos:Todo[] =[
                {
                    id:Math.random().toString(),
                    task:task,
                    completed:false,
                    createdAt:new Date()
                },
                ...prev
            ] 

            // console.log("My previous Data is : "+prev);
            // console.log(newTodos);

            localStorage.setItem("todos",JSON.stringify(newTodos))
            return newTodos
        });
    };

    //mark completed
    const toggleTodoCompleted = (id:string)=>{
        setTodos((prev)=>{
            const newTodos = prev.map((todo)=>{
                if(todo.id == id){
                    return {...todo, completed:!todo.completed}
                } 
                return todo;
            })
            localStorage.setItem("todos",JSON.stringify(newTodos))
            return newTodos;
        })
    }

    const handleDeleteTodo = (id:string)=>{
        setTodos((prev)=>{
            const newTodos = prev.filter((filterData)=>filterData.id != id);
            localStorage.setItem("todos",JSON.stringify(newTodos))
            return newTodos;
        })
    }
    return (<todosContext.Provider value={{todos,handleAddToDo,toggleTodoCompleted,handleDeleteTodo}}>
        {children}
    </todosContext.Provider>
    );
};



//consumer
export const useTodos = () =>{
    const todosConsumer = useContext(todosContext);
    if(!todosConsumer){
        throw new Error("useTodos Used outside of provider");
    }
    return todosConsumer;
}