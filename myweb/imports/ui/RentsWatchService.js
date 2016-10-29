import axios from 'axios';

class RentsWatchService {

  static getCitiesRankingByAveragePrices() {
    return axios.get('http://api.rentswatch.com/api/cities/ranking?indicator=avgPricePerSqm');
  }
  static getCityDetails(city) {
    return axios.get(`http://api.rentswatch.com/api/cities/search?q=${city}`);
  }
  static getCities(batchCount) {
    const batches = [];
    for (let i = 0; i < batchCount * 50; i += 50) {
      batches.push(RentsWatchService.getCitiesByOffset(i));
    }

    return axios.all(batches);
  }
  static getCitiesByOffset(offset) {
    return axios.get(`http://api.rentswatch.com/api/cities?offset=${offset}`);
  }
}
export default RentsWatchService;
