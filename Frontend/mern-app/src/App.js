import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

//import pages and components
import HomePage from './pages/HomePage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import { useAuthContext } from './hooks/useAuthContext'

function App() {
  const {user} = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <HomePage /> : <Navigate to='login'/>}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to='/' />}
            />
            <Route
              path="/login"
              element={!user ? <Login />: <Navigate to='/' />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
