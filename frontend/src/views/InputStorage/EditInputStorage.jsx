import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Input,
  Select,
  message,
  Typography,
  DatePicker
} from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../../services/storageService';
import {editInputStorageById, getListInputStorageById } from '../../services/inputStorageService';
import moment from 'moment';
function EditInputStorage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.InputId;
  const[dataProduct,setdataProduct] = useState([])
  const[dataInput,setInput] = useState([])
  const onFinish = (values) => {
    const data = {
        InputId:  dataInput.InputId,
      ProductId: values.ProductName,
      Quantity: values.Quantity,
      InputPrice: values.InputPrice,
      OutputPrice: values.OutputPrice,
      DateInput: values.DateInput,
      Status: true,
    };

    editInputStorageById(data)
    	.then(() => {
    		message.success('Edit Input Storage successfully');
    		navigate('/inputStorage');
    	})
    	.catch((err) => {
    		message.error(err.message);
    	});
  };
  useEffect(() => {

    getListInputStorageById(id)
    .then((res) => {
      setInput(res.data[0])
    })
    .catch((err) => {
      message.error(err.message);
    });
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
          fields={[
            {
              name: 'ProductName',
              value: dataInput?.Product?.ProductName,
            
            },
            {
              name: 'Quantity',
              value: dataInput?.Quantity,
            },
            {
              name: 'InputPrice',
              value: dataInput?.InputPrice,
            },
            {
              name: 'OutputPrice',
              value: dataInput?.OutputPrice,
            },
            {
              name: 'DateInput',
              value: moment(dataInput?.DateInput),
            },
          ]}
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
                message: 'Input Price is required',
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
                message: 'Output Price is required',
              },
            ]}
          >
              <Input />
          </Form.Item>
          <Form.Item
            name="DateInput"
            label="Date Input"
            rules={[
              {
                required: true,
                message: 'Date Input date is required',
              },
            ]}
          >
             <DatePicker
						inputReadOnly={true}
						format='YYYY-MM-DD'
					/>
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

export default EditInputStorage