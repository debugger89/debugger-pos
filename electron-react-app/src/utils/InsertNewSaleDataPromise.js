import config from '../config.json'

export const InsertNewSaleDataPromise = (data) =>
    new Promise(function (resolve, reject) {
        fetch(config.BACKEND_SERVER_API + '/add-new-sale', {
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
                    reject(new Error('Unable to save sale to database'))
                } else {
                    resolve(json['results'])
                }
            })
            .catch((err) => {
                reject(
                    new Error(
                        'Unable to save sale to database. Error:' +
                            err.message
                    )
                )
            })
    })
