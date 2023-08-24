import React, { useCallback, useEffect, useState } from 'react';
import { Drawer, Modal, Table, message, Button, Space, Input, DatePicker, Select, Typography } from 'antd';
import { deleteOutputStorage, getListOutputStorage, getListOutputStorageById } from '../../services/outputStorage';
import { getListCustomer } from '../../services/customerService';
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Option } from 'antd/es/mentions';
function OutputStorage() {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([])
  const [dataCustomer, setdataCustomer] = useState([])
  const [dataInput, setInputStorage] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState(null);
  const [customer, setCustomer] = useState(null);
  const getData = useCallback(() => {
    getListOutputStorage()
      .then((res) => {

        const convertedData = res.data.map((data) => {
          const {
            OutputId,
            ProductId,
            Quantity,
            DateOutput,
            InputPrice,
            OutputPrice,
            Product,
            Customer
          } = data;
          return {
            key: OutputId,
            ProductId,
            OutputId,
            ProductName: `${Product?.ProductName}`,
            CustomerName: `${Customer?.DisplayName}`,
            Quantity,
            DateOutput: `${new Date(DateOutput).toISOString().split('T')[0]}`,
            InputPrice,
            OutputPrice
          }
        });
        const filteredData = convertedData.filter((data) => {
          const isMatchingProduct = data.ProductName.toLowerCase().includes(searchQuery.toLowerCase());

          const isMatchingDate = !dateFilter || new Date(data.DateOutput).toISOString().split('T')[0] === dateFilter;
          const isSeclt = !customer || data.CustomerName.includes(customer);
          return isMatchingProduct && isMatchingDate & isSeclt;
        });

        setDataSource(filteredData);
      })
      .catch((error) => {
        message.error(error.message);

      });

    //setLoading(false);
  }, [searchQuery, dateFilter, customer]);
  useEffect(() => {
    getData();

    getListCustomer().then((res) => {
      setdataCustomer(res.data)
      console.log(res.data)
    }).catch((error) => {
      message.error(error.message);
    });
  }, [getData]);

  const [open, setOpen] = useState(false);
  const showDrawer = (record) => {
    getListOutputStorageById(record.OutputId).then((res) => {
      const InputData = res.data[0]; // Assuming res.data is an object containing supplier data
      setInputStorage(InputData);
      console.log(InputData)
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
      title: 'Customer Name',
      dataIndex: 'CustomerName',
      key: 'CustomerName',
      sorter: (a, b) => a.CustomerName.localeCompare(b.CustomerName),
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
      title: 'Output Date',
      dataIndex: 'DateOutput',
      key: 'DateOutput',
      sorter: (a, b) => new Date(a.DateOutput) - new Date(b.DateOutput),
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
        <span >
          <Button 
            onClick={() => {
              navigate(`/outputStorage/edit/${record.OutputId}`)
            }} >
            <EditOutlined />
          </Button>


          <Button style={{ marginLeft: '10px' }} danger onClick={() => showModalDelete(record.OutputId)}>
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
  const [outputStorageDelete, setOutputStorageDelete] = useState(undefined);
  const handleOkDelete = () => {
    deleteOutputStorage(outputStorageDelete)
      .then((res) => {
        message.success('Output is deleted successfully');
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
    setOutputStorageDelete(id);
    setIsModalDelete(true);
  };

  return (

    <>
      <Space style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <div style={{ width: '400px' }}>

          <DatePicker onChange={(date, dateString) => setDateFilter(dateString)} style={{ marginRight: '15px' }} />
          <Select
            style={{ width: '200px' }}
            placeholder="Select customer name"
            onChange={(selectedCustomer) => setCustomer(selectedCustomer)}
            optionLabelProp="label"
          >

            <Select.Option key="none" value={!customer} label="None">
              <Space>
                None
              </Space>
            </Select.Option>

            {/* Map through dataCustomer and create options */}
            {dataCustomer && dataCustomer.map((u) => (
              <Select.Option key={u.CustomerId} value={u.DisplayName} label={u.DisplayName}>
                <Space>
                  {u.DisplayName}
                </Space>
              </Select.Option>
            ))}
          </Select>
        </div>
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

            onClick={() => navigate(`/outputStorage/add`)}
          >
            Create new Output Storage
          </Button>
        </Space>
      </Space>

      {dataInput && (

        <div>
          <Drawer title={"Details "} placement="right" onClose={onClose} open={open}>
            <p>Product Name: {dataInput.Product?.ProductName}</p>
            <p>Quantity: {dataInput.Quantity}</p>
            <p>Unit: {dataInput.Product?.Unit?.UnitName}</p>
            <p>Output Date: {new Date(dataInput.DateOutput).toLocaleDateString()}</p>
            <p>Customer: {dataInput.Customer?.DisplayName}</p>
            <ul>
              <li>Address: {dataInput.Customer?.Address}</li>
              <li>Phone: {dataInput.Customer?.Phone}</li>
              <li>Email: {dataInput.Customer?.Email}</li>
              <li>More Infomation: {dataInput.Customer?.MoreInfo}</li>
              <li>Contract Date:{new Date(dataInput.Customer?.ContractDate).toLocaleDateString()} </li>
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
        <p>Do you want to delete this Output Storage?</p>
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

export default OutputStorage