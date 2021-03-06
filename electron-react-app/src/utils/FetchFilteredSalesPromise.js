import config from '../config.json';

export const FetchFilteredSalesPromise = (data) =>
  new Promise(function (resolve, reject) {
    fetch(config.BACKEND_SERVER_API + '/get-filtered-sales', {
      method: 'POST',
      body: JSON.stringify({ data: data }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        // console.log(JSON.stringify(json))
        //If no results found, show toast and exit
        if (json['results'].length === 0) {
          reject(new Error('No sale information found in database'));
        } else {
          resolve(json['results']);
        }
      })
      .catch((err) => {
        //console.log("Error captured!!! : " + err);
        reject(
          new Error('Unable to fetch sales information. Error:' + err.message)
        );
      });
  });
