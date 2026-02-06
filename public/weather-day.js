document.addEventListener('DOMContentLoaded', () => {

  // ---------- HELPERS ----------
  function getSetting(key, fallback = null) {
    const val = localStorage.getItem(key);
    return val !== null ? JSON.parse(val) : fallback;
  }

  function saveSetting(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function showPopup(text, id='save-popup', duration=2500) {
    const popup = document.getElementById(id);
    if (!popup) return;
    popup.textContent = text;
    popup.classList.remove('hidden');
    setTimeout(() => popup.classList.add('hidden'), duration);
  }

  function showError(msg) {
    showPopup(msg, 'error-popup', 5000);
  }

  // ---------- APPLY VISUAL SETTINGS ----------
  function applyVisualSettings() {
    const clockEl = document.getElementById('clock');
    const dayEl = document.getElementById('day');
    const weatherTempEl = document.getElementById('weather-temp');
    const weatherIconEl = document.getElementById('weather-icon');
    const bottomBarEl = document.getElementById('bottombar');
    const sidebarEl = document.querySelector('.sidebar');

    if (clockEl) clockEl.style.color = getSetting('clock-text-color', '#FFFFFF');
    if (dayEl) {
      dayEl.style.color = getSetting('day-text-color', '#FFFFFF');
      dayEl.style.display = getSetting('show-day', true) ? '' : 'none';
    }
    if (weatherTempEl) {
      weatherTempEl.style.color = getSetting('weather-text-color', '#FFFFFF');
      weatherTempEl.style.display = getSetting('show-temperature', true) ? '' : 'none';
    }
    if (weatherIconEl) {
      weatherIconEl.style.display = getSetting('show-weather-icon', true) ? '' : 'none';
    }
    if (bottomBarEl) {
      bottomBarEl.style.color = getSetting('bottombar-text-color', '#FFFFFF');
      bottomBarEl.style.display = getSetting('show-bottombar', true) ? '' : 'none';
    }
    if (sidebarEl) {
      sidebarEl.style.backgroundColor = getSetting('sidebar-color', '#141414');
      const icons = sidebarEl.querySelectorAll('img, p');
      icons.forEach(icon => icon.style.color = getSetting('sidebar-icon-color', '#FFFFFF'));
    }
    document.body.style.backgroundColor = getSetting('background-color', '#141414');
    const bgImage = getSetting('background-image-url', '');
    if (bgImage) {
      document.body.style.backgroundImage = `url(${bgImage})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundPosition = 'center';
      document.body.style.opacity = getSetting('background-opacity', 1);
    } else {
      document.body.style.backgroundImage = '';
    }
  }


// ---------- UPDATE DAY & DATE ----------
function updateDayDate() {
    const dayDateEl = document.getElementById('day');
    if (!dayDateEl) return;

    // Check settings
    const showDay = getSetting('show-day', true);
    const showDate = getSetting('show-date', true);

    dayDateEl.style.display = (showDay || showDate) ? '' : 'none';

    if (!showDay && !showDate) return;

    const today = new Date();

    const weekday = today.toLocaleDateString(undefined, { weekday: 'short' }); // "Wed"
    const monthDay = today.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }); // "Feb 5"

    let text = '';
    if (showDay) text += weekday;
    if (showDate) text += (text ? ', ' : '') + monthDay;

    dayDateEl.textContent = text; // "Wed, Feb 5"
}

// Optional: call this every second if you want it live updating
setInterval(updateDayDate, 1800000); // every 30 min



  

  // ---------- WEATHER API ----------
  async function loadWeather() {
    const apiKey = getSetting('weather-api-key');
    const zip = getSetting('city-name');
    const unit = getSetting('units', 'imperial');

    if (!apiKey) return showError('Weather API key is missing. Add one in Settings.');
    if (!zip) return showError('ZIP code is missing. Add one in Settings.');

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}&units=${unit}`
      );
      const data = await response.json();

      if (!response.ok) {
        if (data.cod === 401) showError('Invalid API key.');
        else if (data.cod === 404) showError('Invalid ZIP code.');
        else showError('Weather service error.');
        return;
      }

      const weatherTemp = document.getElementById('weather-temp');
      const weatherIcon = document.getElementById('weather-icon');

      if (weatherTemp && getSetting('show-temperature', true)) {
        weatherTemp.textContent = `${Math.round(data.main.temp)}°${unit === 'imperial' ? 'F' : 'C'}`;
      }

      if (weatherIcon && getSetting('show-weather-icon', true)) {
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      }

      updateDayDate();

    } catch (err) {
      showError('Network error. Check your connection.');
      console.error(err);
    }
  }

  // ---------- SAVE SETTINGS ----------
  function saveSettings(ids) {
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      let value = el.type === 'checkbox' ? el.checked : el.value;
      saveSetting(id, value);
    });

    applyVisualSettings();
    updateDayDate();
    showPopup('Settings saved!');
    loadWeather(); // refresh weather with new API/unit/ZIP
  }

  // ---------- LOAD SETTINGS ----------
  function loadSettings() {
    Object.keys(localStorage).forEach(key => {
      const el = document.getElementById(key);
      if (!el) return;
      const value = JSON.parse(localStorage.getItem(key));
      if (el.type === 'checkbox') el.checked = value;
      else el.value = value;
    });

    applyVisualSettings();
    updateDayDate();
  }

  // ---------- BUTTONS ----------
  const weatherBtn = document.getElementById('save-weather-settings');
  if (weatherBtn) {
    weatherBtn.addEventListener('click', () => {
      saveSettings([
        'weather-api-key',
        'city-name',
        'units',
        'show-weather-icon',
        'show-temperature',
        'weather-text-color'
      ]);
    });
  }

  const otherBtn = document.getElementById('save-other-settings');
  if (otherBtn) {
    otherBtn.addEventListener('click', () => {
      saveSettings([
        'clock-text-color',
        'day-text-color',
        'show-day',
        'show-date',
        'bottombar-text-color',
        'show-bottombar',
        'background-color',
        'background-image-url',
        'background-opacity',
        'sidebar-color',
        'sidebar-icon-color'
      ]);
    });
  }

  // ---------- INIT ----------
  loadSettings();
  loadWeather();

  // ---------- AUTO REFRESH WEATHER ----------
  setInterval(loadWeather, 1800000); // every 30 min

});
