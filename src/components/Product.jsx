import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;
const Product = ({ title, img, description }) => (
  <Card
    hoverable
    style={{
      width: 300, 
      height: 350, 
    }}
    cover={<img alt="example" src={img} style={{ height: '200px', objectFit: 'cover' }} />} 
  >
    <Meta title={title} description={description} />
  </Card>
);

export default Product;
