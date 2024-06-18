import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  tr:{
    translation:{
      Home: "Ana Sayfa",
      Logout:"Çıkış Yap",
      Admin:"Admin Paneli",
      Login:"Giriş Yap",
      Products:"Ürünler",
      hello:"sss",
      detailLink: "Daha fazla detay için aşağıdaki linkleri ziyaret edeiblirsiniz...",
      productsHome:"Ürünler",
      customer:"Yüksek Müşteri Memnuniyeti",
      field:"Alanında Uzman Kadro",
      naturel:"Doğal ve Hijyenik",
      production:"Profesyonel Üretim"
    }
  },
  en:{
    translation:{
    Home: "Home",
    Logout:"Logout",
    Admin:"Admin Panel",
    Login:"Login",
    Products:"Products",
    hello:"eee",
    detailLink:"You can visit this link for get more detail...",
    productsHome:"Products",
    customer:"High Customer Satisfaction",
    field:"Expert Staff in the Field",
    naturel:"Naturel & Hygienic",
    production:"Professional Production"
  }

  }
}

i18n
  .use(initReactI18next)
  .init({
    lng: "tr",
    resources
    }
    
  );
  
  

export default i18n;