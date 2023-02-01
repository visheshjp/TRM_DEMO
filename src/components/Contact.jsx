/************************************************************************************************************
 * 
 * 
Author: Vishesh Jaisahay Pathak
Purpose: TRM Labs Take Home Assignment
File Details: Contains implementation details of Transfer Asset API
*
*
*************************************************************************************************************/

/*

Importing all the required libraries

*/

import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { SuccessScreen } from "./SuccessScreen";

/*

This file contains implementation of API to initiate transfer request using TRM API.
We use basic authentication with username and password as the API_Key provided for implemnentation.

We use POST to implement this service and ask user to enter Asset amount they wish to transfer.

The entered transferred amount is then converted to equivalent USD amount for transfer.

For the purpose of this project, we are using transfer chain as Bitcoin as we were not aware of destination addresses of other chains.

Additionally, we have added option to select CAD as currency type for transfer to demonstrate error handling capability while making the calls.

Upon hititng submit the transfer request is created and we would be able to see the response from the API alongwith all the values.



*/
const Contact = (props) => {
  const [selectedOption, setSelectedOption] = useState("Option 1");
  const [assetAmount, setAssetAmount] = useState("");
  const [response, setResponse] = useState({});
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  const handleClose = () => {
    props.setShow(false);
  };

  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
  };

  /*
    Function to convert the asset amount into equivalent fiat value required to be transferred.
    */
  const getFiatValue = (currency, amount) => {
    console.log(amount);
    switch (currency) {
      case "USD":
        return amount * 22841.9;
      case "CAD":
        return amount * 30629.5;
    }
  };

  /*
    
    Method to make the API call.
    Appropriate log messages have been added for debugging purposes.

    */
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Input 1:", assetAmount);
    console.log("Selected Option:", selectedOption);

    const reqBody = {
      accountExternalId: "Client1234",
      asset: props?.transferData?.asset,
      assetAmount: assetAmount,
      chain: props?.transferData?.blockchain,
      destinationAddress: "1LBVuSig83hEBzEuvf7KPyB6dYvAQdfBXQ",
      externalId: "a614a6b3-75b2-4a75-bb4b-5f4801b2ebdc",
      fiatCurrency: selectedOption,
      fiatValue: getFiatValue(selectedOption, assetAmount).toString(),
      onchainReference:
        "35150e9824c7536ed694ba4e96046c0417047cc25690880b3274d65dfbdf4d09",
      timestamp: "2021-03-14T20:21:00.000Z",
      transferType: "CRYPTO_WITHDRAWAL",
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          btoa(
            "c50d7c03-3878-477c-857e-7869a41f207b:c50d7c03-3878-477c-857e-7869a41f207b"
          ),
      },
      body: JSON.stringify(reqBody),
    };

    try {
      const res = await fetch(
        "https://api.trmlabs.com/public/v2/tm/transfers",
        requestOptions
      );
      const json = await res.json();
      setResponse(json);
    } catch (err) {
      console.error(err);
    }

    console.log("reponse", response);

    if (response) {
      setShowSuccessScreen(true);
    }
  };

  //Function to display results after the API calls.
  //In case of error, we display appropriate error message and log the corresponding error details.
  //In case of success, we display the fields such as Asset amount, fiat value, transaction type etc. on the form.
  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Transfers</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Modal.Body>
          <h5 className="mb-4">
            This sections makes use of posting a Transfer
          </h5>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formInput1">
              <Form.Label>Asset Amount</Form.Label>
              <Form.Control
                type="text"
                name="assetAmount"
                value={assetAmount}
                onChange={(e) => setAssetAmount(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDropdown">
              <Form.Label>Select Currency</Form.Label>
              <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {selectedOption}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="USD">USD</Dropdown.Item>
                  <Dropdown.Item eventKey="CAD">CAD</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
      {showSuccessScreen ? <SuccessScreen data={response} /> : ""}
    </Modal>
  );
};

export default Contact;
