const weatherbutton = document.getElementById('weather-settings-button');
const otherbutton = document.getElementById('other-settings-button');

// --------- SETTINGS TAB SWITCH ---------
weatherbutton.addEventListener('click', () => {
    document.getElementById('start-settings').style.display = 'none';
    document.getElementById('weather-settings').style.display = 'block';
    document.getElementById('Other-Settings').style.display = 'none';
    weatherbutton.style.backgroundColor = '#444';
    otherbutton.style.backgroundColor = '#1a1a1a';
});

otherbutton.addEventListener('click', () => {
    document.getElementById('start-settings').style.display = 'none';
    document.getElementById('Other-Settings').style.display = 'block';
    document.getElementById('weather-settings').style.display = 'none';
    otherbutton.style.backgroundColor = '#444';
    weatherbutton.style.backgroundColor = '#1a1a1a';
});

// --------- DOMContentLoaded ---------
document.addEventListener('DOMContentLoaded', () => {

    // --------- SAVE POPUP FUNCTION ---------
    function showSaveMessage(text = 'Settings saved') {
        const popup = document.getElementById('save-popup');
        const message = document.getElementById('save-message');
        if (!popup || !message) return;

        message.textContent = text;
        popup.classList.remove('hidden');

        setTimeout(() => {
            popup.classList.add('hidden');
        }, 2500);
    }

    // --------- SAVE FUNCTION ---------
    function saveSettings(ids) {
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;

            let value;
            if (el.type === 'checkbox') value = el.checked;
            else value = el.value;

            localStorage.setItem(id, JSON.stringify(value));
        });

        // Show popup after saving
        showSaveMessage();
    }

    // --------- LOAD FUNCTION ---------
    function loadSettings() {
        Object.keys(localStorage).forEach(key => {
            const el = document.getElementById(key);
            if (!el) return;

            const value = JSON.parse(localStorage.getItem(key));

            if (el.type === 'checkbox') el.checked = value;
            else el.value = value;
        });
    }

    // --------- BUTTONS ---------
    const weatherBtn = document.getElementById('save-weather-settings');
    if (weatherBtn) {
        weatherBtn.addEventListener('click', () => {
            saveSettings([
                'weather-api-key',
                'city-name',
                'units',
                'show-weather-icon',
                'show-temperature',
                'show-day',
                'show-date',
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
    'show-day',       // <-- add this
    'show-date',      // <-- add this
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

    // --------- INIT ---------
    loadSettings();
});
