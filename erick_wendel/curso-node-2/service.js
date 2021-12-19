const axios = require('axios').default

const controller = {
    people: () => axios.get('https://www.swapi.tech/api/people?limit=100').then((response) => {
        return response.data.results
    })
}

module.exports = controller