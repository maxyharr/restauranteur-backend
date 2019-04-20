const rp = require('request-promise-native')
const functions = require('firebase-functions');
const apiBaseUrl = 'https://developers.zomato.com/api/v2.1'
const headers = {
  'User-Agent': 'Request-Promise',
  'user-key': functions.config().zomato.apikey,
  'content-type': 'application/json',
}

module.exports.geocode = async (ctx) => {
  const lat = ctx.request.query.lat
  const lon = ctx.request.query.lon
  console.log('lat & lon', lat, lon)
  const options = {
    method: 'GET',
    uri: apiBaseUrl + `/geocode`,
    qs: { lat, lon },
    headers
  }
  if (lat && lon) {
    const response = await rp(options)
    ctx.body = response
  } else {
    ctx.body = {errors: ['Latitude and longitude must be provided']}
  }
};