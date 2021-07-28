import React from 'react'
import { FormControl, Form } from 'react-bootstrap'

export const ProductSearchBar = (props) => {
    let input
    return (
        <Form.Group>
            <label>SEARCH BY BARCODE OR NAME</label>
            <FormControl
                placeholder="BARCODE OR NAME"
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
