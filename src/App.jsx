import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  { Home }  from "./pages/Home";
import   Login   from "./pages/Login";
import {ProductDetail} from "./pages/ProductDetail";
import  {AdminLayout}  from "./layouts/AdminLayout";







const App = () => {

  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/productDetail/:id" element={<ProductDetail />} />
      <Route path="/admin" element={<AdminLayout/>}/>  
      
      
      

     
    </Routes>
    </BrowserRouter>
  );
}
export default App;
