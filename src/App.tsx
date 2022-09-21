import { Route, Routes } from "react-router-dom"
import { AuthForm } from "./pages/AuthForm"
import "./index.css"

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthForm />}></Route>
    </Routes>
  )
}

export default App
