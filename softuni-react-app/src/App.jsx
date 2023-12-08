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
import SearchComponent from './components/main/Search/SearchComponent'
import MerchantPageComponent from './components/main/Merchant Info/Merchant Info'
import WrappedProductPage from './components/main/Product Info/Product Info'
import ProductList from './components/main/Product List/Product List'
import PostProduct from './components/main/Upload Product/Upload Product'
import EditProduct from './components/main/Edit Product/Edit Product'
import { AuthProvider } from './guards/authGuard'
import ProtectedRoute from './guards/protectedRoute'
import ProtectedUserRoute from './guards/protectedUserRoute'
import ProtectedBusinessRoute from './guards/protectedBusinessRoute'
import ProtectedPersonalRoute from './guards/protectedPersonalRoute'

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
      </Routes>
      <AuthProvider>
        <Routes>
          <Route path="/register" element={ <ProtectedRoute><RegisterComponent isToggled={isToggled} /></ProtectedRoute> } />
          <Route path="/login" element={ <ProtectedRoute><LoginComponent isToggled={isToggled} /></ProtectedRoute> } />
          <Route path="/forgot-password" element={ <ProtectedRoute><ResetPasswordComponent isToggled={isToggled} /></ProtectedRoute> } />
          <Route path='/verify-email' element={<ProtectedRoute><VerifyPage isToggled={isToggled} /></ProtectedRoute> } />
          <Route path='/search' element={ <ProtectedUserRoute><SearchComponent isToggled={isToggled} /></ProtectedUserRoute> } />
          <Route path='/merchant/:id' element={<ProtectedUserRoute><MerchantPageComponent isToggled={isToggled} /></ProtectedUserRoute>} />
          <Route path='/product-info/:id' element={<ProtectedUserRoute><WrappedProductPage isToggled={isToggled} /></ProtectedUserRoute>} />
          <Route path='/products' element={ <ProtectedBusinessRoute><ProductList isToggled={isToggled} /></ProtectedBusinessRoute> } />
          <Route path='/create-product' element={<ProtectedBusinessRoute><PostProduct isToggled={isToggled} /></ProtectedBusinessRoute>} />
          <Route path='/edit-product/:id' element={<ProtectedBusinessRoute><EditProduct isToggled={isToggled} /></ProtectedBusinessRoute>} />
          <Route path='/my-profile' element={<ProtectedPersonalRoute><MyProfileComponent isToggled={isToggled} /></ProtectedPersonalRoute>} />
          <Route path='*' element={<Home isToggled={isToggled} />} />
        </Routes>
      </AuthProvider>
      <Footer />
    </Router>

  )
}

export default App
