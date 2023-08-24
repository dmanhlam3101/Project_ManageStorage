import React, { useCallback, useState, useEffect } from 'react';
import { Drawer, Modal, Table, message, Button, Space, Input } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,EyeOutlined, EyeInvisibleOutlined
} from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';

import { deleteUser, getListUser, getUserById } from '../../services/userService';
function User() {
  const navigate = useNavigate();

  const [showPasswords, setShowPasswords] = useState(false); // State to control password visibility

  const togglePasswordVisibility = () => {
    setShowPasswords(!showPasswords);
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [dataUser, setDataUser] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const getData = useCallback(() => {
    //setLoading(true);
    getListUser()
      .then((res) => {
        console.log(res.data)
        //const listAsssignmentId = res.data.assignmentIdReq;
        //setList(listAsssignmentId);
        const convertedData = res.data.map((data) => {
          const {
            userId,
            displayName,
            username,
            password,
            role,
          } = data;

          return {
            key: userId,
            userId,
            displayName,
            username,
            password,
            role,
          };
        });
       
        // Filter the data based on the search query
        const filteredData = convertedData.filter((data) =>
          data.displayName.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setDataSource(filteredData);
        //setTotalElements(res.data.totalElements);
      })
      .catch((error) => {
        message.error(error.message);

      });

    //setLoading(false);
  }, [searchQuery]);
  useEffect(() => {
    getData();
  }, [getData]);
  const [open, setOpen] = useState(false);
  const showDrawer = (record) => {
    getUserById(record.userId).then((res) => {
      const supplierData = res.data[0]; // Assuming res.data is an object containing supplier data
      setDataUser(supplierData);
      setOpen(true);
    })
      .catch((error) => {
        message.error(error.message);
      });


  };

  const onClose = () => {
    setOpen(false);
  };



  const columns = [
    {
      title: 'STT',
      dataIndex: 'userId',
      key: dataSource.userId,
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
      title: 'Name',
      dataIndex: 'displayName',
      key: dataSource.displayName,
      onCell: (record) => {
        return {
          onClick: () => {
            showDrawer(record);
          },
        };
      },
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: dataSource.username,
      sorter: {
        compare: (a, b) => a.username.localeCompare(b.username), 
        multiple: 2,
      },
      onCell: (record) => {
        return {
          onClick: () => {
            showDrawer(record);
          },
        };
      },
    },
    {
        title: 'Password',
        dataIndex: 'password',
        key: dataSource.password,
        render: (password, record) => (
            <span>
              {showPasswords ? password : '*****'}{' '}
              {showPasswords ? (
                <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
              ) : (
                <EyeOutlined onClick={togglePasswordVisibility} />
              )}
            </span>
          ),
      },
  
    
    {
      title: 'Role',
      dataIndex: 'role',
      key: dataSource.role,
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
              navigate(`/user/edit/${record.userId}`)
            }} >
            <EditOutlined />
          </Button>


          <Button style={{ marginLeft: '10px' }} danger onClick={() => showModalDelete(record.userId)}>
            <DeleteOutlined />
          </Button>


        </span>

      ),


    },
  ];

  const onChangeTable = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
    setCurrentPage(pagination.current);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const paginationConfig = {
    current: currentPage, // Current page number
    pageSize: 5,   // Number of items per page
    total: dataSource.length, // Total number of items in the data source
    // Other pagination properties like showTotal, showSizeChanger, etc.
  };


  //delete
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [userDelete, setUserDelete] = useState(undefined);
  const handleOkDelete = () => {
    deleteUser(userDelete)
      .then((res) => {
        message.success('User is deleted successfully');
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
    setUserDelete(id);
    setIsModalDelete(true);
  };
  return (
    <>
      <div style={{ margin: '0px 10px' }}>

        <Space>
          <Input
            placeholder="Search by user name"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
        </Space>
        <Button style={{ float: 'right', marginBottom: '15px' }} type="primary" icon={<PlusOutlined />}
          onClick={() => navigate(`/user/add`)}
        >
          Add User
        </Button>

        {dataUser && (

          <div>
            <Drawer title={"Details of " + dataUser.displayName} placement="right" onClose={onClose} open={open}>
              <p>Customer Name: {dataUser.displayName}</p>
              <p>Username: {dataUser.username}</p>
              <p>Phone: {dataUser.password}</p>
              <p>Role: {dataUser.role}</p>
              
            </Drawer>
          </div>
        )}


        <Table columns={columns} dataSource={dataSource} onChange={onChangeTable} pagination={paginationConfig} />

      </div>

      <Modal
        title='Are you sure?'
        open={isModalDelete}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
        footer={null}
      >
        <p>Do you want to delete this user?</p>
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
  );
};

export default User;
