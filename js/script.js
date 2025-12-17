// ===== MOBILE NAVIGATION =====
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

// Show menu
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
    document.body.style.overflow = 'hidden';
  });
}

// Hide menu
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
    document.body.style.overflow = 'auto';
  });
}

// Close menu when clicking on nav links
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
    document.body.style.overflow = 'auto';
  });
});

// ===== ACTIVE NAVIGATION HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector('.nav__link[href*=' + sectionId + ']')
        .classList.add('active-link');
    } else {
      document
        .querySelector('.nav__link[href*=' + sectionId + ']')
        .classList.remove('active-link');
    }
  });
}

window.addEventListener('scroll', scrollActive);

// ===== SCROLL TOP BUTTON =====
const scrollTop = document.getElementById('scroll-top');

function scrollTopBtn() {
  const scrollY = window.pageYOffset;

  if (scrollY >= 560) {
    scrollTop.classList.add('show');
  } else {
    scrollTop.classList.remove('show');
  }
}

window.addEventListener('scroll', scrollTopBtn);

if (scrollTop) {
  scrollTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

// ===== SMOOTH SCROLLING =====
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

smoothScrollLinks.forEach((link) => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  });
});

// ===== SCHEDULE FILTERS =====
const filterBtns = document.querySelectorAll('.filter-btn');
const scheduleRows = document.querySelectorAll('#schedule-table tbody tr');

function filterSchedule(category) {
  scheduleRows.forEach((row) => {
    const rowCategory = row.getAttribute('data-category');
    const rowSport = row.getAttribute('data-sport');

    if (category === 'all' || rowCategory === category) {
      row.style.display = '';
      row.style.animation = 'fadeInUp 0.5s ease';
    } else {
      row.style.display = 'none';
    }
  });
}

// Initialize schedule filters
if (filterBtns.length > 0) {
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      // Filter schedule
      const filter = btn.getAttribute('data-filter');
      filterSchedule(filter);
    });
  });
}

// ===== GALLERY FILTERS =====
const galleryFilters = document.querySelectorAll('.gallery__filter');
const galleryItems = document.querySelectorAll('.gallery__item');

function filterGallery(category) {
  galleryItems.forEach((item) => {
    const itemCategory = item.getAttribute('data-category');

    if (category === 'all' || itemCategory === category) {
      item.style.display = 'block';
      item.style.animation = 'fadeInUp 0.5s ease';
    } else {
      item.style.display = 'none';
    }
  });
}

// Initialize gallery filters
if (galleryFilters.length > 0) {
  galleryFilters.forEach((filter) => {
    filter.addEventListener('click', () => {
      // Remove active class from all filters
      galleryFilters.forEach((f) => f.classList.remove('active'));
      // Add active class to clicked filter
      filter.classList.add('active');

      // Filter gallery
      const filterCategory = filter.getAttribute('data-filter');
      filterGallery(filterCategory);
    });
  });
}

// ===== LIGHTBOX GALLERY =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxCategory = document.getElementById('lightbox-category');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(imgSrc, title, category) {
  lightboxImg.src = imgSrc;
  lightboxTitle.textContent = title;
  lightboxCategory.textContent = category;
  lightbox.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('show');
  document.body.style.overflow = 'auto';
}

// Add click event to gallery items
if (galleryItems.length > 0) {
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.gallery__img');
      const title = item.querySelector('.gallery__title').textContent;
      const category = item.querySelector('.gallery__category').textContent;

      openLightbox(img.src, title, category);
    });
  });
}

// Close lightbox events
if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
}

// Close lightbox with escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('show')) {
    closeLightbox();
  }
});

// ===== FORM VALIDATION =====
const contactForm = document.getElementById('contact-form');

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
  return phone === '' || phoneRegex.test(phone);
}

function showError(input, message) {
  const formGroup = input.parentElement;
  let errorElement = formGroup.querySelector('.error-message');

  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = 'var(--secondary-color)';
    errorElement.style.fontSize = 'var(--small-font-size)';
    errorElement.style.marginTop = 'var(--mb-0-25)';
    formGroup.appendChild(errorElement);
  }

  errorElement.textContent = message;
  input.style.borderColor = 'var(--secondary-color)';
}

