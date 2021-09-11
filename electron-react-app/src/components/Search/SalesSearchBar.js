import React from 'react';
import { FormControl, Form } from 'react-bootstrap';

export const SalesSearchBar = (props) => {
  let input;
  return (
    <Form.Group>
      <label>SEARCH BY SALE ID / DATE / SALE AMOUNT</label>
      <FormControl
        placeholder="SALE ID / DATE / SALE AMOUNT"
        type="text"
        ref={(n) => (input = n)}
        onChange={(e) => {
          props.onSearch(input.value);
        }}
        autoFocus
      />
    </Form.Group>
  );
};
