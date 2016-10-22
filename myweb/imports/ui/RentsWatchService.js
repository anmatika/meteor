import axios from 'axios';
class RentsWatchService {

    getCitiesRankingByAveragePrices() {
        return axios.get('http://api.rentswatch.com/api/cities/ranking?indicator=avgPricePerSqm');
    }
    getCityDetails(city) {
        return axios.get('http://api.rentswatch.com/api/cities/search?q=' + city);
    }
    getCities(){
        return axios.all([this.getCityPath(0), this.getCityPath(50)]);
    }
    getCityPath(offset){
        return axios.get('http://api.rentswatch.com/api/cities?offset=' + offset);
    }
}
export default RentsWatchService;
