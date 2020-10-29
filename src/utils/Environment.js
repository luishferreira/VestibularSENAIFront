const API_URL = {
    LOCAL: 'https://localhost:44382/'
}

function getEnvironment() {
    if (window.location.host.match("localhost"))
        return "LOCAL";
}; export default getEnvironment

export function getUrlAPI(controller, api){
    let urlApi = API_URL[getEnvironment()]
    urlApi += controller + '/' + api
    return urlApi;
}