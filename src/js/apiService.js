export default class ImgApiService {
  constructor() {
    this.page = 1;
    this.query = '';
  }
  fetchImg() {
    const URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=24257858-20682938b9e789ea234c047ef`;

    return fetch(URL)
      .then(r => r.json())
      .then(data => {
        this.page += 1;
        return data.hits;
      })
      .catch(function () {
        console.log('erorr');
      });
  }

  get findQuery() {
    return this.query;
  }

  set findQuery(newQuery) {
    this.query = newQuery;
  }
}
