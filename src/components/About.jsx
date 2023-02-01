import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Spinner } from 'react-bootstrap';

import Contact from './Contact';

const About = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const username = 'c50d7c03-3878-477c-857e-7869a41f207b'
    const password = 'c50d7c03-3878-477c-857e-7869a41f207b'
    const [show, setShow] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState({})

    async function fetchData() {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        const headers = new Headers();
        headers.append(
            'Authorization',
            'Basic ' + btoa(`${username}:${password}`)
        );

        const response = await fetch('https://api.trmlabs.com/public/v2/tm/supported-assets', {
            headers: headers
        });
        const json = await response.json();
        setData(json);
    }

    const handleClick = (transferData) => {
        console.log('data', transferData)
        setShow(true)
        setSelectedAsset(transferData)
        return (
            <TransferModal transferData={transferData} />
        )
    }

    const TransferModal = () => {
        return (
            <Contact transferData={selectedAsset} show={show} setShow={setShow} />
        )
    }

    return (
        <div className="d-flex flex-column h-100">
            <Container className="bg-white text-center">
                <Row className="bg-white mt-3">
                    <Col>
                        <h1>TRM Labs API Demo</h1>
                        <p>This section makes use of get all the assets</p>
                    </Col>
                </Row>
                <div>
                    <Button className='text-center my-3 mb-4' variant="outline-dark" onClick={() => fetchData()}>Fetch All Assets</Button>
                </div>
                {
                    loading ?
                        (
                            <Spinner role="status"
                                style={{ width: '80px', height: '80px', marginTop: '20px' }} animation="border" />
                        ) : (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Asset Name</th>
                                        <th>TRM Identifier</th>
                                        <th>Supported Blockchains</th>
                                    </tr>
                                </thead>
                                <tbody className='text-center'>
                                    {data?.map(item => (
                                        <tr>
                                            <td>{item.displayName}</td>
                                            <td>
                                                <Button onClick={() => handleClick(item)}>
                                                    {item.asset}
                                                </Button>
                                            </td>
                                            <td>{item.blockchain}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )
                }

                {show ? TransferModal() : ""}
            </Container>
        </div>
    );
}

export default About