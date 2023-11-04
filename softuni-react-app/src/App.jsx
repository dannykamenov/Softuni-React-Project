import './App.css'
import Header from './components/core/Header/Header'
import Footer from './components/core/Footer/Footer'
import Home from './components/core/Home/Home'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { useState } from 'react'
import RegisterComponent from './components/auth/Register/Register'

function App() {
  const [isToggled, setIsToggled] = useState(false)

  const handleToggleChange = (value) => {
    setIsToggled(value)
  }

  return (
    <Router>
      <Header onToggleChange={handleToggleChange} />
      <main>
      <Routes>
        <Route path="/" element={<Home isToggled={isToggled} />} />
        <Route path="/register" element={<RegisterComponent isToggled={isToggled} />} />
      </Routes>
      </main>
      <Footer />
    </Router>

  )
}

export default App
