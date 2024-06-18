
import { HomeOutlined, UserOutlined, PhoneOutlined, MailOutlined, LogoutOutlined, ScheduleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "../i18n.js"
import { useTranslation } from "react-i18next";


const Header = () => {

  const {t,i18n} = useTranslation()
  const clickHandle = async lang => {
     i18n.changeLanguage(lang)
  }
  
  const user = localStorage.getItem("admin");



  return (
    <div className="bg-slate-900 border-b py-5">
      <div className="telNo pt-3">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex justify-between w-full md:w-auto">
            <a
              href="tel:+905453615904"
              className="text-md mx-2 md:mx-6 mb-2 md:mb-0 flex items-center text-white"
            >
              <PhoneOutlined className="mr-2 text-orange-200" />
              <span className="text-orange-200">800 368 590</span>
            </a>
            <a
              href="mailto:dagciemir335@gmail.com"
              className="text-md mx-2 md:mx-6 mb-2 md:mb-0 flex items-center text-white"
            >
              <MailOutlined className="mr-2 text-orange-200" />
              <span className="text-orange-200">xxx@sample.com</span>
            </a>
          </div>
        </div>
      </div>
      <header className="py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="logo">
            <a href="/">
              <h2 className="text-2xl font-bold md:text-4xl text-orange-200">
                LOGO
              </h2>
            </a>
          </div>
          <div className="hidden md:block">
            <p className="catchword text-xl ml-20 text-orange-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
        <div className="menu-links flex gap-8">
          <a href={"/"} className="menu-link flex flex-col items-center">
            <HomeOutlined className="text-2xl text-orange-200" />
            <span className="text-sm text-orange-200">{t("Home")}</span>
          </a>
          <Button onClick={() => clickHandle('tr') } className="text-sm text-orange-200">Tr</Button>
          <Button onClick={() => clickHandle('en') }className="text-sm text-orange-200">En</Button>
          {user && (
            <button
              onClick={() => {
                if (window.confirm(("Çıkış yapmak istediğinize emin misiniz?"))) {
                  localStorage.removeItem("admin");
                  window.location.href = "/";
                }
              }}
            >
              <LogoutOutlined className="flex flex-col items-center justify-center text-2xl text-orange-200" />
              <span className="text-sm text-orange-200">Çıkış Yap</span>
            </button>
          )}
          {user && (
            <button
              onClick={() => {
                window.location.href = "/admin";
              }}
            >
              <ScheduleOutlined className="flex flex-col items-center justify-center text-2xl text-orange-200" />
              <span className="text-sm text-orange-200">{("Admin Paneli")}</span>
            </button>
          )}
          {!user && (
            <button
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              <UserOutlined className="flex flex-col items-center justify-center text-2xl text-orange-200" />
              <span className="text-sm text-orange-200">{t("Login")}</span>
            </button>
          )}
         
        </div>
      </header>
    </div>
  );
};

export default Header;
