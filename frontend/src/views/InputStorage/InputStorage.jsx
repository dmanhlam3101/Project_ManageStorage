import React, { useCallback, useEffect, useState } from 'react';
import { Drawer, Modal, Table, message, Button, Space, DatePicker } from 'antd';
import { deleteInputStorage, getListInputStorage, getListInputStorageById } from '../../services/inputStorageService';
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Search from 'antd/es/input/Search';
import Input from 'antd/es/input/Input';
function InputStorage() {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([])
  const [dataInput, setInputStorage] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState(null);

  const getData = useCallback(() => {
    getListInputStorage()
      .then((res) => {

        const convertedData = res.data.map((data) => {
          const {
            InputId,
            ProductId,
            Quantity,
            DateInput,
            InputPrice,
            OutputPrice,
            Product,
          } = data;
          return {
            key: InputId,
            ProductId,
            InputId,
            ProductName: `${Product.ProductName}`,
            Quantity,
            DateInput: `${new Date(DateInput).toISOString().split('T')[0]}`,
            InputPrice,
            OutputPrice
          }
        });
        // Filter the data based on the search query
        const filteredData = convertedData.filter((data) => {
          const isMatchingProduct = data.ProductName.toLowerCase().includes(searchQuery.toLowerCase());
          
          const isMatchingDate = !dateFilter || new Date(data.DateInput).toISOString().split('T')[0] === dateFilter;

          return isMatchingProduct && isMatchingDate;
        });
  
       
        setDataSource(filteredData);


      })
      .catch((error) => {
        message.error(error.message);

      });

    //setLoading(false);
  }, [searchQuery,dateFilter]);
  useEffect(() => {
    getData();

  }, [getData]);

  const [open, setOpen] = useState(false);
  const showDrawer = (record) => {
    getListInputStorageById(record.InputId).then((res) => {
      const InputData = res.data[0]; // Assuming res.data is an object containing supplier data
      setInputStorage(InputData);
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
      dataIndex: 'InputId',
      key: dataSource.InputId,
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
      dataIndex: 'ProductName',
      key: 'ProductName',
      sorter: (a, b) => a.ProductName.localeCompare(b.ProductName),
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
      dataIndex: 'Quantity',
      key: 'Quantity',
      sorter: {
        compare: (a, b) => a.Quantity - b.Quantity,
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
      title: 'Input Date',
      dataIndex: 'DateInput',
      key: 'DateInput',
      sorter: (a, b) => new Date(a.DateInput) - new Date(b.DateInput),
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
              navigate(`/inputStorage/edit/${record.InputId}`)
            }} >
            <EditOutlined />
          </Button>


          <Button danger style={{ marginLeft: '10px' }} onClick={() => showModalDelete(record.InputId)}>
            <DeleteOutlined />
          </Button>


        </span>

      ),


    },
  ];


  const [currentPage, setCurrentPage] = useState(1);
  const paginationConfig = {
    current: currentPage, // Current page number
    pageSize: 5,   // Number of items per page
    total: dataSource.length, // Total number of items in the data source
    // Other pagination properties like showTotal, showSizeChanger, etc.
  };
  const onChange = (pagination, filters, sorter, extra) => {
    setCurrentPage(pagination.current);
  };

  //delete
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [inputStorageDelete, setInputStorageDelete] = useState(undefined);
  const handleOkDelete = () => {
    deleteInputStorage(inputStorageDelete)
      .then((res) => {
        message.success('Input is deleted successfully');
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
    setInputStorageDelete(id);
    setIsModalDelete(true);
  };
  return (

    <>

<Space  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',marginBottom:'15px' }}>
  <DatePicker onChange={(date, dateString) => setDateFilter(dateString)} />

  <Space>
    <Input
      placeholder="Search by product name"
      onChange={(e) => {
        setSearchQuery(e.target.value);
      }}
      value={searchQuery}
    />

    <Button
      type="primary"

      onClick={() => navigate(`/inputStorage/add`)}
    >
      Create new Input Storage
    </Button>
  </Space>
</Space>

      {dataInput && (

        <div>
          <Drawer title={"Details "} placement="right" onClose={onClose} open={open}>
            <p>Product Name: {dataInput.Product?.ProductName}</p>
            <p>Quantity: {dataInput.Quantity}</p>
            <p>Unit: {dataInput.Product?.Unit?.UnitName}</p>
            <p>Input Date: {new Date(dataInput.DateInput).toLocaleDateString()}</p>
            <p>Input Price: {dataInput.InputPrice}</p>
            <p>Output Price: {dataInput.OutputPrice}</p>
            <p>Supplier: {dataInput.Product?.Supplier?.DisplayName}</p>
            <ul>
              <li>Address: {dataInput.Product?.Supplier?.Address}</li>
              <li>Phone: {dataInput.Product?.Supplier?.Phone}</li>
              <li>Email: {dataInput.Product?.Supplier?.Email}</li>
              <li>More Infomation: {dataInput.Product?.Supplier?.MoreInfo}</li>
              <li>Contract Date:{new Date(dataInput.Product?.Supplier?.ContractDate).toLocaleDateString()} </li>
            </ul>
          </Drawer>
        </div>
      )}
      <Table columns={columns} dataSource={dataSource} onChange={onChange} pagination={paginationConfig} />

      <Modal
        title='Are you sure?'
        open={isModalDelete}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
        footer={null}
      >
        <p>Do you want to delete this Input Storage?</p>
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

export default InputStorage