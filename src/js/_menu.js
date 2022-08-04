(_ => {
  document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.header');
    const toggleBtn = document.querySelector('.toggle__btn');
    const menu = document.querySelector('.menu');
    const menuLink = document.querySelectorAll('.menu__link');

    toggleBtn.addEventListener("click", navToggleClick);

    function navToggleClick() {
      menu.classList.toggle('open');
      header.classList.toggle('header--open')
      toggleBtn.classList.toggle('toggle__btn--open');
      document.body.classList.toggle('stop--scroll');

      const headerHeight = header.offsetHeight;
      const heroHeight = document.querySelector('.hero').offsetHeight;
      menu.style.minHeight = `${headerHeight + heroHeight}px`;
    }

    for (let i = 0; i < menuLink.length; i++) {
      menuLink[i].addEventListener('click', menuLinkClick);
    }

    function menuLinkClick(event) {
      smoothScroll(event);

      if (menu.classList.contains('open')) {
        navToggleClick(event);
      }
    }

    function smoothScroll(event) {
      event.preventDefault();
      const targetId = event.currentTarget.getAttribute('href');
      const duration = 1000;
      let start = null;

      window.requestAnimationFrame(step);

      function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const targetPosition = document.querySelector(targetId).offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;

        window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));

        if (progress < duration) {
          window.requestAnimationFrame(step);
        }
      }
    }

    function easeInOutCubic(progress, startPosition, distance, duration) {
      progress /= duration / 2;
      if (progress < 1) return distance / 2 * progress ** 3 + startPosition;
      progress -= 2;
      return distance / 2 * (progress ** 3 + 2) + startPosition;
    }
  })
})();
