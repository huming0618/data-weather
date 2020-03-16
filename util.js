const convertFtoC = (input) => {
    return ((input - 32) * 5 / 9).toFixed(2)
}

const getQuery = (city, country, year, month, day) => {
    //weather on 9/3/1973 in chengdu, china
    return '/input/?i=' + encodeURIComponent(`weather on ${month}/${day}/${year} in ${city}, ${country}`)
}

module.exports = {
    getQuery,
    convertFtoC
}