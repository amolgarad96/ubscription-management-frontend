import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './Component/ProtectedRoute'
import { Login } from './Pages/Login'
import { Home } from './Pages/Home'
import { Layout } from './Layout/layout'
import { Subscriptions } from './Pages/subscriptions'

function App() {

  return (
    <>
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/subscriptions" element={<Subscriptions />} />
        </Route>
    </Routes>
    </>
  )
}

export default App
