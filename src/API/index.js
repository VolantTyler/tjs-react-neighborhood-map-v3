//resource: https://www.youtube.com/watch?v=Dj5hzKBxCBI&list=PL4rQq4MQP1crXuPtruu_eijgOUUXhcUCP&index=2

class Helper {
    static baseURL() {
        return "https://api.foursquare.com/v2"
    }
    static auth() {
        const keys = {
            client_id: "M3LJTA2QWGOG2RY4DVF3LUW3MCQK2UKCHA3WJ0LWKPIDMX0M",
            client_secret: "30E5HRSYMOK2XHIROYC0CCOOCVWYSHK4HAEHNPAG5PPJJCUH",
            v: "20181001"
        };
        return Object.keys(keys)
        .map(key => `${key}=${keys[key]}`)
        .join("&");
    }
    static urlBuilder(urlParams) {
        if(!urlParams) {
            return ""
        }
        return Object.keys(urlParams)
            .map(key => `${key}=${urlParams[key]}`)
            .join("&");
    }
    static headers() {
        return {
            Accept: "application/json"
        };
    }
    static simpleFetch(endPoint,method,urlParams) {
        let requestData = {
            method,
            headers: Helper.headers()
        };
        return fetch(
            `${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(urlParams)}`,
            requestData)
            .then(res => {
                if (res.status === 429) {
                  return Promise.reject(new Error('Foursquare daily quota reached. Try again tomorrow.'));
                } else {
                  return res;
                }
              })
            .then(res => res.json())
            //TODO: error handling not properly tested
            .catch(error => {
                window.alert('Error fetching Foursquare data: '+error.message);
                console.log(error);
            })
    }
}

export default class SquareAPI {
    static search(urlParams) {
        return Helper.simpleFetch("/venues/search", "GET", urlParams);
    }
    static getVenueDetails(VENUE_ID) {
        return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET");
    }
    static getVenuePhotos(VENUE_ID) {
        return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET")
    }
}