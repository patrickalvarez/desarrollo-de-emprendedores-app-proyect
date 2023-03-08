import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import { CreatePatient } from './components/pages/CreatePatient'
import { Patients } from './components/pages/Patients'
import { Layout } from './components/shared/Layout'
import { GlobalContextProvider } from './context/GlobalContext'

function App() {

  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<h1>Dashboard</h1>} />
            <Route path='patients' element={<Outlet />}>
              <Route index element={<Patients />} />
              <Route path='create' element={<CreatePatient />} />
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  )
}

export default App
