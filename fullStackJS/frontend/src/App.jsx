import {BrowserRouter,Routes,Route}from 'react-router-dom'
import { AuthLayout } from './layout/AuthLayout'
import { ConfirmarCuenta } from './pages/ConfirmarCuenta'
import { Login } from './pages/Login'
import { OlvidePassword } from './pages/OlvidePassword'
import { Register } from './pages/Register'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthLayout/>}>
          <Route index element={<Login/>}/>
          <Route path='registrar' element={<Register/>}/>
          <Route path='olvide-password' element={<OlvidePassword/>}/>
          <Route path='confirmar/:id' element={<ConfirmarCuenta/>}/>
        </Route>
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
