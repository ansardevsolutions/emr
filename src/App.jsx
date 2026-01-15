// src/App.jsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Patients from "./pages/Patients";

// Create MUI theme for consistent styling
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // EMR blue
    },
    secondary: {
      main: "#4caf50", // Success green
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Default route - redirect to patients */}
          <Route path="/" element={<Navigate to="/patients" replace />} />

          {/* Patients page */}
          <Route path="/patients" element={<Patients />} />

          {/* Add more routes as needed */}
          {/* <Route path="/appointments" element={<Appointments />} /> */}
          {/* <Route path="/doctors" element={<Doctors />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
