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
import { getProduct } from '../../services/storageService';
import { addInputStorage } from '../../services/inputStorageService';

function AddInputStorage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const currentDate = new Date();
  const[dataProduct,setdataProduct] = useState([])
  const onFinish = (values) => {
    const data = {
      ProductId: values.ProductName,
      Quantity: values.Quantity,
      InputPrice: values.InputPrice,
      OutputPrice: values.OutputPrice,
      DateInput: currentDate.toISOString(),
      Status: true,
    };
    addInputStorage(data)
    	.then(() => {
    		message.success('Input Storage successfully');
    		navigate('/inputStorage');
    	})
    	.catch((err) => {
    		message.error(err.message);
    	});
  };
  useEffect(() => {
    getProduct()
      .then((res) => {
        setdataProduct(res.data)
      })
      .catch((err) => {
        message.error(err.message);
      });

      

  }, []);
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
          name="ProductName" 
          label="Product"
          rules={[
            {
              required: true,
              message: 'Product Name is required',
            },
          ]}
          >
            <Select >
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
           <Input />
          </Form.Item>

          <Form.Item
            name="InputPrice"
            label="InputPrice"
            rules={[
              {
                required: true,
                message: 'InputPrice is required',
              },
            ]}
          >
              <Input />
          </Form.Item>

          <Form.Item
            name="OutputPrice"
            label="OutputPrice"
            rules={[
              {
                required: true,
                message: 'OutputPrice is required',
              },
            ]}
          >
              <Input />
          </Form.Item>
          

          <Form.Item label=" ">
            <Button type="primary"
             htmlType="submit"
         
            >
              Submit
            </Button>

            <Button
              onClick={() => navigate('/inputStorage')}
              style={{ marginLeft: '5px' }}>
              Cancel
            </Button>
          </Form.Item>

        </Form>
      </div>
    </>
  )
}

export default AddInputStorage