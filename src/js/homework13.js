import ImgApiService from './apiService.js';
import cardsMarkup from '../templates/imgCard.hbs';
const ImgFindService = new ImgApiService();

const refs = {
  input: document.querySelector('.search-form_input'),
  form: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery-container'),
};

refs.form.addEventListener('submit', onInputSubmit);

function onInputSubmit(e) {
  e.preventDefault();
  resetMarkup();
  const inputValue = refs.input.value;

  ImgFindService.findQuery = inputValue;
  drowNewMarkup();
}

function makeGalleryMarkup(data) {
  let markup = cardsMarkup(data);
  refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
}

function resetMarkup() {
  refs.galleryContainer.innerHTML = '';
  ImgFindService.page = 1;
}

function drowNewMarkup() {
  ImgFindService.fetchImg()
    .then(data => {
      if (data.length === 12) {
        makeGalleryMarkup(data);
      } else {
        let markup = cardsMarkup(data);
        refs.galleryContainer.insertAdjacentHTML(
          'beforeend',
          markup + '<h1>БОЛЬШЕ ФОТОГРАФИЙ ПО ДАННОМУ ЗАПРОСУ НЕТ, ПОПРОБУЙТЕ ЧТО-ТО ЕЩЕ</h1>',
        );
        ImgFindService.page = 1;
      }
    })
    .catch(function () {
      alert('you have some erorrs');
    });
}

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(
    entry => {
      if (entry.isIntersecting && !refs.input.value === false) {
        drowNewMarkup();
      } else {
      }
    },
    {
      threshold: 1,
    },
  );
});

observer.observe(document.querySelector('.end-js'));
