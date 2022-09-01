
const baseURL = 'https://bluetanks-dev-api.herokuapp.com/api/v1';


const Token = JSON.parse(localStorage.getItem('Token'));

export const getUsers = async () => {
    const myHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
    }
    let timeoutId;

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return Promise.race([
        fetch(`${baseURL}/users`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}

export const allCharge = async (type) => {
    const myHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
    }
    let timeoutId;


    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return Promise.race([
        fetch(`${baseURL}/charges?type=${type}`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}

export const updateChargeStatus = async ({body,stationId, chargeId}) => {
    const myHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
    }
    let timeoutId;

    const requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body
    };

    return Promise.race([
        fetch(`${baseURL}/stations/${stationId}/charges/${chargeId}`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}

export const editStation = async ({id, body}) => {
    const myHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
    }
    let timeoutId;

    const requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
body
    };

    return Promise.race([
        fetch(`${baseURL}/stations/${id}`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}





export const getTotalStations = {

    totalStations: async ({pageParam = 1}) => {
        const myHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`
        }
        let timeoutId;

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        return Promise.race([
            fetch(`${baseURL}/stations`, requestOptions)
                .then(response => response.json()),
            new Promise((resolve, reject) => {
                timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

                //  clearTimeout(timeoutId)
            }).then(() => {
                clearTimeout(timeoutId)
            })

        ])

    }
}


export const signInUser = async (userdata) => {
    const myHeaders = {
        'Content-Type': 'application/json',
    }
    let timeoutId;

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: userdata,
    };

    return Promise.race([
        fetch(`${baseURL}/stations/login`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}
