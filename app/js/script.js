console.log('I loaded!!');

// HEADER
const headerHome = document.querySelector('#headerHome');
const headerMovies = document.querySelector('#headerMovies');
const headerSeries = document.querySelector('#headerSeries');
const headerBookmarked = document.querySelector('#headerBookmarked');

const headerLinks = document.querySelectorAll('.header__nav-link');

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