function clearError(input) {
  const formGroup = input.parentElement;
  const errorElement = formGroup.querySelector('.error-message');

  if (errorElement) {
    errorElement.remove();
  }

  input.style.borderColor = '#eee';
}

function validateForm() {
  let isValid = true;

  // Clear previous errors
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach((error) => error.remove());

  const inputs = contactForm.querySelectorAll(
    '.form__input, .form__select, .form__textarea'
  );
  inputs.forEach((input) => {
    input.style.borderColor = '#eee';
  });

  // Validate name
  const nameInput = document.getElementById('name');
  if (nameInput.value.trim() === '') {
    showError(nameInput, 'Пожалуйста, введите ваше имя');
    isValid = false;
  }

  // Validate email
  const emailInput = document.getElementById('email');
  if (emailInput.value.trim() === '') {
    showError(emailInput, 'Пожалуйста, введите email');
    isValid = false;
  } else if (!validateEmail(emailInput.value.trim())) {
    showError(emailInput, 'Пожалуйста, введите корректный email');
    isValid = false;
  }

  // Validate phone (optional)
  const phoneInput = document.getElementById('phone');
  if (
    phoneInput.value.trim() !== '' &&
    !validatePhone(phoneInput.value.trim())
  ) {
    showError(phoneInput, 'Пожалуйста, введите корректный номер телефона');
    isValid = false;
  }

  // Validate message length
  const messageInput = document.getElementById('message');
  if (messageInput.value.trim().length < 10) {
    showError(messageInput, 'Сообщение должно содержать не менее 10 символов');
    isValid = false;
  }

  return isValid;
}

