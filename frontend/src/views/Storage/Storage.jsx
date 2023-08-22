import React, { useCallback, useState, useEffect } from 'react';
import { Drawer, Modal, Table, message, Button, Space } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { getListStorage, getSupllierStorage, deleteProduct } from '../../services/storageService';
import { useNavigate } from 'react-router-dom';
import Search from 'antd/es/input/Search';
function Storage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [dataSuplier, setDataSuplier] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const getData = useCallback(() => {
    //setLoading(true);
    getListStorage()
      .then((res) => {
        //const listAsssignmentId = res.data.assignmentIdReq;
        //setList(listAsssignmentId);
        const convertedData = res.data.map((data) => {
          const {
            productId,
            productName,
            quantity,
            unitName,
          } = data;

          return {
            key: productId,
            productId,
            productName,
            quantity,
            unitName,
          };
        });
        // Filter the data based on the search query
        const filteredData = convertedData.filter((data) =>
          data.productName.toLowerCase().includes(searchQuery.toLowerCase())
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
    getSupllierStorage(record.productId).then((res) => {
      const supplierData = res.data; // Assuming res.data is an object containing supplier data
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
      title: 'STT',
      dataIndex: 'productId',
      key: dataSource.productId,
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
      title: 'Product Name',
      dataIndex: 'productName',
      key: dataSource.productName,
      onCell: (record) => {
        return {
          onClick: () => {
            showDrawer(record);
          },
        };
      },
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: dataSource.quantity,
      sorter: {
        compare: (a, b) => a.quantity - b.quantity,
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
      title: 'Unit',
      dataIndex: 'unitName',
      key: dataSource.unitName,
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
              navigate(`/storage/editProduct/${record.productId}`)
            }} >
            <EditOutlined />
          </Button>


          <Button style={{ marginLeft: '10px' }} onClick={() => showModalDelete(record.productId)}>
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
  const [productDelete, setProductDelete] = useState(undefined);
  const handleOkDelete = () => {
    deleteProduct(productDelete)
      .then((res) => {
        message.success('Product is deleted successfully');
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
    setProductDelete(id);
    setIsModalDelete(true);
  };
  return (
    <>
      <div style={{ margin: '0px 10px' }}>

        <Space>
          <Search
            placeholder="Search by product name"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
        </Space>
        <Button style={{ float: 'right', marginBottom: '15px' }} type="primary" icon={<PlusOutlined />}
          onClick={() => navigate(`/storage/addProduct`)}
        >
          Add Product
        </Button>

        {dataSuplier && (

          <div>
            <Drawer title={"Suplier of " + dataSuplier.productName} placement="right" onClose={onClose} open={open}>
              <p>Supplier Name: {dataSuplier.displayName}</p>
              <p>Address: {dataSuplier.address}</p>
              <p>Phone: {dataSuplier.phone}</p>
              <p>Email: {dataSuplier.email}</p>
              <p>More Info: {dataSuplier.moreInfo}</p>
              <p>Contract Date: {new Date(dataSuplier.contractDate).toLocaleDateString()}</p>
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
        <p>Do you want to delete this product?</p>
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

export default Storage;
