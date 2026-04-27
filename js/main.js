/* ============================================================
   ROCKIT TALENT — MAIN JAVASCRIPT
   ============================================================ */

/* ============================================================
   1. NAVIGATION
   ============================================================ */
const nav       = document.getElementById('nav');
const navBurger = document.getElementById('navBurger');
const navLinks  = document.getElementById('navLinks');
const navLinkEls = navLinks ? navLinks.querySelectorAll('.nav__link') : [];

window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--scrolled', window.scrollY > 40);
  updateActiveLink();
}, { passive: true });

if (navBurger && navLinks) {
  navBurger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('nav__links--open');
    navBurger.classList.toggle('nav__burger--open', isOpen);
    navBurger.setAttribute('aria-expanded', String(isOpen));
  });

  navLinkEls.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('nav__links--open');
      navBurger.classList.remove('nav__burger--open');
      navBurger.setAttribute('aria-expanded', 'false');
    });
  });
}

// Only track sections that exist on the current page
const sections = ['who-we-are', 'why', 'pipeline', 'pricing', 'guarantees', 'ai-match', 'jobs']
  .filter(id => document.getElementById(id));

function updateActiveLink() {
  const scrollY = window.scrollY + 100;
  let active = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= scrollY) active = id;
  });
  navLinkEls.forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('nav__link--active', href === `#${active}`);
  });
}

/* ============================================================
   2. GSAP ANIMATIONS
   ============================================================ */
gsap.registerPlugin(ScrollTrigger);

// Hero entrance timeline (plays on load, no scroll needed)
const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
heroTl
  .from('.hero__badge',    { opacity: 0, y: 20, duration: 0.6 })
  .from('.hero__title',    { opacity: 0, y: 32, duration: 0.75 }, '-=0.35')
  .from('.hero__desc',     { opacity: 0, y: 20, duration: 0.6  }, '-=0.45')
  .from('.hero__actions',  { opacity: 0, y: 20, duration: 0.5  }, '-=0.35')
  .from('.hero__tags-wrap',{ opacity: 0,         duration: 0.6  }, '-=0.25')
  .from('.hero__stat',     { opacity: 0, y: 16, duration: 0.5, stagger: 0.1 }, '-=0.3');

// Grids with stagger (cards animate together when grid enters viewport)
const staggerGrids = [
  '.why__grid',
  '.who-we-are__grid',
  '.guarantees__grid',
  '.geo__grid',
  '.reviews__grid',
  '.split-cta__grid',
];

const handledByStagger = new Set();

staggerGrids.forEach(selector => {
  const grid = document.querySelector(selector);
  if (!grid) return;
  const cards = grid.querySelectorAll('.fade-up');
  cards.forEach(c => handledByStagger.add(c));

  gsap.to(cards, {
    opacity: 1,
    y: 0,
    duration: 0.65,
    ease: 'power2.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: grid,
      start: 'top 85%',
      once: true,
    },
  });
});

// All other .fade-up elements (section headers, blockquotes, panels, etc.)
document.querySelectorAll('.fade-up').forEach(el => {
  if (handledByStagger.has(el)) return;

  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.65,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 88%',
      once: true,
    },
  });
});

/* ============================================================
   3. JOB BOARD
   ============================================================ */
