import axios from 'axios';
class RentsWatchService {

    getCitiesRankingByAveragePrices() {
        return axios.get('http://api.rentswatch.com/api/cities/ranking?indicator=avgPricePerSqm');
    }
    getCityDetails(city) {
        return axios.get('http://api.rentswatch.com/api/cities/search?q=' + city);
    }
}
export default RentsWatchService;
