import { Route, Routes } from "react-router-dom"
import Register from "./components/auth/Register.jsx"
import Login from "./components/auth/Login.jsx"
import Home from "./components/Home.jsx"
import Error from "./components/Error.jsx"
import { FaMoon } from "react-icons/fa";
import ThemeSwitch from "./components/theme/ThemeSwitch.jsx"
const App = () => {
  return (
    <>
    <div className="fixed h-screen w-full bg-gradient-to-tr dark:from-indigo-900 dark:to-cyan-900 from-indigo-400 to-cyan-400 ">
      <ThemeSwitch/>
      <Routes>
        <Route path="/*" element={<Error/>}></Route>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/signin" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        
      </Routes>
    </div>
    </>
  )
}

export default App