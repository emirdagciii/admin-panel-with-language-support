import { useCallback, useEffect, useState } from "react";
import { Button, Popconfirm, Table, message, Modal, Input } from "antd";

const AdminUserPage = () => {

  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValues, setInputValues] = useState({
    baslik: "",
    img: "",
    description: "",
    descriptionEn:"",
    amazon: "",
    trendyol: "",
    pttAvm: "",
    baslikEn:""
    
  });

  const handleCreateClick = () => {
    setModalVisible(true);
    setInputValues({
      baslik: "",
      baslikEn: "",
      img: "",
      description: "",
      descriptionEn: "",
      amazon: "",
      trendyol: "",
      pttAvm: ""
    });
  };
  
  const handleUpdateClick = (record) => {
    setModalVisible(true);
    setInputValues({
      baslik: record.baslik.tr,
      baslikEn: record.baslik.en,
      img: record.img,
      description: record.description.tr,
      descriptionEn: record.description.en,
      amazon: record.amazon,
      trendyol: record.trendyol,
      pttAvm: record.pttAvm,
      _id: record._id.toString()
    });
  };
  
  

  const addProduct = async () => {
    try {
  
      const dataWithoutTitle = {
        ...inputValues,
        baslik: {
          tr: inputValues.baslik,
          en: inputValues.baslikEn
        },
        description:{
          tr:inputValues.description,
          en: inputValues.descriptionEn

        }
      };
   
      
    
      const { baslik, baslikEn,description, descriptionEn,  ...data } = dataWithoutTitle;

  
      const response = await fetch(`http://localhost:5000/api/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify(dataWithoutTitle),
      });
  
      if (response.ok) {
        message.success("Ürün başarıyla eklendi.");
        fetchProducts();
        setModalVisible(false);
      } else {
        message.error("Ürün ekleme işlemi başarısız.");
      }
    } catch (error) {
      console.error("Ürün ekleme hatası:", error);
      message.error("Sunucu hatası: Ürün ekleme işlemi gerçekleştirilemedi.");
    }
  };

  
  const handleModalOk = async () => {
    const dataWithoutTitle = {
      ...inputValues,
      baslik: {
        tr: inputValues.baslik,
        en: inputValues.baslikEn
      },
      description:{
        tr:inputValues.description,
        en: inputValues.descriptionEn

      }
    };
    
  
    const { baslik, baslikEn,description, descriptionEn,  ...data } = dataWithoutTitle;
    console.log(data)
    if (inputValues._id) {
     
      try {
        const { _id, ...data } = dataWithoutTitle;
 
        const response = await fetch(`http://localhost:5000/api/product/${_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
    
        if (response.ok) {
          message.success("Ürün başarıyla güncellendi.");
          fetchProducts();
          setModalVisible(false);
        } else {
          message.error("Ürün güncelleme işlemi başarısız.");
        }
      } catch (error) {
        console.error("Ürün güncelleme hatası:", error);
        message.error("Sunucu hatası: Ürün güncelleme işlemi gerçekleştirilemedi.");
      }
    } else {
      
      addProduct();
    }
  };
  
  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const columns = [
    {
      title: "Görsel",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => (
        <img
          src={imgSrc}
          alt="Gorsel"
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
          }}
        />
      ),
    },
    {
      title: "Başlık Tr",
      dataIndex: "baslik.tr", 
      key: "baslik.tr",
    },
    {
      title: "Başlık En",
      dataIndex: "baslik.en", 
      key: "baslik.en",
    },
    {
      title: "Açıklama",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Amazon",
      dataIndex: "amazon",
      key: "amazon",
    },
    {
      title: "Trendyol",
      dataIndex: "trendyol",
      key: "trendyol",
    },
    {
      title: "pttAvm",
      dataIndex: "pttAvm",
      key: "pttAvm",
    },
    {
      title: "Sil",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Ürünü Sil"
          description="Ürünü silmek istediğinizden emin misiniz?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => deleteProduct(record._id)}
        >
          <Button type="primary" danger>
            Sil
          </Button>
        </Popconfirm>
      ),
    },
    {
      title: "Güncelle",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Button onClick={() => handleUpdateClick(record)} type="primary">
          Güncelle
        </Button>
      ),
    },
  ];
  

  const fetchProducts = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/product`);

      if (response.ok) {
        const data = await response.json();
        setDataSource(data);
      } else {
        message.error("Giriş başarısız.");
      }
    } catch (error) {
      console.log("Giriş hatası:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/product/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        message.success("Ürün başarıyla silindi.");
        fetchProducts();
      } else {
        message.error("Silme işlemi başarısız.");
      }
    } catch (error) {
      console.log("Silme hatası:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
<Table
  dataSource={dataSource}
  className="px-3"
  columns={columns}
  rowKey={(record) => record._id}
  loading={loading}
  scroll={{ x: true }}
  rowClassName={(record, index) => index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}
/>
      <div className="flex items-center justify-center my-10"> 
        <Button onClick={handleCreateClick} type="primary">Ürün Ekle</Button>
      </div>
      <Modal
        
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <h3 className="font-bold mt-5">Ürün Başlığı</h3>
        <Input
  className="my-5"
  title="Ürün Başlığı"
  placeholder="Ürün Başlığı"
  value={inputValues.baslik}
  onChange={(e) =>
    setInputValues({ ...inputValues, baslik: e.target.value })
  }
/>

<Input
  title="Ürün Başlığı"
  placeholder="Product Title"
  value={inputValues.baslikEn}
  onChange={(e) =>
    setInputValues({ ...inputValues, baslikEn: e.target.value })
  }
/>

        <h3 className="font-bold">Product Img Link</h3>
        <Input
        
          className="my-5"
          placeholder="Ürün Görseli"
          value={inputValues.img}
          onChange={(e) =>
            setInputValues({ ...inputValues, img: e.target.value })
          }
        />
        <h3 className="font-bold">Product Description</h3>
        <Input
          className="my-5"
          placeholder="Ürün Açıklaması"
          value={inputValues.description}
          onChange={(e) =>
            setInputValues({ ...inputValues, description: e.target.value })
          }
        />
          <Input
          
          placeholder="Product Description"
          value={inputValues.descriptionEn}
          onChange={(e) =>
            setInputValues({ ...inputValues, descriptionEn: e.target.value })
          }
        />
        <h3 className="font-bold">Amazon Link</h3>
        <Input
          className="my-5"
          placeholder="Amazon Linki"
          value={inputValues.amazon}
          onChange={(e) =>
            setInputValues({ ...inputValues, amazon: e.target.value })
          }
        />
        <h3 className="font-bold">Trendyol Link</h3>
        <Input
          className="my-5"
          placeholder="Trendyol Linki"
          value={inputValues.trendyol}
          onChange={(e) =>
            setInputValues({ ...inputValues, trendyol: e.target.value })
          }
        />
        <h3 className="font-bold">pttAvm Link</h3>
        <Input
          className="my-5"
          placeholder="pttAvm Linki"
          value={inputValues.pttAvm}
          onChange={(e) =>
            setInputValues({ ...inputValues, pttAvm: e.target.value })
          }
        />
      </Modal>

    </>
  );
};

export default AdminUserPage;