const jobs = [
  {
    id: 1,
    title: 'Senior Media Buyer',
    categories: ['igaming', 'media-buying', 'senior', 'remote'],
    tags: ['iGaming', 'Media Buying', 'Senior'],
    salary: '$3,500 – 5,000',
    location: 'Remote',
    format: 'Remote',
    badge: 'hot',
  },
  {
    id: 2,
    title: 'Head of Affiliate',
    categories: ['igaming', 'affiliate', 'senior'],
    tags: ['iGaming', 'Affiliate', 'Head'],
    salary: 'від $4,000',
    location: 'Warsaw / Remote',
    format: 'Hybrid',
    badge: 'new',
  },
  {
    id: 3,
    title: 'Traffic Manager',
    categories: ['igaming', 'remote'],
    tags: ['iGaming', 'Traffic'],
    salary: '$1,800 – 2,800',
    location: 'Remote',
    format: 'Remote',
    badge: null,
  },
  {
    id: 4,
    title: 'Affiliate Manager',
    categories: ['affiliate', 'remote'],
    tags: ['Affiliate', 'AdTech'],
    salary: '$2,200 – 3,500',
    location: 'Remote',
    format: 'Remote',
    badge: 'new',
  },
  {
    id: 5,
    title: 'Senior Python Developer',
    categories: ['igaming', 'tech', 'senior', 'remote'],
    tags: ['iGaming', 'Tech', 'Python', 'Senior'],
    salary: '$3,000 – 4,500',
    location: 'Remote',
    format: 'Remote',
    badge: null,
  },
  {
    id: 6,
    title: 'CMO',
    categories: ['igaming', 'senior'],
    tags: ['iGaming', 'C-Level', 'Senior+'],
    salary: 'від $6,000',
    location: 'Hybrid EU',
    format: 'Hybrid',
    badge: 'hot',
  },
  {
    id: 7,
    title: 'QA Engineer Automation',
    categories: ['igaming', 'tech', 'remote'],
    tags: ['iGaming', 'Tech', 'QA'],
    salary: 'Незабаром',
    location: 'Remote',
    format: 'Remote',
    badge: 'soon',
  },
];

const badgeLabels = { hot: 'Hot', new: 'New', soon: 'Soon' };
const badgeClasses = { hot: 'job-badge--hot', new: 'job-badge--new', soon: 'job-badge--soon' };

function renderJobs(filter = 'all') {
  const grid = document.getElementById('jobsGrid');
  if (!grid) return;

  grid.innerHTML = '';

  const filtered = filter === 'all'
    ? jobs
    : jobs.filter(j => j.categories.includes(filter));

  if (!filtered.length) {
    grid.innerHTML = '<p style="color:var(--muted);grid-column:1/-1;text-align:center;padding:40px 0;">Вакансій за цим фільтром поки немає.</p>';
    return;
  }

  filtered.forEach((job, i) => {
    const badge = job.badge
      ? `<span class="job-badge ${badgeClasses[job.badge]}">${badgeLabels[job.badge]}</span>`
      : '';

    const tags = job.tags
      .map(t => `<span class="tag tag--sm">${t}</span>`)
      .join('');

    const card = document.createElement('article');
    card.className = 'job-card fade-up';
    card.style.transitionDelay = `${i * 0.06}s`;
    card.setAttribute('aria-label', job.title);
    card.innerHTML = `
      <div class="job-card__top">
        <h3 class="job-card__title">${job.title}</h3>
        <div class="job-card__badges">${badge}</div>
      </div>
      <div class="job-card__tags">${tags}</div>
      <div class="job-card__meta">
        <span>📍 ${job.location}</span>
        <span>🏠 ${job.format}</span>
      </div>
      <div class="job-card__footer">
        <span class="job-card__salary">${job.salary}</span>
        <a href="#contact" class="btn btn--outline btn--small">Відгукнутись →</a>
      </div>
    `;
    grid.appendChild(card);
  });

  // Animate newly rendered cards with GSAP
  const cards = grid.querySelectorAll('.fade-up');
  gsap.to(cards, {
    opacity: 1,
    y: 0,
    duration: 0.55,
    ease: 'power2.out',
    stagger: 0.06,
    scrollTrigger: {
      trigger: grid,
      start: 'top 88%',
      once: true,
    },
  });
}

// Filter buttons
const filterBtns = document.querySelectorAll('.jobs__filter');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('jobs__filter--active'));
    btn.classList.add('jobs__filter--active');
    renderJobs(btn.dataset.filter);
  });
});

renderJobs(); // Initial render

/* ============================================================
   4. PRICING TABS
   ============================================================ */
const pricingTabs   = document.querySelectorAll('.pricing__tab');
const pricingPanels = {
  base: document.getElementById('pricingBase'),
  cold: document.getElementById('pricingCold'),
};

pricingTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    pricingTabs.forEach(t => {
      t.classList.remove('pricing__tab--active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('pricing__tab--active');
    tab.setAttribute('aria-selected', 'true');

    Object.entries(pricingPanels).forEach(([key, panel]) => {
      if (!panel) return;
      panel.classList.toggle('pricing__panel--hidden', key !== target);
    });

    // Animate new panel items
    const activePanel = pricingPanels[target];
    if (activePanel) {
      activePanel.querySelectorAll('.fade-up').forEach(el => {
        el.classList.remove('fade-up--visible');
        requestAnimationFrame(() => {
          setTimeout(() => el.classList.add('fade-up--visible'), 10);
        });
      });
    }
  });
});

/* ============================================================
   5. AI MATCH DEMO
   ============================================================ */
const candidates = [
  {
    role:     'Senior Media Buyer',
    exp:      '5 років досвіду',
    tags:     ['Facebook Ads', 'TikTok', 'UAC', 'iGaming'],
    salary:   '$4,500 – 6,000',
    format:   'Remote',
    match:    94,
  },
  {
    role:     'Head of Affiliate',
    exp:      '7 років досвіду',
    tags:     ['Affiliate Networks', 'CPA', 'RevShare', 'BizDev'],
    salary:   'від $5,000',
    format:   'Remote / Relocate',
    match:    88,
  },
  {
    role:     'Affiliate Manager',
    exp:      '3 роки досвіду',
    tags:     ['iGaming', 'CPA', 'B2B', 'Партнерки'],
    salary:   '$2,500 – 3,500',
    format:   'Remote',
    match:    76,
  },
];

const matchCard = document.getElementById('matchCard');

if (matchCard) {
  let currentMatch = 0;
  let isAnimating  = false;

  const matchPct          = document.getElementById('matchPct');
  const matchRole         = document.getElementById('matchRole');
  const matchExp          = document.getElementById('matchExp');
  const matchTagsEl       = document.getElementById('matchTags');
  const matchSalary       = document.getElementById('matchSalary');
  const matchFormat       = document.getElementById('matchFormat');
  const matchCounter      = document.getElementById('matchCounter');
  const matchNotification = document.getElementById('matchNotification');
  const matchLike         = document.getElementById('matchLike');
  const matchSkip         = document.getElementById('matchSkip');

  function updateMatchCard(candidate) {
    matchPct.textContent    = `${candidate.match}%`;
    matchRole.textContent   = candidate.role;
    matchExp.textContent    = candidate.exp;
    matchSalary.textContent = candidate.salary;
    matchFormat.textContent = candidate.format;
    matchTagsEl.innerHTML   = candidate.tags
      .map(t => `<span class="tag tag--sm">${t}</span>`)
      .join('');
    matchCounter.textContent = currentMatch + 1;
  }

  function animateCard(exitClass, onDone) {
    if (isAnimating) return;
    isAnimating = true;
    matchCard.classList.add(exitClass);
    setTimeout(() => {
      matchCard.classList.remove(exitClass);
      matchCard.classList.add('match-card--enter');
      currentMatch = (currentMatch + 1) % candidates.length;
      updateMatchCard(candidates[currentMatch]);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          matchCard.classList.remove('match-card--enter');
          isAnimating = false;
          if (onDone) onDone();
        });
      });
    }, 350);
  }

  function showMatchNotification() {
    matchNotification.classList.add('match-notification--visible');
    setTimeout(() => matchNotification.classList.remove('match-notification--visible'), 2200);
  }

  matchLike.addEventListener('click', () => {
    if (isAnimating) return;
    matchCard.classList.add('match-card--like-flash');
    setTimeout(() => matchCard.classList.remove('match-card--like-flash'), 400);
    animateCard('match-card--exit-right', showMatchNotification);
  });

  matchSkip.addEventListener('click', () => {
    if (isAnimating) return;
    animateCard('match-card--exit-left');
  });

  updateMatchCard(candidates[0]);
}

