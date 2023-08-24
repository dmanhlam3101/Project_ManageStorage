import React, { useCallback, useState, useEffect } from 'react';
import { Drawer, Modal, Table, message, Button, Space, Input } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { getListStorage, getSupllierStorage, deleteProduct } from '../../services/storageService';
import { useNavigate } from 'react-router-dom';
import Search from 'antd/es/input/Search';
import { deleteListSupplier, getListSupplier, getListSupplierById } from '../../services/supplierService';
function Supplier() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [dataSuplier, setDataSuplier] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const getData = useCallback(() => {
    //setLoading(true);
    getListSupplier()
      .then((res) => {
        console.log(res.data)
        const convertedData = res.data.map((data) => {
          const {
            SupplierId,
            DisplayName,
            Address,
            ContractDate,
            Email,
            Phone
          } = data;

          return {
            key: SupplierId,
            SupplierId,
            DisplayName,
            Address,
            Phone,
            Email,
            ContractDate
          };
        });
        // Filter the data based on the search query
        const filteredData = convertedData.filter((data) =>
          data.DisplayName.toLowerCase().includes(searchQuery.toLowerCase())
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
    getListSupplierById(record.SupplierId).then((res) => {
      const supplierData = res.data[0]; // Assuming res.data is an object containing supplier data
      setDataSuplier(supplierData);
      console.log(dataSuplier)
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
      title: 'No.',
      dataIndex: 'SupplierId',
      key: dataSource.SupplierId,
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
      title: 'Display Name',
      dataIndex: 'DisplayName',
      key: dataSource.DisplayName,
      sorter: {
        compare: (a, b) => a.DisplayName.localeCompare(b.DisplayName), // Use localeCompare for string comparison
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
      title: 'Email',
      dataIndex: 'Email',
      key: dataSource.Email,
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
              navigate(`/supplier/edit/${record.SupplierId}`)
            }} >
            <EditOutlined />
          </Button>


          <Button style={{ marginLeft: '10px' }} danger onClick={() => showModalDelete(record.SupplierId)}>
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
  const [supplierDelete, setSupplierDelete] = useState(undefined);
  const handleOkDelete = () => {
    deleteListSupplier(supplierDelete)
      .then((res) => {
        message.success('Supplier is deleted successfully');
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
    setSupplierDelete(id);
    setIsModalDelete(true);
  };
  return (
    <>
      <div style={{ margin: '0px 10px' }}>

        <Space>
          <Input
            placeholder="Search by supplier name"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
        </Space>
        <Button style={{ float: 'right', marginBottom: '15px' }} type="primary" icon={<PlusOutlined />}
          onClick={() => navigate(`/supplier/add`)}
        >
          Add Supplier
        </Button>

        {dataSuplier && (

          <div>
            <Drawer title="Details" placement="right" onClose={onClose} open={open}>
              <p>Supplier Name: {dataSuplier.DisplayName}</p>
              <p>Address: {dataSuplier.Address}</p>
              <p>Phone: {dataSuplier.Phone}</p>
              <p>Email: {dataSuplier.Email}</p>
              <p>More Info: {dataSuplier.MoreInfo}</p>
              <p>Contract Date: {new Date(dataSuplier.ContractDate).toLocaleDateString()}</p>
              
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
        <p>Do you want to delete this supplier?</p>
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

export default Supplier;
