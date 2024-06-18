import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import  Header  from "../components/Header";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import {SolutionOutlined,CommentOutlined,TeamOutlined,SafetyCertificateOutlined } from "@ant-design/icons";

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const {t, i18n} = useTranslation();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/product/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else {
        console.error("Ürünleri alma hatası:", response.status);
      }
    } catch (error) {
      console.error("Ürünleri alma hatası:", error);
    }
  };



  return (
    <div>
      <Header />
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 justify-between p-10 sm:justify-center my-auto">
        <div key={product._id} className="w-[450px] flex-col ml-12 ">
        
          <h2 className='text-2xl font-bold my-5 flex'>{i18n.language === 'tr' ? product.baslik.tr : product.baslik.en}</h2>
          <img src={product.img} alt="example" />
          <div className="flex flex-col my-20 gap-y-5">
          <div className="text-lg desc"><CommentOutlined className="text-3xl mr-2"/>{t("customer")}</div>
          <div className="text-lg desc"><TeamOutlined className="text-3xl mr-2"/>{t("field")}</div>
          <div className="text-lg desc"><SafetyCertificateOutlined className="text-3xl mr-2"/>{t("naturel")}</div>
          <div className="text-lg desc"><SolutionOutlined className="text-3xl mr-2"/>{t("production")}</div>
          </div>
        
        </div>
        <div className="flex-col mt-12">
          <h2 className="text-xl font-bold items-center justify-center flex hidden md:block">{i18n.language === 'tr' ? product.baslik.tr : product.baslik.en}</h2>
          <p className="text-xl desc mt-5">{i18n.language === 'tr' ? product.description.tr : product.description.en}</p>
          <p className="mt-20">{t("detailLink")}</p>
          <div className="flex flex-col mt-20 gap-y-5">
          <div className="flex"><Link className="text-xl font-bold" to={product.amazon}><img className="h-12 w-30" src="/Amazon_logo.svg" alt="" /></Link></div>
          <div className="flex"><Link className="text-xl font-bold" to={product.trendyol}><img className="h-16 w-30" src="/Trendyol_logo.svg.png" alt="" /></Link></div>
          <div className="flex"><Link className="text-xl font-bold" to={product.pttavm}><img className="h-9 w-30" src="/pttavm.svg" alt="" /></Link></div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ProductDetail;
