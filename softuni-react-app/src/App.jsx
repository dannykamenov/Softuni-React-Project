import './App.css'
import Header from './components/core/Header/Header'
import Footer from './components/core/Footer/Footer'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Header />
      <Footer />
    </Router>

  )
}

export default App
