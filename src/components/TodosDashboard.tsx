import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTodos } from "../store/todos";
import { useSearchParams } from "react-router-dom";

type TodoRow = {
  id: string;
  task: string;
  completed: boolean;
  dueDate?: string | Date | null;
  status?: string;
};

const TodosDashboard: React.FC = () => {
  const { todos, toggleTodoCompleted, handleDeleteTodo,searchTerm  } = useTodos();
  const [searchParams] = useSearchParams();
  const todosData = searchParams.get("todos");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Filter todos based on query
  let filterData = todos;
  if (todosData === "active") filterData = filterData.filter((t) => !t.completed);
  if (todosData === "completed") filterData = filterData.filter((t) => t.completed);

  
  // Filter by search term
  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase();
    filterData = filterData.filter((t) => t.task.toLowerCase().includes(term));
  }

  // Status logic
  const getStatus = (completed: boolean, dueDate?: string | Date | null) => {
    const today = new Date();
    const due = dueDate ? new Date(dueDate) : null;
    if (completed) return "Completed";
    if (due && due < today) return "Overdue";
    if (due && due >= today) return "Pending";
    return "No Due Date";
  };

  const columns: GridColDef[] = [
    {
      field: "done",
      headerName: "Done",
      width: 100,
      renderCell: (params) => (
        <input
          type="checkbox"
          checked={params.row.completed}
          aria-label="Mark task as done"
          onChange={() => toggleTodoCompleted(params.row.id)}
        />
      ),
      sortable: false,
    },
    { field: "task", headerName: "Task", flex: 1, minWidth: 150 },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 150,
      renderCell: (params) =>
        !params.row.completed && params.row.dueDate
          ? new Date(params.row.dueDate).toLocaleDateString()
          : "-",
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <span
          style={{
            color:
              params.row.status === "Completed"
                ? "green"
                : params.row.status === "Overdue"
                ? "red"
                : "orange",
            fontWeight: 600,
          }}
        >
          {params.row.status}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <IconButton color="error" onClick={() => setDeleteId(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
      sortable: false,
    },
  ];

  const rows: TodoRow[] = filterData.map((todo) => ({
    id: todo.id,
    task: todo.task,
    completed: todo.completed,
    dueDate: todo.dueDate,
    status: getStatus(todo.completed, todo.dueDate),
  }));

  return (
    <>
      <Box sx={{ height: "80vh", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          hideFooter
          sx={{
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "rgba(63,81,181,0.05)",
            },
          }}
        />
      </Box>

      {/* Delete confirmation */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this task?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button
            color="error"
            onClick={() => {
              if (deleteId) handleDeleteTodo(deleteId);
              setDeleteId(null);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TodosDashboard;
