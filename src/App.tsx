import { Route, Routes} from "react-router-dom"
import { AuthForm } from "./pages/AuthForm"
import "./index.css"
import {Contacts} from "./pages/Contacts";

function App() {

  return (
    <Routes>
        <Route path='/' element={<AuthForm />}></Route>
        <Route path="/contacts" element={<Contacts/>}></Route>
    </Routes>
  )
}

export default App
