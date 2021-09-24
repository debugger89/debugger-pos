import React, { useEffect, useRef } from 'react';
import { FormControl, Form } from 'react-bootstrap';

export const ProductSearchBar = (props) => {
  // let input;
  const innerRef = useRef();
  useEffect(() => innerRef.current && innerRef.current.focus());

  return (
    <Form.Group>
      <label>SEARCH BY BARCODE OR NAME</label>
      <FormControl
        placeholder="BARCODE OR NAME"
        type="text"
        //value={searchProductName}
        ref={innerRef}
        onChange={(e) => {
          // console.log(innerRef.current.value);
          props.onSearch(innerRef.current.value);
        }}
        className="search-inputbox"
        autoFocus
      />
    </Form.Group>
  );
};