// Form submission
if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (validateForm()) {
      const submitBtn = contactForm.querySelector('.form__button');
      const originalText = submitBtn.innerHTML;

      // Show loading state
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Отправка...';
      submitBtn.disabled = true;

      try {
        // Simulate form submission (replace with actual API call)
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
                    <div style="background: var(--accent-color); color: white; padding: var(--mb-1); border-radius: 8px; text-align: center; margin-bottom: var(--mb-1);">
                        <i class="fas fa-check-circle" style="margin-right: var(--mb-0-5);"></i>
                        Спасибо! Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.
                    </div>
                `;
        contactForm.insertBefore(successMessage, contactForm.firstChild);

        // Reset form
        contactForm.reset();

        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      } catch (error) {
        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.innerHTML = `
                    <div style="background: var(--secondary-color); color: white; padding: var(--mb-1); border-radius: 8px; text-align: center; margin-bottom: var(--mb-1);">
                        <i class="fas fa-exclamation-circle" style="margin-right: var(--mb-0-5);"></i>
                        Произошла ошибка при отправке сообщения. Попробуйте еще раз.
                    </div>
                `;
        contactForm.insertBefore(errorMessage, contactForm.firstChild);

        setTimeout(() => {
          errorMessage.remove();
        }, 5000);
      } finally {
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    }
  });

  // Real-time validation
  const inputs = contactForm.querySelectorAll(
    '.form__input, .form__select, .form__textarea'
  );
  inputs.forEach((input) => {
    input.addEventListener('blur', () => {
      clearError(input);

      if (input.id === 'email' && input.value.trim() !== '') {
        if (!validateEmail(input.value.trim())) {
          showError(input, 'Пожалуйста, введите корректный email');
        }
      }

      if (input.id === 'phone' && input.value.trim() !== '') {
        if (!validatePhone(input.value.trim())) {
          showError(input, 'Пожалуйста, введите корректный номер телефона');
        }
      }

      if (
        input.id === 'message' &&
        input.value.trim().length > 0 &&
        input.value.trim().length < 10
      ) {
        showError(input, 'Сообщение должно содержать не менее 10 символов');
      }
    });
  });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

// Add animation class to elements
const animateElements = document.querySelectorAll(`
    .section__header,
    .about__content,
    .about__image,
    .section__card,
    .schedule__filters,
    .schedule__table-wrapper,
    .coach__card,
    .news__card,
    .gallery__filters,
    .gallery__grid,
    .contact__info,
    .contact__form
`);

animateElements.forEach((el) => {
  el.classList.add('animate-on-scroll');
  observer.observe(el);
});

// ===== HEADER BACKGROUND ON SCROLL =====
const header = document.getElementById('header');

function headerBackground() {
  const scrollY = window.pageYOffset;

  if (scrollY >= 100) {
    header.style.background = 'rgba(255, 255, 255, 0.98)';
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.background = 'rgba(255, 255, 255, 0.95)';
    header.style.boxShadow = 'none';
  }
}

window.addEventListener('scroll', headerBackground);

// ===== SCHEDULE INTERACTIVITY =====
const scheduleActivities = document.querySelectorAll('.schedule__activity');

scheduleActivities.forEach((activity) => {
  activity.addEventListener('click', () => {
    const sportName = activity.textContent.trim().split('\n')[0];
    showSportInfo(sportName);
  });
});

function showSportInfo(sportName) {
  // Create modal for sport information
  const modal = document.createElement('div');
  modal.className = 'sport-modal';
  modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    `;

  const modalContent = document.createElement('div');
  modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        max-width: 500px;
        margin: 1rem;
        text-align: center;
        transform: translateY(20px);
        transition: all 0.3s ease;
    `;

  modalContent.innerHTML = `
        <h3 style="font-family: var(--title-font); margin-bottom: 1rem; color: var(--dark-color);">
            Секция ${sportName}
        </h3>
        <p style="color: var(--gray-color); margin-bottom: 1.5rem;">
            Для записи в секцию ${sportName} обратитесь к тренеру или администратору спортивного клуба.
        </p>
        <div style="display: flex; gap: 1rem; justify-content: center;">
            <button class="close-modal" style="
                background: var(--primary-color);
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
            ">Закрыть</button>
            <button class="contact-btn" style="
                background: var(--secondary-color);
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
            ">Связаться с нами</button>
        </div>
    `;

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  // Show modal
  setTimeout(() => {
    modal.style.opacity = '1';
    modal.style.visibility = 'visible';
    modalContent.style.transform = 'translateY(0)';
  }, 10);

  // Close modal events
  const closeBtn = modalContent.querySelector('.close-modal');
  const contactBtn = modalContent.querySelector('.contact-btn');

  closeBtn.addEventListener('click', () => {
    closeModal();
  });

  contactBtn.addEventListener('click', () => {
    closeModal();
    document.querySelector('a[href="#contact"]').click();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  function closeModal() {
    modal.style.opacity = '0';
    modal.style.visibility = 'hidden';
    modalContent.style.transform = 'translateY(20px)';
    setTimeout(() => {
      document.body.removeChild(modal);
    }, 300);
  }

  // Close with escape key
  function handleEscape(e) {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleEscape);
    }
  }

  document.addEventListener('keydown', handleEscape);
}

// ===== NEWS LOAD MORE =====
const newsMoreBtn = document.querySelector('.news__more .button');
let newsLoaded = 0;
const newsPerLoad = 4;

if (newsMoreBtn) {
  newsMoreBtn.addEventListener('click', () => {
    loadMoreNews();
  });
}

function loadMoreNews() {
  // Simulate loading more news (in real app, this would be an API call)
  const newsContainer = document.querySelector('.news__content');

  // Add loading state
  newsMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Загрузка...';
  newsMoreBtn.disabled = true;

  setTimeout(() => {
    // Add more news cards (in real app, this would come from server)
    const additionalNews = createAdditionalNews();
    additionalNews.forEach((news) => {
      newsContainer.appendChild(news);
    });

    // Restore button
    newsMoreBtn.innerHTML = 'Показать еще новости';
    newsMoreBtn.disabled = false;

    newsLoaded += newsPerLoad;

    // Hide button if no more news
    if (newsLoaded >= 12) {
      // Assuming max 12 news items
      newsMoreBtn.style.display = 'none';
    }
  }, 1000);
}

function createAdditionalNews() {
  const newsData = [
    {
      title: 'Новые тренажеры в фитнес-зале',
      excerpt:
        'В нашем фитнес-зале появилось современное оборудование для силовых тренировок.',
      author: 'Светлана Новикова',
      time: '3 дня назад',
      tags: ['Фитнес', 'Оборудование'],
      image:
        'https://static.tildacdn.com/tild3132-3263-4135-b730-303836333164/prVZwKYMw38.jpg',
    },
    {
      title: 'Соревнования по плаванию',
      excerpt:
        'Приглашаем всех желающих принять участие в соревнованиях по плаванию.',
      author: 'Дмитрий Сидоров',
      time: '5 дней назад',
      tags: ['Плавание', 'Соревнования'],
      image:
        'https://chepetsk.ru/upload/iblock/b47/b47edd3d227359cb72f1a2e88ed4ca36.jpg',
    },
    {
      title: 'Мастер-класс по борьбе',
      excerpt:
        'Известный мастер спорта проведет мастер-класс по технике бросков.',
      author: 'Андрей Смирнов',
      time: 'неделю назад',
      tags: ['Борьба', 'Мастер-класс'],
      image:
        'https://en-vst.ru/attachments/4356a46e87a51b093c4716a8b1725abde48f434c/store/crop/0/0/960/1280/800/0/0/0/f03a67bf3f0177bee6a18580640cb4382f95f45047d2811332a6c95e3293/f03a67bf3f0177bee6a18580640cb4382f95f45047d2811332a6c95e3293.txt.jpg',
    },
    {
      title: 'Турнир по настольному теннису',
      excerpt:
        'Организуем внутренний турнир среди студентов по настольному теннису.',
      author: 'Администрация',
      time: '2 недели назад',
      tags: ['Теннис', 'Турнир'],
      image:
        'https://rttf.ru/public/img/photos/18487/img_20251215_002833_461.jpeg',
    },
  ];

  const newsCards = [];

  newsData.forEach((news) => {
    const newsCard = document.createElement('article');
    newsCard.className = 'news__card';
    newsCard.innerHTML = `
            <div class="news__image">
                <img src="${news.image}" alt="${news.title}" class="news__img">
                <div class="news__date">
                    <span class="news__day">${
                      Math.floor(Math.random() * 28) + 1
                    }</span>
                    <span class="news__month">Дек</span>
                </div>
            </div>
            <div class="news__info">
                <div class="news__tags">
                    ${news.tags
                      .map((tag) => `<span class="news__tag">${tag}</span>`)
                      .join('')}
                </div>
                <h3 class="news__title">${news.title}</h3>
                <p class="news__excerpt">${news.excerpt}</p>
                <div class="news__meta">
                    <span class="news__author">
                        <i class="fas fa-user"></i>
                        ${news.author}
                    </span>
                    <span class="news__time">
                        <i class="fas fa-clock"></i>
                        ${news.time}
                    </span>
                </div>
            </div>
        `;

    newsCards.push(newsCard);
  });

  return newsCards;
}

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    element.textContent = Math.floor(start);

    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    }
  }, 16);
}

// Animate stats counters when they come into view
const statNumbers = document.querySelectorAll('.about__stat-number');

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.textContent.replace('+', ''));
        animateCounter(entry.target, target);
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

statNumbers.forEach((stat) => {
  statsObserver.observe(stat);
});

// ===== HERO VIDEO PLACEHOLDER =====
const heroVideo = document.querySelector('.hero__video-placeholder');

if (heroVideo) {
  heroVideo.addEventListener('click', () => {
    // In a real implementation, this would open a video modal or navigate to a video page
    alert('Здесь будет воспроизводиться видео о спортивном клубе НПИ');
  });
}

// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
  // Hide any loading screen if exists
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }

  // Initialize any remaining features
  console.log('Сайт спортивного клуба НПИ загружен успешно!');
});

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Apply throttling to scroll events
window.addEventListener(
  'scroll',
  throttle(() => {
    scrollActive();
    scrollTopBtn();
    headerBackground();
  }, 16)
);

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Add keyboard navigation for gallery
document.addEventListener('keydown', (e) => {
  if (lightbox.classList.contains('show')) {
    if (e.key === 'ArrowLeft') {
      // Navigate to previous image (implement if needed)
    } else if (e.key === 'ArrowRight') {
      // Navigate to next image (implement if needed)
    }
  }
});

// Focus management for modals
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
  console.error('Произошла ошибка:', e.error);
  // In production, you might want to send this to an error tracking service
});
