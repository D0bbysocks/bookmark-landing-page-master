const navToggle = document.querySelector('.nav__toggle');
const featuresTabs = document.querySelectorAll('.features__tab-btn');
const chromeBtn = document.querySelector('#chrome');
const firefoxBtn = document.querySelector('#firefox');
const tabs = document.querySelectorAll('.tabs__panel');
const faqButtons = document.querySelectorAll('.faq__item-toggle');
const emailInput = document.querySelector('#email');
const emailField = document.querySelector('#email-field');
const form = document.querySelector('.cta__form');
const ctaErrorMessage = document.querySelector('#email-error');
const backdrop = document.querySelector('.backdrop');
const navLinks = document.querySelector('.nav__links');


const state = {
  activeTab: featuresTabs[0]?.closest('.features__tab').dataset.tab
};

navToggle.addEventListener('click', () => {
    const isOpen = navToggle.classList.toggle('is-active');
    navToggle.setAttribute('aria-expanded', isOpen);
    backdrop.classList.toggle('is-active');
    document.body.classList.toggle('no-scroll', isOpen);
    document.querySelector('.main-nav').classList.toggle('is-active');
    document.querySelector('.nav__socialBtn').classList.toggle('is-active');
    navLinks.classList.toggle('is-active', isOpen);
});

featuresTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    featuresTabs.forEach(otherTab => {
      otherTab.classList.remove('is-active');
      otherTab.setAttribute('aria-selected', 'false');
    });

    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');

    const selectedTab = tab.closest('.features__tab').dataset.tab;
    state.activeTab = selectedTab;
    showTab(selectedTab);
  });
});


function showTab(tabName) {
  tabs.forEach(panel => {
    panel.hidden = true;
  });

  document.querySelector(`#panel-${tabName}`).hidden = false;
}


function getBrowser() {
  if (navigator.userAgent.includes('Chrome')) {
    chromeBtn.classList.replace('btn--secondary', 'btn--primary');
  } else if (navigator.userAgent.includes('Firefox')) {
    firefoxBtn.classList.replace('btn--secondary', 'btn--primary');
  }
}

getBrowser();



faqButtons.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const contentId = toggle.getAttribute('aria-controls');
    const content = document.getElementById(contentId);

    content.classList.toggle('is-open');
    toggle.classList.toggle('is-active');

    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !expanded);
  });
});



function showError() {
  emailField.classList.add('is-error');
  emailInput.setAttribute('aria-invalid', 'true');
}

function clearError() {
  emailField.classList.remove('is-error');
  emailInput.setAttribute('aria-invalid', 'false');
}

function emailIssue(input) {
  if (input.validity.valueMissing) {
    return 'Email is required';
  }

  if (input.validity.typeMismatch) {
    return "Whoops, make sure it's an email";
  }

  return '';
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const errorMessage = emailIssue(emailInput);

  if (errorMessage) {
    ctaErrorMessage.innerHTML = errorMessage;
    showError();
  } else {
    clearError();
    emailInput.placeholder = "Thanks! We'll keep you updated.";
    emailInput.value = "";
  }
});