import React, { useEffect } from 'react'
import { useState } from "react";

import {
    Card,
    Col,
    Row,
    Typography,
    Avatar,
    List,
    message,
} from "antd";
import {
    ExclamationOutlined,
    PlusOutlined,
    MinusOutlined,
} from "@ant-design/icons";
import { getListInputStorageTransaction } from '../../services/inputStorageService';
import { getListOutputStorageTransaction } from '../../services/outputStorage';
function DashBoard() {
    const { Title, Text } = Typography;

    const [dataTransaction, setdataTransaction] = useState([])
    const [dataTransactionOutput, setdataTransactionOutput] = useState([])
    const totalSumOutput = dataTransactionOutput.map(item => item.priceOutputTransaction).reduce((acc, price) => acc + price, 0);
    const totalSumInput = dataTransaction.map(item => item.priceTransaction).reduce((acc, price) => acc + price, 0);
    useEffect(() => {


        getListInputStorageTransaction()
            .then((res) => {
                setdataTransaction(res.data)
            })
            .catch((err) => {
                message.error(err.message);
            });
        getListOutputStorageTransaction()
            .then((res) => {
                setdataTransactionOutput(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                message.error(err.message);
            });



    }, []);

    const count = [
        {
            today: "Today’s Sales",
            title: "$53,000",
            persent: "+30%",

            bnb: "bnb2",
        },
        {
            today: "Today’s Users",
            title: "3,200",
            persent: "+20%",

            bnb: "bnb2",
        },
        {
            today: "Total Input Transactions",
            title: "$"+ totalSumInput,
            persent: "+30%",
            icon:<MinusOutlined />,
            bnb: "bnb2",
        },
        {
            today: "Total Output Transactions",
            title: "$"+totalSumOutput,
            persent: "+20%",
            icon:<PlusOutlined />,
            bnb: "bnb2",
        },

    ];
    const timelineList = [
        {
            title: "$2,400 - Redesign store",
            time: "09 JUN 7:20 PM",
            color: "green",
        },
        {
            title: "New order #3654323",
            time: "08 JUN 12:20 PM",
            color: "green",
        },

    ];
    //billing
    const calender = [
        <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            key={0}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 2C5.44772 2 5 2.44772 5 3V4H4C2.89543 4 2 4.89543 2 6V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V6C18 4.89543 17.1046 4 16 4H15V3C15 2.44772 14.5523 2 14 2C13.4477 2 13 2.44772 13 3V4H7V3C7 2.44772 6.55228 2 6 2ZM6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H14C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7H6Z"
                fill="#111827"
                className="fill-muted"
            ></path>
        </svg>,
    ];
    const mins = [
        <svg
            width="10"
            height="10"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            key={0}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 10C5 9.44772 5.44772 9 6 9L14 9C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11L6 11C5.44772 11 5 10.5523 5 10Z"
                className="fill-danger"
            ></path>
        </svg>,
    ];



    
    return (
        <>
            <div className="layout-content" style={{ maxHeight: '100vh', overflow: 'auto' }}>

                <Row gutter={[24, 0]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
                        <Row gutter={[24, 0]}>

                            <Row className="rowgap-vbox" gutter={[24, 0]}>
                                {count.map((c, index) => (
                                    <Col
                                        style={{ marginBottom: '15px' } }
                                    >
                                        <Card bordered={false} className="criclebox ">
                                            <div className="number">
                                                <Row align="middle" gutter={[24, 0]}>
                                                    <Col xs={18}>
                                                        <span>{c.today}</span>
                                                        <Title level={3}>
                                                            {c.title} <small className={c.bnb}>{c.persent}</small>
                                                        </Title>
                                                    </Col>
                                                    <Col xs={6}>
                                                        <div className="icon-box">{c.icon}</div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Card>
                                    </Col>
                                ))}

                            </Row>
                        </Row>

                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
                        <Card
                            bordered={false}
                            bodyStyle={{ paddingTop: 0 }}
                            className="header-solid h-full  ant-list-yes transactions-card"
                            title={<h6 className="font-semibold m-0">Your Transactions</h6>}
                            extra={
                                <p className="card-header-date ">
                                    {calender}
                                    <span>23 - 30 August 2023</span>
                                </p>
                            }
                            style={{ height: '500px', overflow: 'auto' }}
                        >
                            <List
                                header={<h6>Output</h6>}
                                className="transactions-list ant-newest"
                                itemLayout="horizontal"
                                dataSource={dataTransactionOutput}
                                renderItem={(item) => {
                                    const dateOutput = new Date(item.dateOutput);
                                    const formattedDate = `${dateOutput.getDate()} ${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(dateOutput)} ${dateOutput.getFullYear()}, at ${dateOutput.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;

                                    return (
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={
                                                    <Avatar size="small" className="text-fill">
                                                        <PlusOutlined style={{ fontSize: 10 }} />
                                                    </Avatar>
                                                }
                                                title={item.product?.productName}
                                                description={formattedDate}
                                            />
                                            <div className="amount">
                                                <span className="text-success">- ${item.priceOutputTransaction}</span>
                                            </div>
                                        </List.Item>
                                    );
                                }}
                            />

                            <List
                                className="yestday transactions-list"
                                header={<h6>Input</h6>}
                                itemLayout="horizontal"
                                dataSource={dataTransaction}
                                renderItem={(item) => {
                                    const dateInput = new Date(item.dateInput);
                                    const formattedDate = `${dateInput.getDate()} ${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(dateInput)} ${dateInput.getFullYear()}, at ${dateInput.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;

                                    return (
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={
                                                    <Avatar size="small" className='text-light-danger'>
                                                        {mins}
                                                    </Avatar>
                                                }
                                                title={item.product?.productName}
                                                description={formattedDate}
                                            />
                                            <div className="amount">
                                                <span className="text-danger">- ${item.priceTransaction}</span>
                                            </div>
                                        </List.Item>
                                    );
                                }}
                            />

                        </Card>
                    </Col>

                </Row>
            </div>
        </>
    )
}

export default DashBoard