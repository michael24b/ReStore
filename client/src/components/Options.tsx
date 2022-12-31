import React from "react";
import { Button, Dropdown, Form, InputGroup } from "react-bootstrap";

const Options = () => {
  return (
    <div className="d-flex">
      <Dropdown className="mx-5">
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <InputGroup aria-label="Basic checkbox toggle button group">
        <InputGroup.Text className=" pe-0">checkout</InputGroup.Text>
        <InputGroup.Checkbox aria-label="Checkbox" />
        <InputGroup.Text className=" pe-0">checkout</InputGroup.Text>
        <InputGroup.Checkbox aria-label="Checkbox" />
        <InputGroup.Text className=" pe-0">checkout</InputGroup.Text>
        <InputGroup.Checkbox aria-label="Checkbox" />
        <InputGroup.Text className=" pe-0">checkout</InputGroup.Text>
        <InputGroup.Checkbox aria-label="Checkbox" />
        <InputGroup.Text className=" pe-0">checkout</InputGroup.Text>
        <InputGroup.Checkbox aria-label="Checkbox" />
        <InputGroup.Text className=" pe-0">checkout</InputGroup.Text>
        <InputGroup.Checkbox aria-label="Checkbox" />
        <InputGroup.Text className=" pe-0">checkout</InputGroup.Text>
        <InputGroup.Checkbox aria-label="Checkbox" />
      </InputGroup>
    </div>
  );
};

export default Options;
