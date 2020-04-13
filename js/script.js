// show and hide the navbar based on scroll position
const navBar = document.querySelector('nav.members');
const sections = document.querySelectorAll('.sec');

if (window.innerWidth > 796) {
    const scrollIntersector = new IntersectionObserver((entries, _) => {
        const homeSection = entries.find(entry => entry.target.id === 'home');

        if (homeSection && homeSection.isIntersecting) {
            navBar.classList.remove('active');
        } else {
            navBar.classList.add('active');
        }
    }, {
        threshold: .7
    });
    sections.forEach(section => scrollIntersector.observe(section));
} else {
    const navTriggerInput = document.querySelector('#nav-trigger');
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navTriggerInput.checked = false;
        });
    });
}

// lazy load images
const lazyLoad = (target) => {
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            console.log(entry, entry.isIntersecting);
            if (entry.isIntersecting) {
                const img = entry.target.querySelector('.img-box img');
                if (img) {
                    const src = img.getAttribute('data-lazy');

                    img.setAttribute('src', src);
                    img.classList.add('fade-in');

                    const content = entry.target.querySelector('.content');
                    content.classList.add('fade-up');

                }

                observer.disconnect();
            }
        });
    }, {
        threshold: .8
    });

    io.observe(target);
}

// const memberImgs = document.querySelectorAll('.sec .img-box img');
// memberImgs.forEach(lazyLoad);
sections.forEach(lazyLoad);