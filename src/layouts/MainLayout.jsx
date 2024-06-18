import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";



export const MainLayout = (props) => {
  return (
    <div className="main-layout">
      <React.Fragment>
        
        {props.children}
        
      </React.Fragment>
    </div>
  );
};
