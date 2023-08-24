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
import { getListCustomer } from '../../services/customerService';
import {  editOutputStorage, getListOutputStorageById } from '../../services/outputStorage';
import moment from 'moment';    

function EditOutputProduct() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const params = useParams();
    const id = params.OutputId;
    const [dataOutput, setdataOutput] = useState([])
    const [dataProduct, setdataProduct] = useState([])
    const [dataCustomer, setdataCustomer] = useState([])
    const onFinish = (values) => {
        const data = {
            OutputId: dataOutput.OutputId,
            CustomerId: values.CustomerName,
            ProductId: values.ProductName,
            Quantity: values.Quantity,
            DateOutput: values.DateOutput,
            Status: true,
        };
        editOutputStorage(data)
            .then(() => {
                message.success('Edit Output Storage successfully');
                navigate('/outputStorage');
            })
            .catch((err) => {
                message.error(err.message);
            });
    };
    useEffect(() => {
        getListOutputStorageById(id)
            .then((res) => {
                setdataOutput(res.data[0])
                console.log(res.data[0])
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

        getListCustomer()
            .then((res) => {
                setdataCustomer(res.data)
            })
            .catch((err) => {
                message.error(err.message);
            });

    }, [id]);
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
                          name: 'CustomerName',
                         value: dataOutput?.Customer?.CustomerId,
                        
                        },
                        {
                          name: 'ProductName',
                          value: dataOutput?.Product?.ProductId,
                        },
                        {
                          name: 'Quantity',
                         value: dataOutput?.Quantity,
                        },
                        {
                          name: 'DateOutput',
                          value: moment(dataOutput?.DateOutput),
                        },
                      ]}
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
                        name="DateOutput"
                        label="Date Output"
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

export default EditOutputProduct