/* ============================================================
   6. PIPELINE STEPS
   ============================================================ */
const pipelineSteps = [
  {
    num: '01', name: 'Бриф', time: 'День 1',
    title: 'Детальний бриф',
    desc: 'Заповнюєте коротку форму або проводимо 20-хвилинний дзвінок. Уточнюємо роль, завдання, команду та red flags. Фіксуємо очікування і терміни.',
    cards: [
      { icon: '📋', label: 'Форма брифу',   text: 'Назва, формат, завдання та вимоги до кандидата' },
      { icon: '🎯', label: 'Профіль ролі',  text: 'Hard/soft skills, психотип та KPI позиції' },
      { icon: '⏱️', label: 'Строки',        text: 'Дедлайн та пріоритетність позиції' },
    ],
  },
  {
    num: '02', name: 'Пошук і сорсинг', time: 'Дні 1–3',
    title: 'Активний сорсинг',
    desc: 'Паралельний пошук по власній базі та холодний аутріч. Перевіряємо LinkedIn, Telegram, внутрішні бази та нетворк агенції зі спеціалістів ніші.',
    cards: [
      { icon: '🗄️', label: 'База кандидатів', text: 'Верифіковані профілі зі скринінгом' },
      { icon: '📨', label: 'Cold outreach',    text: 'Персоналізований аутріч у LinkedIn / Telegram' },
      { icon: '🌐', label: 'Нетворк',          text: 'Референси від довірених контактів в ніші' },
    ],
  },
  {
    num: '03', name: 'Скринінг', time: 'Дні 2–5',
    title: 'Внутрішній скринінг',
    desc: 'Проводимо розмову з кожним кандидатом. Перевіряємо реальний досвід, мотивацію та відповідність ролі. До вас доходить тільки 5% відібраних.',
    cards: [
      { icon: '💬', label: 'Дзвінок-скринінг', text: 'Перевірка досвіду, мотивації та культурного fit' },
      { icon: '🔍', label: 'Перевірка досвіду', text: 'Реальні кейси, цифри та результати роботи' },
      { icon: '🚩', label: 'Red flags',         text: 'Виявлення ризиків до витрат вашого часу' },
    ],
  },
  {
    num: '04', name: 'Психометрика', time: 'Дні 3–6',
    title: 'Психологічний профіль',
    desc: 'Для топ-кандидатів проводимо психометричну оцінку. Визначаємо тип мислення, стресостійкість та сумісність з командою і культурою компанії.',
    cards: [
      { icon: '🧠', label: 'Тип мислення',    text: 'Аналітик, creative, управлінець' },
      { icon: '💪', label: 'Стресостійкість', text: 'Поведінка в конфліктах та під тиском' },
      { icon: '🤝', label: 'Командний fit',   text: 'Сумісність з культурою компанії' },
    ],
  },
  {
    num: '05', name: 'Шортліст', time: 'Дні 5–7',
    title: 'Шортліст: 2–5 кандидатів',
    desc: 'Готуємо досьє на 2–5 кращих кандидатів: резюме, результати скринінгу, психопрофіль та коментар рекрутера. Без зайвого — тільки релевантне.',
    cards: [
      { icon: '📄', label: 'Досьє',       text: 'Резюме + результати оцінки + коментар' },
      { icon: '⭐', label: 'Рейтинг',     text: 'Кандидати ранжовані за fit-score' },
      { icon: '📊', label: 'Порівняння',  text: 'Сильні та слабкі сторони кожного' },
    ],
  },
  {
    num: '06', name: 'Координація', time: 'Тижні 1–3',
    title: 'Координація інтерв\'ю',
    desc: 'Узгоджуємо графік між кандидатом і компанією. Готуємо обидві сторони, збираємо зворотній зв\'язок і тримаємо процес у русі без затримок.',
    cards: [
      { icon: '📅', label: 'Розклад',    text: 'Узгодження часу без втрат для вас' },
      { icon: '🎓', label: 'Підготовка', text: 'Брифінг кандидата перед кожним етапом' },
      { icon: '🔄', label: 'Фідбек',     text: 'Збираємо відгук після кожного інтерв\'ю' },
    ],
  },
  {
    num: '07', name: 'Офер та підтримка', time: 'Після виходу',
    title: 'Офер і підтримка 30 днів',
    desc: 'Допомагаємо з переговорами та оферлетером. Після виходу — підтримка кандидата 30 днів. Безкоштовна заміна, якщо щось пішло не так.',
    cards: [
      { icon: '✍️', label: 'Офер',             text: 'Допомога з офером та переговорами' },
      { icon: '🛡️', label: 'Гарантія 30 днів', text: 'Заміна безкоштовно якщо не пройшов ІС' },
      { icon: '⭐', label: 'Premium 60 днів',  text: '+20% — розширене покриття та виділений рекрутер' },
    ],
  },
];

