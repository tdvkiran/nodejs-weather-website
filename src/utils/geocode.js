var request = require('postman-request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoia2lyYW50YWRpc2V0dGkiLCJhIjoiY2tidXduMWhpMDBkdDJ6cGNyZ2Vldmh1eiJ9.K3En7f81umV9A3FwtluXLA&limit=1";
    request(url, { json: true }, (error, response, body) => {
        if (error) {
            callback('Unable to Connect to location services', undefined);
        } else if (body.features == undefined || body.features.length == 0) {
            callback("unable to find location. please find other place!!", undefined);
        }
        else {
            const {features}=body;
            callback(undefined, {
                longitude: features[0].center[0],
                latitude: features[0].center[1],
                location: features[0].place_name
            });
        }
    })
}

module.exports = geocode