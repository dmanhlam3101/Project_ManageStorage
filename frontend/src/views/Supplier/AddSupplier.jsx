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
import {  useNavigate } from 'react-router-dom';
import { addProduct } from '../../services/storageService';
import { getListUnit } from '../../services/unitService';
import { addListSupplier, getListSupplier } from '../../services/supplierService';
function AddSupplier() {
  const [form] = Form.useForm();
 
  const [unit, setUnit] = useState(undefined);
  const [supplier, setSupplier] = useState(undefined);
  const navigate = useNavigate();


  const onFinish = (values) => {
    const data = {
      DisplayName: values.DisplayName,
      Address: values.Address,
      Phone: values.Phone,
      Email: values.Email,
      MoreInfo: values.MoreInfo,
      ContractDate: values.ContractDate,
      status: true,
    };
   
    addListSupplier(data)
    	.then(() => {
    		message.success('Add supplier successfully');
    		navigate('/supplier');
    	})
    	.catch((err) => {
    		message.error(err.message);
    	});
  };

  return (
    <>
      <div className='container-fluid' style={{ display: 'contents' }}>

        <Form
          form={form}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          onFinish={onFinish}

          colon={false}

          style={{
            maxWidth: 800,
            margin: '50px 280px'
          }}
        >


          <Form.Item
           name="DisplayName"
           label="Supplier Name"
           
           rules={[
            {
              required: true,
              message: 'Supplier Name is required',
            },
          ]}
           >
            <Input />
          </Form.Item>
          <Form.Item
            name="Address"
            label="Address"
            rules={[
                {
                  required: true,
                  message: 'Address is required',
                },
              ]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            name="Phone"
            label="Phone"
            rules={[
              {
                required: true,
                message: 'Phone is required',
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="Email"
            label="Email"
            rules={[
              {
                required: true,
                message: 'Email is required',
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="MoreInfo"
            label="More Info"
         
          >
             	<Input.TextArea
						placeholder='Note'
						showCount
						maxLength={255}
					/>
          </Form.Item>
          
          <Form.Item
            name="ContractDate"
            label="Contract Date"
            rules={[
              {
                required: true,
                message: 'Contract date is required',
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
              onClick={() => navigate('/supplier')}
              style={{ marginLeft: '5px' }}>
              Cancel
            </Button>
          </Form.Item>

        </Form>
      </div>
    </>
  )
}

export default AddSupplier