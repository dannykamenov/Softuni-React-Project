import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './core/Header/Header';
import Footer from './core/Footer/Footer';


function App() {
  return (
    <>
    <Header />
    <main>
      <Outlet /> {/* This is where page content gets rendered */}
    </main>
    <Footer />
  </>
  );
}

export default App;
