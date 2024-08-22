console.log('I loaded!!');

// HEADER
const headerHome = document.querySelector('#headerHome');
const headerMovies = document.querySelector('#headerMovies');
const headerSeries = document.querySelector('#headerSeries');
const headerBookmarked = document.querySelector('#headerBookmarked');

const headerLinks = document.querySelectorAll('.header__nav-link');

let dataBase;
let trending;
generateLocalDB();
let btnBookmark;
// BOOKMARK 
// let btnBookmark = document.querySelectorAll('.btnBookmark');
// btnBookmark.forEach(item => {
//     item.addEventListener('click', (event)=>{
//         if(event.target.closest('button').dataset.bookmarked != 'true'){
//             event.target.closest('button').children[0].src = '/assets/icon-bookmark-full.svg'
//             event.target.closest('button').setAttribute('data-bookmarked', 'true')
//         } else {
//             event.target.closest('button').setAttribute('data-bookmarked', 'false')
//         }
//             event.target.closest('button').children[0].src = '/assets/icon-bookmark-empty.svg'
//     })
// })

headerLinks.forEach(link => {
    link.addEventListener('click', (event) => {

        if (event.target.closest('path')==null){
            if(!event.target.children[1].classList.contains('header__nav-link--active')){
                headerLinks.forEach(link => {
                    link.children[0].children[0].children[1].classList.remove('header__nav-link--active');
                })
                event.target.children[1].classList.add('header__nav-link--active')
            }
            
        } else if (!event.target.closest('path').classList.contains('header__nav-link--active')){
            headerLinks.forEach(link => {
                link.children[0].children[0].children[1].classList.remove('header__nav-link--active');
            })
            event.target.closest('path').classList.add('header__nav-link--active');
        }
            
    })
})

// function generateTrending(movieList){
//     generateMovies(movieList)
//     allMovies = movieList;
//     const newTrendingList = allMovies.map(
//         (movie) => 
//             `<li class="trending__movie" data-id="${movie.title}">
//           <button class="btnBookmark" data-bookmarked="${movie.isBookmarked}"><img src="/assets/icon-bookmark-empty.svg" alt=""></button>
//           <img class="trending__movie-thumb" src="${movie.thumbnail.regular.small}" alt="${movie.title} thumbnail">
//           <div class="trending__movie-content">
//             <div class="trending__movie-info">
//               <span class="trending__movie-data">${movie.year}</span>
//               <span class="separator"></span>
//               <span class="trending__movie-category"><img src="/assets/icon-category-movie.svg" alt="movie category icon"><span>${movie.category}</span></span>
//               <span class="separator"></span>
//               <span class="trending__movie-rating">${movie.rating}</span>
//             </div>
//             <h3 class="trending__movie-title">${movie.title}</h3>
//           </div>
//           <div class="thumb__shadow"></div>
//         </li>`
        
//     ).join('');
    
//     document.querySelector('#trending ul').innerHTML = newTrendingList;
//     // BOOKMARK 
//     let btnBookmark = document.querySelectorAll('.btnBookmark');
//     btnBookmark.forEach(item => {
//         item.addEventListener('click', (event)=>{
//             if(event.target.closest('button').dataset.bookmarked != 'true'){
//                 event.target.closest('button').children[0].src = '/assets/icon-bookmark-full.svg'
//                 event.target.closest('button').setAttribute('data-bookmarked', 'true');
//                 const movieTitle = event.target.closest('li').dataset.id;
//                 allMovies.forEach(movie => {
//                     if (movie.title === movieTitle) {
//                         movie.isBookmarked = true;
//                         console.log(movie.isBookmarked);
//                     }
//                 })
//             } else {
//                 event.target.closest('button').setAttribute('data-bookmarked', 'false')
//                 event.target.closest('button').children[0].src = '/assets/icon-bookmark-empty.svg'
//                 const movieTitle = event.target.closest('li').dataset.id;
//                 allMovies.forEach(movie => {
//                     if (movie.title === movieTitle) {
//                         movie.isBookmarked = false;
//                         console.log(movie.isBookmarked);
//                     }
//                 })
//             }
//         })
//     })

// }

let recommendations;
async function generateLocalDB(){
    const data = await fetch('/data.json').then(
        response => response.json()
    ).then (
        converted => dataBase = converted
    )
    trending = dataBase.filter(item => item.isTrending);
    recommendations = dataBase.filter(item => item.isTrending != true);
    selectTrending(trending);

    const normalMovieList = recommendations.map(movie=>(
        `
        <li class="movie-list__movie">
          <div class="movie-list__movie-thumb">
            <button class="btnBookmark"><img src="/assets/icon-bookmark-empty.svg" alt=""></button>
            <img src="${movie.thumbnail.regular.small}" alt="">
          </div>
          <div class="movie-list__movie-info">
            <span class="movie-list__movie-data">2019</span>
            <span class="separator"></span>
            <span class="movie-list__movie-category"><img src="/assets/icon-category-movie.svg" alt="movie category icon"><span>Movie</span></span>
            <span class="separator"></span>
            <span class="movie-list__movie-rating">PG</span>
          </div>
          <h3>Below Echo</h3>
        </li>
        `
    )).join('')
    console.log(normalMovieList);
    document.querySelector('#recommended ul').innerHTML = normalMovieList

    document.querySelectorAll('.btnBookmark').forEach(item => {
    item.addEventListener('click', (event)=>{
        if(event.target.closest('button').dataset.bookmarked != 'true'){
            console.log(event.target.closest('button').children[0])
            event.target.closest('button').setAttribute('data-bookmarked', 'true')
            event.target.closest('button').children[0].src = '/assets/icon-bookmark-full.svg'
        } else {
            event.target.closest('button').setAttribute('data-bookmarked', 'false')
            event.target.closest('button').children[0].src = '/assets/icon-bookmark-empty.svg'
        }
    })
})
}


function selectTrending(trending){
    const trendingHtml = trending.map(movie => `<li class="trending__movie" data-id="${movie.title}">
          <button class="btnBookmark" data-bookmarked="${movie.isBookmarked}"><img src="${movie.isBookmarked? "/assets/icon-bookmark-full.svg" : "/assets/icon-bookmark-empty.svg"}" alt="bookmark icon"></button>
          <img class="trending__movie-thumb" src="${movie.thumbnail.regular.small}" alt="${movie.title} thumbnail">
          <div class="trending__movie-content">
            <div class="trending__movie-info">
              <span class="trending__movie-data">${movie.year}</span>
              <span class="separator"></span>
              <span class="trending__movie-category"><img src="/assets/icon-category-movie.svg" alt="movie category icon"><span>${movie.category}</span></span>
              <span class="separator"></span>
              <span class="trending__movie-rating">${movie.rating}</span>
            </div>
            <h3 class="trending__movie-title">${movie.title}</h3>
          </div>
          <div class="thumb__shadow"></div>
        </li>`
        
    ).join('');

    document.querySelector('#trending ul').innerHTML = trendingHtml
}
