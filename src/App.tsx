import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Routes>
      {/* Main dashboard route */}
      <Route path="/" element={<Dashboard />} />

      {/* Optional redirect from root to dashboard */}
      <Route path="/" element={<Navigate to="/" replace />} />

      {/* Fallback 404 route */}
      <Route
        path="*"
        element={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              fontFamily: "Roboto, sans-serif",
              fontSize: 24,
              color: "#333",
              flexDirection: "column",
            }}
          >
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
