import config from '../config.json';

export const FetchAllSalesPromise = (data) =>
  new Promise(function (resolve, reject) {
    fetch(config.BACKEND_SERVER_API + '/get-all-sales', {
      method: 'POST',
      body: JSON.stringify({ data: data }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        for (var i = 0; i < response.length; i++) {
          response[i].saledate = new Date(response[i].saledate);
          console.log('Formatted Date : ' + response[i].saledate);
        }
        return response.json();
      })
      .then((json) => {
        // console.log(JSON.stringify(json))
        //If no results found, show toast and exit
        if (json['results'].length === 0) {
          reject(
            new Error('Unable to fetch product information from database')
          );
        } else {
          resolve(json['results']);
        }
      })
      .catch((err) => {
        //console.log("Error captured!!! : " + err);
        reject(
          new Error('Unable to fetch product information. Error:' + err.message)
        );
      });
  });
