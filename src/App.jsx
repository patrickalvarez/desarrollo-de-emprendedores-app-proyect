import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import { CreatePatient } from './components/pages/CreatePatient'
import { Dashboard } from './components/pages/Dashboard'
import { Patients } from './components/pages/Patients'
import { Layout } from './components/shared/Layout'
import { GlobalContextProvider } from './context/GlobalContext'

function App() {

  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path='patients' element={<Outlet />}>
              <Route index element={<Patients />} />
              <Route path='create' element={<CreatePatient />} />
            </Route>
            <Route path='entries' element={<Outlet />}>

            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  )
}

export default App
