import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MainLayout } from "./layouts/MainLayout";
import  AdminLayout  from "./layouts/AdminLayout";
import "./i18n"




const isAdmin = window.location.pathname.startsWith("/admin")

const Layout = isAdmin ? AdminLayout : MainLayout

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
  
  <React.StrictMode>

      <Layout>
        <App />
      </Layout>

  </React.StrictMode>

     

  </>
);
