import './App.css'
import Header from './components/core/Header/Header'
import Footer from './components/core/Footer/Footer'
import Home from './components/core/Home/Home'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { useState } from 'react'
import RegisterComponent from './components/auth/Register/Register'
import LoginComponent from './components/auth/Login/Login'
import ResetPasswordComponent from './components/auth/Forgot Password/ForgotPassword'
import VerifyPage from './components/auth/Confirm Email/ConfirmEmail'
import MyProfileComponent from './components/auth/My Profile/MyProfile'

function App() {
  const [isToggled, setIsToggled] = useState(false)

  const handleToggleChange = (value) => {
    setIsToggled(value)
  }

  return (
    <Router>
      <Header onToggleChange={handleToggleChange} />
      <Routes>
        <Route path="/" element={<Home isToggled={isToggled} />} />
        <Route path="/register" element={<RegisterComponent isToggled={isToggled} />} />
        <Route path="/login" element={<LoginComponent isToggled={isToggled} />} />
        <Route path="/forgot-password" element={<ResetPasswordComponent isToggled={isToggled} />} />
        <Route path='/verify-email' element={<VerifyPage isToggled={isToggled} />} />
        <Route path='/my-profile' element={<MyProfileComponent isToggled={isToggled} />} />
      </Routes>
      <Footer />
    </Router>

  )
}

export default App
