import { UIStore } from './UIStore';

const path = require('path');
const { PosPrinter } = require('electron').remote.require(
  'electron-pos-printer'
);

const options = {
  preview: false, // Preview in window or print
  width: 200, //  width of content body
  margin: '0 0 0 0', // margin of content body
  copies: 1, // Number of copies to print
  printerName: 'POS-58', // printerName: string, check it at webContent.getPrinters()
  timeOutPerLine: 400,
  silent: true,
};

function getBillLogoPath(){
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    return path.join(__dirname, '/assets/img/M_M Bill Logo.png')
  }else{
    let asarUnpackedPath = __dirname.replace ("app.asar", 'assets');
    return path.join(asarUnpackedPath, '/img/M_M Bill Logo.png')
  }
}

export function prepareReceiptForPrint(orderData) {
  var headerData = [
    {
      type: 'image',
      path: getBillLogoPath(), // file path
      position: 'center', // position of image: 'left' | 'center' | 'right'
      width: '100px', // width of image in px; default: auto
      height: '60px', // width of image in px; default: 50 or '50px'
    },
    {
      type: 'text', // 'text' | 'barCode' | 'qrCode' | 'image' | 'table'
      value: 'Pelandagoda road, Panagoda, Homagama',

      css: {
        'font-size': '11px',
        'font-family': "'Roboto', 'Helvetica Neue', Arial, sans-serif",
        'text-align': 'center',
      },
    },
    {
      type: 'text', // 'text' | 'barCode' | 'qrCode' | 'image' | 'table'
      value: '<hr/>',
    },
    {
      type: 'text', // 'text' | 'barCode' | 'qrCode' | 'image' | 'table'
      value: 'Invoice # : 123456',

      css: {
        'font-size': '10px',
        'font-family': 'sans-serif',
        'text-align': 'center',
      },
    },
    {
      type: 'text', // 'text' | 'barCode' | 'qrCode' | 'image' | 'table'
      value:
        'Date : ' +
        new Date().toLocaleString(undefined, {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          hour12: true,
          minute: '2-digit',
        }),

      css: {
        'font-size': '10px',
        'font-family': 'sans-serif',
        'text-align': 'center',
      },
    },
    {
      type: 'text', // 'text' | 'barCode' | 'qrCode' | 'image' | 'table'
      value: '<hr/>',
    },
    {
      type: 'text',
      value:
        "<table style='width: 100%;border: 0px;'><tbody style='border-top:0px'><tr><th>Item</th><th>U.Price</th><th>Qty</th><th>Price</th></tr></tbody></table>",
      css: {
        'font-size': '11px',
        'font-family': 'sans-serif',
        'text-align': 'left',
      },
    },
  ];

  let totalPrice = 0;
  let totalUnits = 0;

  for (var i = 0; i < orderData.length; i++) {
    let itemName =
      orderData[i].name === undefined
        ? orderData[i].prodname
        : orderData[i].name;
    let itemUnitPrice = orderData[i].unitprice;
    let units = orderData[i].units;
    let price = orderData[i].price;

    totalPrice = totalPrice + price;
    totalUnits++;

    let item = {
      type: 'text',
      value:
        '<b>' +
        itemName +
        '</b>' +
        "<br><div style='float: left'>" +
        parseFloat(itemUnitPrice).toFixed(2) +
        "</div><div style='float: right'>" +
        parseFloat(price).toFixed(2) +
        "</div><div style='margin: 0 auto; width: 100px;'>&nbsp; x " +
        units +
        '</div>',
      css: {
        'font-size': '10px',
        'font-family': "'Roboto', 'Helvetica Neue', Arial, sans-serif",
        'text-align': 'left',
        'padding-bottom': '5px',
      },
    };
    headerData = [...headerData, item];
  }

  let footer = [
    {
      type: 'text',
      value:
        "<br/><div style='float: left'>Total : </div><div style='float: right'>" +
        parseFloat(totalPrice).toFixed(2) +
        '</div>',
      css: {
        'font-size': '14px',
        'font-weight': '700',
        'font-family': "'Roboto', 'Helvetica Neue', Arial, sans-serif",
        'text-align': 'left',
        'padding-bottom': '5px',
      },
    },
    {
      type: 'text',
      value: '<br/><div><b>Total Items : ' + totalUnits + '</b></div>',
      css: {
        'font-size': '11px',
        'font-family': "'Roboto', 'Helvetica Neue', Arial, sans-serif",
        'text-align': 'left',
        'padding-bottom': '5px',
      },
    },
    {
      type: 'text',
      value: '<br/><br/>Thank You. Come Again',
      css: {
        'font-size': '11px',
        'font-family': "'Roboto', 'Helvetica Neue', Arial, sans-serif",
        'text-align': 'center',
        'padding-bottom': '3px',
      },
    },
    {
      type: 'text',
      value: '<hr/>',
    },
  ];

  headerData = [...headerData, ...footer];

  // console.log('Oder dta: ' + JSON.stringify(orderData));
  console.log('Print dta: ' + JSON.stringify(headerData));
  return headerData;
}

export function printReceipt(data) {

  // alert("PATH " + JSON.stringify(path.join(__dirname, '')))

  console.log('Print dta from priter: ' + JSON.stringify(data));
  PosPrinter.print(data, options)
    .then(() => {
      console.log('PRINT SUCCESSFUL!!');
    })
    .catch((error) => {
      console.error(error);
    });
}
