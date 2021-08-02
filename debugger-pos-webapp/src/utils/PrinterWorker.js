const { PosPrinter } = require('electron-pos-printer')
const path = require('path')

const options = {
    preview: false, // Preview in window or print
    width: '170px', //  width of content body
    margin: '0 0 0 0', // margin of content body
    copies: 1, // Number of copies to print
    printerName: 'XP-80C', // printerName: string, check with webContent.getPrinters()
    timeOutPerLine: 400,
    pageSize: { height: 301000, width: 71000 }, // page size
}

const data = [
    {
        type: 'image',
        path: path.join(__dirname, 'assets/banner.png'), // file path
        position: 'center', // position of image: 'left' | 'center' | 'right'
        width: '60px', // width of image in px; default: auto
        height: '60px', // width of image in px; default: 50 or '50px'
    },
    {
        type: 'text', // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
        value: 'SAMPLE HEADING',
        style: `text-align:center;`,
        css: { 'font-weight': '700', 'font-size': '18px' },
    },
    {
        type: 'text', // 'text' | 'barCode' | 'qrCode' | 'image' | 'table'
        value: 'Secondary text',
        style: `text-align:left;color: red;`,
        css: { 'text-decoration': 'underline', 'font-size': '10px' },
    },
    {
        type: 'barCode',
        value: 'HB4587896',
        height: 12, // height of barcode, applicable only to bar and QR codes
        width: 1, // width of barcode, applicable only to bar and QR codes
        displayValue: true, // Display value below barcode
        fontsize: 8,
    },
    {
        type: 'qrCode',
        value: 'https://github.com/Hubertformin/electron-pos-printer',
        height: 55,
        width: 55,
        style: 'margin: 10 20px 20 20px',
    },
    {
        type: 'table',
        // style the table
        style: 'border: 1px solid #ddd',
        // list of the columns to be rendered in the table header
        tableHeader: ['Animal', 'Age'],
        // multi dimensional array depicting the rows and columns of the table body
        tableBody: [
            ['Cat', 2],
            ['Dog', 4],
            ['Horse', 12],
            ['Pig', 4],
        ],
        // list of columns to be rendered in the table footer
        tableFooter: ['Animal', 'Age'],
        // custom style for the table header
        tableHeaderStyle: 'background-color: #000; color: white;',
        // custom style for the table body
        tableBodyStyle: 'border: 0.5px solid #ddd',
        // custom style for the table footer
        tableFooterStyle: 'background-color: #000; color: white;',
    },
    {
        type: 'table',
        style: 'border: 1px solid #ddd', // style the table
        // list of the columns to be rendered in the table header
        tableHeader: [
            { type: 'text', value: 'Animal' },
            { type: 'image', path: path.join(__dirname, 'icons/animal.png') },
        ],
        // multi dimensional array depicting the rows and columns of the table body
        tableBody: [
            [
                { type: 'text', value: 'Cat' },
                { type: 'image', path: './animals/cat.jpg' },
            ],
            [
                { type: 'text', value: 'Dog' },
                { type: 'image', path: './animals/dog.jpg' },
            ],
            [
                { type: 'text', value: 'Horse' },
                { type: 'image', path: './animals/horse.jpg' },
            ],
            [
                { type: 'text', value: 'Pig' },
                { type: 'image', path: './animals/pig.jpg' },
            ],
        ],
        // list of columns to be rendered in the table footer
        tableFooter: [{ type: 'text', value: 'Animal' }, 'Image'],
        // custom style for the table header
        tableHeaderStyle: 'background-color: #000; color: white;',
        // custom style for the table body
        tableBodyStyle: 'border: 0.5px solid #ddd',
        // custom style for the table footer
        tableFooterStyle: 'background-color: #000; color: white;',
    },
]

function PrintReceipt() {
    PosPrinter.print(data, options)
        .then(() => {
            console.log('PRINT SUCCESSFUL!!')
        })
        .catch((error) => {
            console.error(error)
        })
}

export default PrintReceipt
