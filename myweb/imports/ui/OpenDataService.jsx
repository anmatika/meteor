import axios from 'axios';
class OpenDataService {

    getData() {
        return axios.get('http://www.hel.fi/palvelukarttaws/rest/vpalvelurekisteri/description/');
    }
}
export default OpenDataService;
