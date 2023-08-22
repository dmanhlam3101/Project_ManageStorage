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
import {addCustomer} from '../../services/customerService';

function AddCustomer() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = (values) => {
    const data = {
      DisplayName: values.CustomerName,
      Address: values.Address,
      Phone: values.Phone,
      Email: values.Email,
      MoreInfo: values.MoreInfo,
      ContractDate: values.ContractDate.format('YYYY-MM-DD'),
      Status: true,
    };
    console.log(data)
    addCustomer(data)
    	.then(() => {
    		message.success('Customer is added successfully');
    		navigate('/customer');
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
              message: 'Customer Name is required',
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
           <Input />
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
              <Input />
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
              <Input />
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
              onClick={() => navigate('/customer')}
              style={{ marginLeft: '5px' }}>
              Cancel
            </Button>
          </Form.Item>

        </Form>
      </div>
    </>
  )
}

export default AddCustomer