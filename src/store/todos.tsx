import { createContext, useContext, useState, type ReactNode } from "react";

// Props for provider
export type TodosProviderProps = {
  children: ReactNode;
};

// Single todo structure
export type Todo = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date | null;
  status: string;
};

// Context type
export type TodosContext = {
  todos: Todo[];
  handleAddToDo: (task: string, dueDate?: Date) => void;
  toggleTodoCompleted: (id: string) => void;
  handleDeleteTodo: (id: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

// Create context
export const todosContext = createContext<TodosContext | null>(null);

export const TodosProvider = ({ children }: TodosProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const newTodos = localStorage.getItem("todos") || "[]";
      return JSON.parse(newTodos) as Todo[];
    } catch (e) {
      return [];
    }
  });

  const [searchTerm, setSearchTerm] = useState(""); // new state


  const handleAddToDo = (task: string, dueDate?: Date) => {
    setTodos((prev) => {
      const newTodos: Todo[] = [
        {
          id: Math.random().toString(),
          task: task,
          completed: false,
          createdAt: new Date(),
          dueDate: dueDate || null,
          status: "pending", // fixed issue here
        },
        ...prev,
      ];
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };

  const toggleTodoCompleted = (id: string) => {
    setTodos((prev) => {
      const newTodos = prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => {
      const newTodos = prev.filter((t) => t.id !== id);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };

  return (
    <todosContext.Provider
        value={{
        todos,
        handleAddToDo,
        toggleTodoCompleted,
        handleDeleteTodo,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </todosContext.Provider>
  );
};

// Consumer hook
export const useTodos = () => {
  const todosConsumer = useContext(todosContext);
  if (!todosConsumer) {
    throw new Error("useTodos must be used inside TodosProvider");
  }
  return todosConsumer;
};
