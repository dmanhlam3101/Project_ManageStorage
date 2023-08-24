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
import { useNavigate, useParams } from 'react-router-dom';
import { addListSupplier, getListSupplier } from '../../services/supplierService';
import { addUser, editUser, getUserById } from '../../services/userService';
function EditUser() {
    const [form] = Form.useForm();
    const params = useParams();
    const id = params.userId;
    const [user, setUser] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {

        getUserById(id)
          .then((res) => {
            setUser(res.data[0])
          })
          .catch((err) => {
            message.error(err.message);
          });
      }, [id]);
    const onFinish = (values) => {
        const data = {
            userId: user.userId,
            displayName: values.DisplayName,
            username: values.username,
            password: values.password,
            role: values.role,
            status: user.status,
        };

        editUser(data)
            .then(() => {
                message.success('Edit user successfully');
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
                    fields={[
                        {
                          name: 'DisplayName',
                          value: user?.displayName,
                        
                        },
                        {
                          name: 'username',
                          value: user?.username
                        },
                        {
                          name: 'password',
                          value: user?.password
                        },
                        {
                          name: 'role',
                          value: user?.role
                        },

                     
                      ]}
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

export default EditUser