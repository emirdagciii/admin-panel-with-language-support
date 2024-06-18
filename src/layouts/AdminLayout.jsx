
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminUserPage from "../pages/admin/AdminUserPage";






const getUserRole = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  return admin ? admin.role : null;
};

export const AdminLayout = () => {
  const userRole = getUserRole();

  if (userRole === "admin") {
    return (
      
        <div className="admin-layouts">
          <Header />
          <h3 className="flex text-2xl font-bold items-center justify-center my-15">
            Ürünler
          </h3>
          
          <AdminUserPage />
          
          
          
          <Footer />
        </div>
        
      
    );
  }
};

export default AdminLayout;