function renderPipelineDetail(step) {
  const cards = step.cards.map(c => `
    <div class="pipeline__detail-card">
      <span class="pipeline__detail-card-icon">${c.icon}</span>
      <span class="pipeline__detail-card-label">${c.label}</span>
      <span class="pipeline__detail-card-text">${c.text}</span>
    </div>
  `).join('');

  return `
    <div class="pipeline__detail-label">Крок ${step.num}</div>
    <h3 class="pipeline__detail-title">${step.title}</h3>
    <p class="pipeline__detail-desc">${step.desc}</p>
    <div class="pipeline__detail-cards">${cards}</div>
  `;
}

const pipelineDetail = document.getElementById('pipelineDetail');

if (pipelineDetail) {
  const pipelineNavItems = document.querySelectorAll('.pipeline__nav-item');
  let activePipelineStep = -1;

  function switchPipelineStep(index) {
    if (index === activePipelineStep) return;
    pipelineNavItems.forEach((item, i) => {
      item.classList.toggle('pipeline__nav-item--active', i === index);
      item.setAttribute('aria-selected', String(i === index));
    });
    activePipelineStep = index;
    const step = pipelineSteps[index];
    if (pipelineDetail.children.length === 0) {
      pipelineDetail.innerHTML = renderPipelineDetail(step);
      return;
    }
    gsap.to(pipelineDetail, {
      opacity: 0, y: 10, duration: 0.18, ease: 'power2.in',
      onComplete: () => {
        pipelineDetail.innerHTML = renderPipelineDetail(step);
        gsap.fromTo(pipelineDetail,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out' }
        );
      },
    });
  }

  pipelineNavItems.forEach((item, i) => {
    item.addEventListener('click', () => switchPipelineStep(i));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); switchPipelineStep(i); }
      if (e.key === 'ArrowDown') { e.preventDefault(); switchPipelineStep(Math.min(i + 1, pipelineNavItems.length - 1)); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); switchPipelineStep(Math.max(i - 1, 0)); }
    });
  });

  switchPipelineStep(0);
}

/* ============================================================
   7. CONTACT FORM
   ============================================================ */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const required = contactForm.querySelectorAll('[required]');
    let valid = true;

    required.forEach(field => {
      field.classList.remove('input--error');
      if (!field.value.trim()) {
        field.classList.add('input--error');
        valid = false;
      }
    });

    if (!valid) {
      const first = contactForm.querySelector('.input--error');
      if (first) first.focus();
      return;
    }

    // Success state
    // TODO: Replace with Formspree endpoint or your backend:
    // fetch('https://formspree.io/f/YOUR_FORM_ID', { method:'POST', body: new FormData(contactForm) })
    contactForm.querySelectorAll('input, select, textarea, button[type=submit]')
      .forEach(el => el.disabled = true);

    formSuccess.setAttribute('aria-hidden', 'false');
    formSuccess.classList.add('form-success--visible');
  });

  // Clear error on input
  contactForm.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('input--error'));
  });
}

/* ============================================================
   8. SMOOTH SCROLL (offset for fixed nav)
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
