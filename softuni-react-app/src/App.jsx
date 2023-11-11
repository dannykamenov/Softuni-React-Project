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
        <Route path='/search' element={<SearchComponent isToggled={isToggled} />} />
        <Route path='/merchant/:id' element={<MerchantPageComponent isToggled={isToggled} />} />
        <Route path='/product-info/:id' element={<WrappedProductPage isToggled={isToggled} />} />
        <Route path='/products' element={<ProductList isToggled={isToggled} />} />
        <Route path='/create-product' element={<PostProduct isToggled={isToggled} />} />
        <Route path='/edit-product/:id' element={<EditProduct isToggled={isToggled} />} />
      </Routes>
      <Footer />
    </Router>

  )
}

export default App
