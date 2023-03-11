import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Dashboard } from './components/pages/Dashboard';
import { Entrties } from './components/pages/Entrties';
import { Patients } from './components/pages/Patients';
import { Layout } from './components/shared/Layout';
import { GlobalContextProvider } from './context/GlobalContext';

function App() {

  return (
    <GlobalContextProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path='patients' element={<Patients />} />
              <Route path='entries' element={<Entrties />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </GlobalContextProvider>
  )
}

export default App
