import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css"
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import Home from './screens/Home'
import Experience from './screens/Experience'
import '../scss/custom.scss'

function App() {
  return (
    <>
      <Navbar />
      <div className='container-fluid bg-primary pb-5 pt-5'>
        <div className='card'>
          {/* Set up all the routes. */}
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/experience' element={<Experience />}/>
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
