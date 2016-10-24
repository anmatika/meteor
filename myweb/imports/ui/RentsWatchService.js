import axios from 'axios'; class RentsWatchService {

    getCitiesRankingByAveragePrices() {
        return axios.get('http://api.rentswatch.com/api/cities/ranking?indicator=avgPricePerSqm');
    }
    getCityDetails(city) {
        return axios.get('http://api.rentswatch.com/api/cities/search?q=' + city);
    }
    getCities(batchCount){
        let batches = [];
        for(var i=0; i<batchCount*50; i=i+50)
        {
            batches.push(this.getCitiesByOffset(i));
        }

        return axios.all(batches);
    }
    getCitiesByOffset(offset){
        return axios.get('http://api.rentswatch.com/api/cities?offset=' + offset);
    }
}
export default RentsWatchService;
