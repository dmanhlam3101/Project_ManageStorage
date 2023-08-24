import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Input,
  Select,
  message,
  Typography,
} from 'antd';
import {  useNavigate } from 'react-router-dom';
import { getListStorage, getProduct } from '../../services/storageService';
import { getListCustomer } from '../../services/customerService';
import { addOutputStorage } from '../../services/outputStorage';


function AddOutputStorage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const currentDate = new Date();
  const[dataProduct,setdataProduct] = useState([])
  const[dataStorage,setdataStorage] = useState([])
  const[dataCustomer,setdataCustomer] = useState([])
  const[dataquantity,setquantity] = useState([])


  const handleProductChange = (productId) => {
    const selectedProduct = dataStorage.find((product) => product.productId === productId);
    if (selectedProduct) {
      setquantity(selectedProduct.quantity)
     
    }
  };
  const onFinish = (values) => {
    const data = {
      CustomerId:values.CustomerName,
      ProductId: values.ProductName,
      Quantity: values.Quantity,
      DateOutput: currentDate.toISOString(),
      Status: true,
    };
    addOutputStorage(data)
    	.then(() => {
    		message.success('Create Output Storage successfully');
    		navigate('/outputStorage');
    	})
    	.catch((err) => {
    		message.error(err.message);
    	});
  };
  useEffect(() => {
    // Fetch storage data first
    getListStorage()
      .then((res) => {
        setdataStorage(res.data);
      })
      .catch((err) => {
        message.error(err.message);
      });

    // Then fetch products and filter them based on storage
    getProduct()
      .then((res) => {
        setdataProduct(res.data.filter(product => {
          const storageProduct = dataStorage.find(storage => storage.productId === product.ProductId);
          return storageProduct && storageProduct.quantity > 0;
        }));
      })
      .catch((err) => {
        message.error(err.message);
      });

    // Fetch customer data
    getListCustomer()
      .then((res) => {
        setdataCustomer(res.data);
      })
      .catch((err) => {
        message.error(err.message);
      });

  }, [dataStorage]); // Make sure to 


  return (
    <>
      <div className='container-fluid' style={{ display: 'contents' }}>

        <Form
          form={form}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 10,
          }}
          layout="horizontal"
          onFinish={onFinish}

          colon={false}

          style={{
            maxWidth: 900,
            margin: '50px 350px'
          }}
         
        >

<Form.Item 
          name="CustomerName" 
          label="Customer Name"
          rules={[
            {
              required: true,
              message: 'Product Name is required',
            },
          ]}
          >
            <Select >
              {dataCustomer &&
                dataCustomer.map((u) => (
                  <Select.Option key={u.CustomerId} value={u.CustomerId}>
                    <Typography.Text>
                      {u.DisplayName}
                    </Typography.Text>
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item 
          name="ProductName" 
          label="Product"
          rules={[
            {
              required: true,
              message: 'Product Name is required',
            },
          ]}
          >
            <Select onChange={handleProductChange} >
              {dataProduct &&
                dataProduct.map((u) => (
                  <Select.Option key={u.ProductId} value={u.ProductId}>
                    <Typography.Text>
                      {u.ProductName}
                    </Typography.Text>
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="Quantity"
            label="Quantity"
            rules={[
              {
                required: true,
                message: 'Quantity is required',
              },
            ]}
          
          >
           <Input type="number" max={dataquantity} />
          </Form.Item>

         

          <Form.Item label=" ">
            <Button type="primary"
             htmlType="submit"
         
            >
              Submit
            </Button>

            <Button
              onClick={() => navigate('/outputStorage')}
              style={{ marginLeft: '5px' }}>
              Cancel
            </Button>
          </Form.Item>

        </Form>
      </div>
    </>
  )
}

export default AddOutputStorage