import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Product from "../components/Product";
import { useTranslation } from "react-i18next";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const clickHandle = async (lang) =>{
    await i18n.changeLanguage(lang)

  }
  const {t, i18n} = useTranslation();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/product");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
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


      <Carousel autoplay afterChange={onchange}>
        <div>
          <img src="https://cdn.wallpapersafari.com/15/84/ut8hGC.jpg" alt="" />
        </div>
        <div>
          <img
            src="https://wallpapers.com/images/hd/star-space-1600-x-500-fvoqwzejui7s9pnn.jpg"
            alt=""
          />
        </div>
        <div>
          <img src="https://cdn.wallpapersafari.com/42/4/7yZj5U.jpg" alt="" />
        </div>
        <div>
          <img src="https://cdn.wallpapersafari.com/48/40/ZojDuk.jpg" alt="" />
        </div>
      </Carousel>

      <h3 className="font-bold text-3xl my-10 flex items-center justify-center">
      {t("productsHome")}
      </h3>

      <div className="grid lg:grid-cols-3 justify-center gap-y-10 mx-auto md:grid-cols-2 sm:grid-cols-1">
        {products.map((product) => (
          <div key={product._id} className="max-w-xs mx-auto border">
            <Link to={`/productDetail/${product._id}`}>
              <Product
              
                title={i18n.language === 'tr' ? product.baslik.tr : product.baslik.en}
                description={
                  <div className="product-description">
                    {i18n.language === 'tr' ? product.description.tr : product.description.en}
                  </div>
                }
                img={product.img}
              />
            </Link>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};
