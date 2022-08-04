(_ => {
  document.addEventListener('DOMContentLoaded', function () {
    const imageObserver = new IntersectionObserver((entries, imgObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // advantage lazyload
          if (entry.target.classList.contains('advantage__list-item')) {
            entry.target.classList.add('lazyload');
            imgObserver.unobserve(entry.target);
          }

          // teachers lazyload
          if (entry.target.classList.contains('teachers__card')) {
            const picture = entry.target.querySelector('.teachers__picture');
            const sources = picture.querySelectorAll('source[data-srcset]');
            const img = picture.querySelector('img[data-src]');

            sources.forEach(source => source.srcset = source.dataset.srcset);
            img.src = img.dataset.src;

            imgObserver.unobserve(entry.target);
          }

          // courses lazyload
          if (entry.target.classList.contains('courses__card')) {
            entry.target.classList.add('lazyload');
            imgObserver.unobserve(entry.target);
          }
        }
      });
    });

    // advantage
    const arrAdvantage = document.querySelectorAll('.advantage__list-item');
    arrAdvantage.forEach((e) => {
      imageObserver.observe(e);
    });

    // teachers
    const arrTeachers = document.querySelectorAll('.teachers__card');
    arrTeachers.forEach((e) => {
      imageObserver.observe(e);
    });

    // couses
    const arrCourses = document.querySelectorAll('.courses__card');
    arrCourses.forEach((e) => {
      imageObserver.observe(e);
    })
  });
})();
