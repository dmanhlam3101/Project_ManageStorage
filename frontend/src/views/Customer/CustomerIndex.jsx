import React, { useCallback, useEffect, useState } from 'react'
import { Drawer, Modal, Table, Button, Space ,message, Input} from 'antd';
import { getListCustomer, getListCustomerById, deleteCustomer } from '../../services/customerService';
import { useNavigate } from 'react-router-dom';
import {
    EditOutlined,
    DeleteOutlined,
    UserAddOutlined
} from '@ant-design/icons';
function CustomerIndex() {
    const [dataSource, setDataSource] = useState([]);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [dataCustomer, setDataCustomer] = useState(null);

    const getData = useCallback(() => {
        getListCustomer()
            .then((res) => {
                const convertedData = res.data.map((data) => {
                    const {
                        CustomerId,
                        DisplayName,
                        Address,
                        Phone,
                    } = data;

                    return {
                        key: CustomerId,
                        CustomerId,
                        CustomerName: `${DisplayName}`,
                        Address,
                        Phone,
                    };
                });
                // Filter the data based on the search query
                const filteredData = convertedData.filter((data) =>
                    data.CustomerName.toLowerCase().includes(searchQuery.toLowerCase())
                );

                setDataSource(filteredData);
            })
            .catch((error) => {
                message.error(error.message);

            });
    }, [searchQuery]);
    useEffect(() => {
        getData();
    }, [getData]);

    const [open, setOpen] = useState(false);
    const showDrawer = (record) => {
        getListCustomerById(record.CustomerId).then((res) => {
            const customerData = res.data; // Assuming res.data is an object containing supplier data
            setDataCustomer(customerData);
            console.log(dataCustomer)
            setOpen(true);
        })
            .catch((error) => {
                message.error(error.message);
            });


    };
    const onClose = () => {
        setOpen(false);
    };
    //delete
    const [isModalDelete, setIsModalDelete] = useState(false);
    const [customerDelete, setCustomerDelete] = useState(undefined);
    const handleOkDelete = () => {
        deleteCustomer(customerDelete)
            .then((res) => {
                message.success('Customer is deleted successfully');
                setIsModalDelete(false);
                getData();
            })
            .catch((err) => {
                message.error(err.message);
            });
    };

    const handleCancelDelete = () => {
        setIsModalDelete(false);
    };

    const showModalDelete = (id) => {
        setCustomerDelete(id);
        setIsModalDelete(true);
    };
    const columns = [
        {
            title: 'STT',
            dataIndex: 'CustomerId',
            key: dataSource.CustomerId,
            // render: () => displayIdCounter++,
            render: (_, record, index) => (currentPage - 1) * 5 + index + 1,
            onCell: (record) => {
                return {
                    onClick: () => {
                        showDrawer(record);
                    },
                };
            },
        },
        {
            title: 'Customer Name',
            dataIndex: 'CustomerName',
            key: dataSource.CustomerName,
            sorter: (a, b) => a.CustomerName.localeCompare(b.CustomerName),
            multiple: 3,
            onCell: (record) => {
                return {
                    onClick: () => {
                        showDrawer(record);
                    },
                };
            },
        },
        {
            title: 'Address',
            dataIndex: 'Address',
            key: dataSource.Address,
            onCell: (record) => {
                return {
                    onClick: () => {
                        showDrawer(record);
                    },
                };
            },
        },
        {
            title: 'Phone',
            dataIndex: 'Phone',
            key: dataSource.Phone,
            onCell: (record) => {
                return {
                    onClick: () => {
                        showDrawer(record);
                    },
                };
            },
        },
        {
            title: 'Action',
            dataIndex: '',
            width: '200px',
            render: (_, record) => (
                <span>
                    <Button
                        onClick={() => {
                            navigate(`/customer/editCustomer/${record.CustomerId}`)
                        }} >
                        <EditOutlined />
                    </Button>


                    <Button style={{ marginLeft: '10px' }} danger onClick={() => showModalDelete(record.CustomerId)} >
                        <DeleteOutlined  />
                    </Button>


                </span>

            ),


        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        setCurrentPage(pagination.current);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const paginationConfig = {
        current: currentPage, // Current page number
        pageSize: 5,   // Number of items per page
        total: dataSource.length, // Total number of items in the data source
        // Other pagination properties like showTotal, showSizeChanger, etc.
    };
    return (
        <>
            <div style={{ margin: '0px 10px' }}>

                <Space>
                    <Input
                        placeholder="Search by customer name"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                    />
                </Space>

                <Button style={{ float: 'right', marginBottom: '15px' }} type="primary" icon={<UserAddOutlined />}
                    onClick={() => navigate(`/customer/addCustomer`)}
                >
                    Add Customer
                </Button>

                {dataCustomer && (
                    <div>
                        <Drawer
                            key={dataCustomer[0].CustomerId}  // Access the customer object using index 0
                            title={"Information of " + dataCustomer[0].DisplayName}
                            placement="right"
                            onClose={onClose}
                            open={open}  // Use the "visible" prop to control the drawer visibility
                        >
                            <p>Customer Name: {dataCustomer[0].DisplayName}</p>
                            <p>Address: {dataCustomer[0].Address}</p>
                            <p>Phone: {dataCustomer[0].Phone}</p>
                            <p>Email: {dataCustomer[0].Email}</p>
                            <p>More Info: {dataCustomer[0].MoreInfo}</p>
                            <p>Contract Date: {new Date(dataCustomer[0].ContractDate).toLocaleDateString()}</p>
                        </Drawer>
                    </div>
                )}


                <Table columns={columns} dataSource={dataSource} onChange={onChange} pagination={paginationConfig} />
            </div>
            <Modal
                title='Are you sure?'
                open={isModalDelete}
                onOk={handleOkDelete}
                onCancel={handleCancelDelete}
                footer={null}
            >
                <p>Do you want to delete this customer?</p>
                <Button
                    type="primary"
                    key='back'
                    onClick={handleOkDelete}
                >
                    Delete
                </Button>

                <Button
                    className='button-modal'
                    key='submit'
                    style={{ marginLeft: '10px' }}
                    type='default' // Set the type to "default" or "primary" or "ghost"
                    onClick={handleCancelDelete}
                >
                    Cancel
                </Button>
            </Modal>
        </>
    )
}

export default CustomerIndex