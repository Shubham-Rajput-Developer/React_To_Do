import { useState, type FormEvent, type ChangeEvent } from "react";
import { useTodos } from "../store/todos";
import { Button, TextField, Box, Typography, Divider, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AddTodoForm = ({ onClose }: { onClose?: () => void }) => {
  const [todo, setTodo] = useState("");
  const [dueDate, setDueDate] = useState<string>("");
  const { handleAddToDo } = useTodos();

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = todo.trim();
    if (!trimmed) return alert("Please enter a valid task!");

    handleAddToDo(trimmed, dueDate ? new Date(dueDate) : undefined);

    setTodo("");
    setDueDate("");
    onClose?.();
  };

  return (
    <Box
      component="form"
      onSubmit={handleFormSubmit}
      sx={{
        p: { xs: 3, sm: 4 },
        width: { xs: "95%", sm: 360, md: 400 },
        maxWidth: "100%",
        bgcolor: "#ffffff",
        borderRadius: 3,
        boxShadow: "0 12px 28px rgba(0,0,0,0.15)",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        position: "relative",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 16px 36px rgba(0,0,0,0.18)",
        },
      }}
    >
      {/* Close Button */}
      {onClose && (
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            bgcolor: "#f5f5f5",
            "&:hover": { bgcolor: "#e0e0e0", transform: "scale(1.1)" },
          }}
        >
          <CloseIcon />
        </IconButton>
      )}

      {/* Title */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: "#1a237e",
          textAlign: "center",
          letterSpacing: 0.5,
          "&::after": {
            content: '""',
            display: "block",
            width: 60,
            height: 3,
            bgcolor: "#3f51b5",
            borderRadius: 2,
            mx: "auto",
            mt: 0.5,
          },
        }}
      >
        Create Task
      </Typography>

      <Divider sx={{ borderColor: "#c5cae9" }} />

      {/* Task Input */}
      <TextField
        label="Task"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        fullWidth
        margin="dense"
        required
        placeholder="Enter your task here..."
        sx={{
          "& .MuiInputBase-root": {
            borderRadius: 2.5,
            backgroundColor: "#f3f4f6",
            transition: "all 0.2s ease",
          },
          "& .MuiOutlinedInput-root:hover": {
            backgroundColor: "#e8eaf6",
          },
        }}
      />

      {/* Due Date */}
      <TextField
        label="Due Date"
        type="date"
        value={dueDate}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDueDate(e.target.value)}
        fullWidth
        margin="dense"
        InputLabelProps={{ shrink: true }}
        sx={{
          "& .MuiInputBase-root": {
            borderRadius: 2.5,
            backgroundColor: "#f3f4f6",
            transition: "all 0.2s ease",
          },
          "& .MuiOutlinedInput-root:hover": {
            backgroundColor: "#e8eaf6",
          },
        }}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          mt: 1,
          py: { xs: 1.2, sm: 1.5 },
          fontSize: { xs: 15, sm: 16 },
          fontWeight: 600,
          borderRadius: 3,
          textTransform: "none",
          background: "linear-gradient(90deg, #3f51b5, #1a237e)",
          boxShadow: "0 6px 16px rgba(63,81,181,0.25)",
          transition: "all 0.3s ease",
          "&:hover": {
            background: "linear-gradient(90deg, #3949ab, #1a237e)",
            boxShadow: "0 8px 20px rgba(63,81,181,0.3)",
            transform: "translateY(-2px)",
          },
        }}
      >
        Add Task
      </Button>
    </Box>
  );
};

export default AddTodoForm;
