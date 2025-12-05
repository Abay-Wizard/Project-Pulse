import React, { useEffect } from "react"
import {Routes,Route} from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Features from "./pages/Features"
import Dashboard from "./pages/Dashboard"
import CreateProject from "./pages/CreateProject"
import UpdateProject from "./pages/UpdateProject"
import { userStore } from "./store/userStore"


function App() {
  const {checkUser} =userStore()
  useEffect(()=>{
    checkUser()
  },[])

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/features" element={<Features/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/create" element={<CreateProject/>}/>
          <Route path="/update/:id" element={<UpdateProject/>}/>
        </Routes>
      </main>
      <Footer/>
      <Toaster/>
    </div>
  )
}

export default App
