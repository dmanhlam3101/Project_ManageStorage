import React, { useEffect, useState, useCallback } from 'react';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  message,
  TreeSelect,
  Typography
} from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, editProduct } from '../../services/storageService';
import { getListUnit } from '../../services/unitService';
import { getListSupplier } from '../../services/supplierService';
function EditProduct() {
  const [form] = Form.useForm();
  const params = useParams();
  const id = params.productId;
  const [product, setProduct] = useState(undefined);
  const [unit, setUnit] = useState(undefined);
  const [supplier, setSupplier] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    getProductById(id)
      .then((res) => {
        setProduct(res.data)
      })
      .catch((err) => {
        message.error(err.message);
      });


    getListUnit()
      .then((res) => {
        setUnit(res.data)
      })
      .catch((err) => {
        message.error(err.message);
      });


    getListSupplier()
      .then((res) => {
        setSupplier(res.data)
      })
      .catch((err) => {
        message.error(err.message);
      });
  }, [id]);

  const onFinish = (values) => {
    const data = {
      productId: product.productId,
      productName: values.productName,
      unitId: values.unit,
      supplierId: values.supplier,
      status: product.status,
    };
    editProduct(data)
    	.then(() => {
    		message.success('Product is edited successfully');
    		navigate('/storage');
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
            maxWidth: 600,
            margin: '50px 350px'
          }}
          fields={[
            {
              name: 'productName',
              value: product?.productName,
            
            },
            {
              name: 'unit',
              value: product?.unit.unitId
            },
            {
              name: 'supplier',
              value: product?.supplier.supplierId
            },
          ]}
        >


          <Form.Item name="productName" label="Product Name">
            <Input />
          </Form.Item>
          <Form.Item
            name="unit"
            label="Unit"

          >
            <Select >
              {unit &&
                unit.map((u) => (
                  <Select.Option key={u.unitId} value={u.unitId}>
                    <Typography.Text>
                      {u.unitName}
                    </Typography.Text>
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="supplier"
            label="Supplier"
            rules={[
              {
                required: true,
                message: 'Supplier is required',
              },
            ]}
          >
            <Select>
              {supplier &&
                supplier.map((s) => (
                  <Select.Option key={s.supplierId} value={s.supplierId}>
                    <Typography.Text>
                      {s.displayName}
                    </Typography.Text>
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>


          <Form.Item label=" ">
            <Button type="primary"
             htmlType="submit"
         
            >
              Submit
            </Button>

            <Button
              onClick={() => navigate('/storage')}
              style={{ marginLeft: '5px' }}>
              Cancel
            </Button>
          </Form.Item>

        </Form>
      </div>
    </>
  )
}

export default EditProduct