/************************************************************************************************************
 * 
 * 
Author: Vishesh Jaisahay Pathak
Purpose: TRM Labs Take Home Assignment
File Details: Contains implementation details of displaying transfer assets results (Success/Failure)
*
*
*************************************************************************************************************/
/*

Importing all the required libraries

*/


import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from "react-bootstrap";
import { Alert } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';

/*

This method is to display success/failure message on the form UI after the User submits a transfer request.

For the purpose of this project, we have implemented transfers in BTC as we were not aware of destination addresses of other chains.

For other chains and currencies, we display appropriate error message on the UI to the User.

*/
export const SuccessScreen = (props) => {
    const [loading, setLoading] = useState(false);
    console.log(props.data)

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, [])

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    return (
        <Container>
            <Row className="my-1 mb-5">
                <Col md={{ span: 8, offset: 2 }}>
                    {
                        loading ? (
                            <Spinner role="status"
                                style={{ marginLeft: '120px' }} animation="border" />
                        ) :
                            (
                                props?.data.name === 'BadRequest' ?
                                    <Alert variant="danger">
                                        An error occured while posting transfer due to <b>{props?.data.name}</b>
                                    </Alert> :
                                    (
                                        <Card border="dark">
                                            <Card.Header>
                                                <h4>Transfer Successful</h4>
                                            </Card.Header>
                                            <Card.Body>
                                                <Row xs={1} md={2}>
                                                    <Col className="font-weight-bold">Asset amount</Col>
                                                    <Col>{props.data.assetAmount}</Col>
                                                </Row>
                                                <Row xs={1} md={2}>
                                                    <Col className="font-weight-bold">Block Chain</Col>
                                                    <Col>{props.data.chain}</Col>
                                                </Row>
                                                <Row xs={1} md={2}>
                                                    <Col className="font-weight-bold">Currency</Col>
                                                    <Col>{props.data.fiatCurrency}</Col>
                                                </Row>
                                                <Row xs={1} md={2}>
                                                    <Col className="font-weight-bold">Fiat Value</Col>
                                                    <Col>{formatCurrency(props.data.fiatValue)}</Col>
                                                </Row>
                                                <Row xs={1} md={2}>
                                                    <Col className="font-weight-bold">Status</Col>
                                                    <Col>{props.data.screenStatus}</Col>
                                                </Row>
                                                <Row xs={1} md={2}>
                                                    <Col className="font-weight-bold">Transfer Type</Col>
                                                    <Col>{props.data.transferType}</Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    )
                            )
                    }
                </Col>
            </Row>
        </Container>
    )
}