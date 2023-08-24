import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Input,
  message,
  DatePicker
} from 'antd';
import {  useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { editListSupplier, getListSupplierById } from '../../services/supplierService';
function EditSupplier() {
  const [form] = Form.useForm();
  const params = useParams();
  const id = params.SupplierId;
  
  const [supplier, setSupplier] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
  


    getListSupplierById(id)
      .then((res) => {
        setSupplier(res.data[0])
      })
      .catch((err) => {
        message.error(err.message);
      });
  }, [id]);

  const onFinish = (values) => {
    const data = {
        SupplierId:supplier.SupplierId,
        DisplayName: values.DisplayName,
        Address: values.Address,
        Phone: values.Phone,
        Email: values.Email,
        MoreInfo: values.MoreInfo,
        ContractDate: values.ContractDate.format('YYYY-MM-DD'),
        status: supplier.Status,
      };
     
   
    editListSupplier(data)
    	.then(() => {
    		message.success('Edit supplier successfully');
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
            maxWidth
            : 800,
            margin: '50px 280px'
          }}
          fields={[
            {
              name: 'DisplayName',
              value: supplier?.DisplayName,
            
            },
            {
              name: 'Address',
              value: supplier?.Address
            },
            {
              name: 'Phone',
              value: supplier?.Phone
            },
            {
              name: 'Email',
              value: supplier?.Email
            },
            {
              name: 'MoreInfo',
              value: supplier?.MoreInfo
            },
            {
              name: 'ContractDate',
              value: moment(supplier?.ContractDate)
            },
         
          ]}
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

export default EditSupplier