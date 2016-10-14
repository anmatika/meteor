import axios from 'axios';
class OpenDataService {

    getHelsinkiPalvelurekisteri() {
        return axios.get('http://www.hel.fi/palvelukarttaws/rest/vpalvelurekisteri/description/');
    }
    getVantaaOpenVacancies(){
        return axios.get('http://gis.vantaa.fi/rest/tyopaikat/v1/kaikki');
    }
}
export default OpenDataService;
