import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, AppBar, Toolbar, Typography, Box, Avatar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HomePage from './pages/HomePage';
import PetDetailPage from './pages/PetDetailPage';

// Tema personalizado "gpets" - Paleta Vibrante (Strong Colors)
// Púrpura: #511F73, Verde Azulado: #26A699, Amarillo: #F2BE22, Naranja: #F29727, Rojo: #F24C3D
const theme = createTheme({
  palette: {
    primary: {
      main: '#511F73', // Deep Purple - Primary Brand Color
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#26A699', // Teal - Secondary/Action Color
      contrastText: '#ffffff',
    },
    warning: {
      main: '#F2BE22', // Yellow - Warning/Highlight
      contrastText: '#333333',
    },
    error: {
      main: '#F24C3D', // Red - Error/Important
    },
    info: {
      main: '#F29727', // Orange - Info/Accents
    },
    background: {
      default: '#f8f9fa', // Neutral light gray to let colors pop
      paper: '#ffffff',
    },
    text: {
      primary: '#2c1e31', // Very dark purple/grey for text
      secondary: '#555555',
    }
  },
  shape: {
    borderRadius: 12, // Slightly less rounded for a bolder look
  },
  typography: {
    fontFamily: '"Estedad", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 800,
      color: '#511F73',
    },
    h5: {
      fontWeight: 700,
      color: '#26A699',
    },
    h6: {
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
      borderRadius: 8,
      fontWeight: 700,
      letterSpacing: '0.5px',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '50px', // Pill shape for buttons
          boxShadow: 'none',
          padding: '10px 24px',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(81, 31, 115, 0.2)',
          },
        },
        containedPrimary: {
          backgroundColor: '#511F73',
          '&:hover': {
            backgroundColor: '#3d1656',
          }
        },
        containedSecondary: {
          backgroundColor: '#26A699',
          '&:hover': {
            backgroundColor: '#1d8277',
          }
        }
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#511F73', // Deep Purple header
          color: '#ffffff',
          boxShadow: '0 4px 20px rgba(81, 31, 115, 0.25)',
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.05)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
        colorPrimary: {
          backgroundColor: '#511F73',
        },
        colorSecondary: {
          backgroundColor: '#F29727', // Use Orange for secondary chips
          color: '#fff',
        }
      }
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="static">
          <Toolbar sx={{ minHeight: '80px !important' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, gap: 2 }}>
              <Avatar
                src="/logo.png"
                alt="gpets logo"
                sx={{
                  width: 50,
                  height: 50,
                  bgcolor: '#ffffff',
                  p: 0.5,
                  img: { objectFit: 'contain' }
                }}
              />
              <Typography
                variant="h4"
                component="div"
                sx={{
                  fontWeight: 900,
                  letterSpacing: '-0.5px',
                  color: '#ffffff', // White text on purple header
                  display: 'inline-block'
                }}
              >
                gpets
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>

        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pet/:id" element={<PetDetailPage />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
