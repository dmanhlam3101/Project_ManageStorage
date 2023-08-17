import React, { useCallback, useState, useEffect } from 'react';
import { Drawer, Radio, Space, Table, message, Button } from 'antd';

import { getListStorage, getSupllierStorage } from '../../services/storageService';

function Storage() {

  getListStorage().then(console.log)
  const [list, setList] = useState([]);
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
        setDataSource(convertedData);
        //setTotalElements(res.data.totalElements);
      })
      .catch((error) => {
        message.error(error.message);

      });

    //setLoading(false);
  }, []);
  useEffect(() => {
    getData();
  }, [getData]);

  const [open, setOpen] = useState(false);
  const showDrawer = (record) => {
    getSupllierStorage(record.productId) .then((res) => {
      const supplierData = res.data; // Assuming res.data is an object containing supplier data
      setDataSuplier(supplierData);
      setOpen(true);
    })
    .catch((error) => {
      message.error(error.message);
    });


  };
  const onClose = () => {
    setOpen(false);
  };


  let displayIdCounter = 1;
  const columns = [
    {
      title: 'ProductId',
      dataIndex: 'productId',
      key: dataSource.productId,
      render: () => displayIdCounter++,
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
      sorter: {
        compare: (a, b) => a.productName - b.productName,
        multiple: 3,
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
      sorter: {
        compare: (a, b) => a.unitName - b.unitName,
        multiple: 1,
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
      title: 'Action',
      dataIndex: '',
     
    },
  ];

  const onChangeTable = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <>

      
      <Drawer title={"Suplier of " +dataSuplier.productName} placement="right" onClose={onClose} open={open}>
      {dataSuplier && (
          <div>
           
            <p>Supplier Name: {dataSuplier.displayName}</p>
            <p>Address: {dataSuplier.address}</p>
            <p>Phone: {dataSuplier.phone}</p>
            <p>Email: {dataSuplier.email}</p>
            <p>More Info: {dataSuplier.moreInfo}</p>
            <p>Contract Date: {new Date(dataSuplier.contractDate).toLocaleDateString()}</p>
          </div>
        )}
      </Drawer>


      <Table columns={columns} dataSource={dataSource} onChange={onChangeTable} />;


    </>
  );
};

export default Storage;
