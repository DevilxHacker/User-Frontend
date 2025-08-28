import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import UserPage from "./Pages/UserPage";
import AdminPage from "./Pages/AdminPage";

function App(){
  return<>
 <Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='SignIn' element={<SignIn/>}/>
  <Route path='/SignUp' element={<SignUp/>}/>
  <Route path='/admin' element={<AdminPage/>}/>
  <Route path='/user/:username' element={<UserPage/>}/>
  {/* <Route path='/users/update:id' element={<UserUpdate/>}/> */}

 </Routes>
  </>
  
  
}
export default App;