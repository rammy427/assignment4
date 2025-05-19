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
import Login from './screens/Login'
import '../scss/custom.scss'
import EditUser from './screens/EditUser'
import AddSkill from './screens/AddSkill'
import EditSkill from './screens/EditSkill'
import AddEducation from './screens/AddEducation'
import EditEducation from './screens/EditEducation'
import AddExperience from './screens/AddExperience'
import EditExperience from './screens/EditExperience'
import NonDeletedRoutes from './components/NonDeletedRoutes'

function App() {
  return (
    <>
      <Navbar />
      <div className='container-fluid bg-primary pb-5 pt-5'>
        <div className='card'>
          {/* Set up all the routes. */}
          <Routes>
            {/* All routes available if user is NOT removed. */}
            <Route element={<NonDeletedRoutes />}>
              <Route path='/' element={<Home />}/>
              <Route path='/experience' element={<Experience />}/>
              <Route path='/login' element={<Login />}/>
              {/* Editing routes. */}
              <Route path='/edit-user' element={<EditUser />}/>
              {/* Edit skill routes. */}
              <Route path='/add-skill' element={<AddSkill />}/>
              <Route path='/edit-skill/:id' element={<EditSkill />}/>
              {/* Edit education routes. */}
              <Route path='/add-education' element={<AddEducation />}/>
              <Route path='/edit-education/:id' element={<EditEducation />}/>
              {/* Edit experience routes. */}
              <Route path='/add-experience' element={<AddExperience />}/>
              <Route path='/edit-experience/:id' element={<EditExperience />}/>
            </Route>
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
