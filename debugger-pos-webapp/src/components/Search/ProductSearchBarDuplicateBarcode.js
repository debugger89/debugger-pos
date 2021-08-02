import React from 'react'
import { FormControl, Form } from 'react-bootstrap'

export const ProductSearchBarDuplicateBarcode = (props) => {
    let input
    return (
        <Form.Group>
            <label>SEARCH BY BARCODE OR NAME</label>
            <FormControl
                placeholder="NAME OR PRICE"
                type="text"
                //value={searchProductName}
                ref={(n) => (input = n)}
                onChange={(e) => {
                    props.onSearch(input.value)
                }}
                autoFocus
            />
        </Form.Group>
    )
}
