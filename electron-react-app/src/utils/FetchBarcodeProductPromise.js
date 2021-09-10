import config from '../config.json'

export const FetchBarcodeProductPromise = (data) =>
    new Promise(function (resolve, reject) {
        fetch(config.BACKEND_SERVER_API + '/get-product', {
            method: 'POST',
            body: JSON.stringify({ data: data }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                console.log(JSON.stringify(json))
                //If no results found, show toast and exit
                if (json['results'].length === 0) {
                    resolve([])
                } else {
                    resolve(json['results'])
                }
            })
            .catch((err) => {
                console.log('Error captured!!! : ' + err)
                reject(
                    new Error(
                        'Unable to fetch product information. Error:' +
                            err.message
                    )
                )
            })
    })
