import React, { useEffect, useState } from 'react';
import {
    Button,
    Form,
    Input,
    Select,
    message,
    Typography,
    DatePicker,
    Space
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { addListSupplier, getListSupplier } from '../../services/supplierService';
import { addUser } from '../../services/userService';
function AddUser() {
    const [form] = Form.useForm();

    const [unit, setUnit] = useState(undefined);
    const [user, setUser] = useState(undefined);
    const navigate = useNavigate();


    const onFinish = (values) => {
        const data = {
            displayName: values.DisplayName,
            username: values.username,
            password: values.password,
            role: values.role,
            status: true,
        };

        addUser(data)
            .then(() => {
                message.success('Add user successfully');
                navigate('/user');
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
                        label="Name"

                        rules={[
                            {
                                required: true,
                                message: ' Name is required',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[
                            {
                                required: true,
                                message: 'Username is required',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Password is required',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="role"
                        label="Role"
                        rules={[
                            {
                                required: true,
                               
                            },
                        ]}
                    >
                        <Select>

                            <Select.Option key='admin' value='admin' >
                                <Space>
                                    Admin
                                </Space>
                            </Select.Option>
                            <Select.Option key='user' value='staff'>
                                <Space>
                                    Staff
                                </Space>
                            </Select.Option>
                        </Select>

                    </Form.Item>


                    <Form.Item label=" ">
                        <Button type="primary"
                            htmlType="submit"

                        >
                            Submit
                        </Button>

                        <Button
                            onClick={() => navigate('/user')}
                            style={{ marginLeft: '5px' }}>
                            Cancel
                        </Button>
                    </Form.Item>

                </Form >
            </div >
        </>
    )
}

export default AddUser