const form = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';

let formData = {
  email: '',
  message: ''
};

function loadSavedData() {
  try {
    const savedData = localStorage.getItem(localStorageKey);
    if (!savedData) return;

    const parsed = JSON.parse(savedData);
    formData = { ...formData, ...parsed };

    form.elements.email.value = formData.email || '';
    form.elements.message.value = formData.message || '';
  } catch (error) {
    console.error('Error loading data:', error);
    localStorage.removeItem(localStorageKey);
  }
}

loadSavedData();

form.addEventListener('input', (e) => {
  const { name, value } = e.target;
  formData[name] = value.trim();
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Form data:', formData);

  localStorage.removeItem(localStorageKey);
  form.reset();
  formData = { email: '', message: '' };
});