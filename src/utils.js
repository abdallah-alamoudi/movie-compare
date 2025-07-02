const debounce = (callback, duration) => {
  let id;
  return (...args) => {
    if (id) {
      clearInterval(id);
    }
    id = setTimeout(() => {
      callback(...args);
    }, duration);
  };
};

const renderSummary = ({
  Poster,
  Title,
  Genre,
  Plot,
  Awards,
  BoxOffice,
  Metascore,
  imdbRating,
  imdbVotes,
}) => {
  let numOfAwards = 0;
  Awards.split(' ').forEach((word) => {
    const number = parseInt(word);
    if (!isNaN(number)) numOfAwards += number;
  });
  const dollars = parseInt(BoxOffice.replace(/[\$,]/g, ''));
  const metaScore = parseInt(Metascore);
  const imdbRatingNum = parseFloat(imdbRating);
  const numOfVotes = parseInt(imdbVotes.replace(/,/g, ''));
  console.log(numOfAwards, dollars, metaScore, imdbRatingNum, numOfVotes);

  return `
  <div class="heading flex gap-3 mb-20 ">
    <div class="image  flex-grow-0 flex-shrink-0 h-[200px] overflow-hidden">
    <img src="${Poster}" alt="" class="w-full h-full" />
    </div>
    <div class="metaData">
    <h1 class="text-3xl font-bold mb-2">${Title}</h1>
    <p class="text-xl mb-2">${Genre}</p>
    <p class="text-gray-500">${Plot}</p>
    </div>
  </div>
  <div class="stats">
  ${renderStatic('Awards', Awards, numOfAwards)}
  ${renderStatic('Box Office', BoxOffice, dollars)}
  ${renderStatic('Meta Score', Metascore, metaScore)}
  ${renderStatic('IMDB Rating', imdbRating, imdbRatingNum)}
  ${renderStatic('IMDB Votes', imdbVotes, numOfVotes)}
  </div>
  
  
  `;
};
const renderStatic = (title, val, data) => `
<div data-value = ${data}
        class="statistic text-green-50 text-3xl mb-5 p-5 shadow-lg hover:bg-green-400  bg-green-500 rounded h-[140px]"
      >
        <p class="mb-3">${val === 'N/A' ? 'Not Available' : val}</p>
        <p class="text-xl">${title}</p>
      
</div>
`;
const runComparison = () => {
  const metaDataContainers = document.querySelectorAll('.stats');
  const firstStatistics = metaDataContainers[0].querySelectorAll('.statistic');
  const secStatistics = metaDataContainers[1].querySelectorAll('.statistic');
  firstStatistics.forEach((statEle, inx) => {
    const data1 = parseFloat(statEle.dataset.value);
    const data2 = parseFloat(secStatistics[inx].dataset.value);
    if (isNaN(data1) || isNaN(data2)) return;
    if (data2 > data1) {
      statEle.classList.remove('hover:bg-green-400', 'bg-green-500');
      statEle.classList.add('hover:bg-red-400', 'bg-red-500');
    } else {
      secStatistics[inx].classList.remove('hover:bg-green-400', 'bg-green-500');
      secStatistics[inx].classList.add('hover:bg-red-400', 'bg-red-500');
    }
  });
};
export { debounce, renderSummary, runComparison };
