import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import App from './components/App/App';
import './index.css';

// Material-UI theme customization
const theme = createTheme({
  palette: {
    primary: {
      main: '#FFB6C1', // Baby Pink
    },
    secondary: {
      main: '#282828', // Very Dark Grey
    },
  },
});

const root = document.getElementById('root');

createRoot(root).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
