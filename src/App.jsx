import './App.css'
import { Routes, Route } from "react-router-dom";
import { Home } from './_root/pages/Home';
import { Signin } from './_auth/form/Signin';
import { AuthLayout } from './_auth/AuthLayout';
import { RootLayout } from './_root/RootLayout';
import { AuthProvider } from './context/AuthProvider';
import { AppProvider } from './context/AppProvider';

function App() {

  return (
    <main className='w-full' >
      <AuthProvider>
        <AppProvider>
    <Routes>
      {/* public router */}
      <Route element={<AuthLayout/>}>
        <Route path="/sign-in" element={<Signin/>}></Route>
        {/* <Route path="/sign-up" element={<SignupForm />}></Route> */}
      </Route>

      {/* privte router */}
      <Route element={<RootLayout/>}>
        <Route index element={<Home />}></Route>
        
      </Route>
    </Routes>
    </AppProvider>
    </AuthProvider>
  </main>
  )
}

export default App
