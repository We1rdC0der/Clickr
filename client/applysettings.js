document.addEventListener('DOMContentLoaded', () => {

    function get(id) {
        const item = localStorage.getItem(id);
        if (item === null) return null;
        return JSON.parse(item);
    }

    // ---------- CLOCK ----------
    const clock = document.getElementById('clock');
    if (clock) {
        if (get('clock-text-color')) clock.style.color = get('clock-text-color');
        if (get('12hr-clock')) clock.classList.add('12hr');
        if (get('hide-secs') === true) clock.classList.add('hide-secs');
        if (get('hide-ampm') === true) clock.classList.add('hide-ampm');
        if (get('hide-extra-zeroes') === true) clock.classList.add('hide-extra-zeroes');
    }

    // ---------- DAY ----------
    const day = document.getElementById('day');
    if (day) {
        if (get('day-text-color')) day.style.color = get('day-text-color');
        if (get('show-day') === false) day.style.display = 'none';
    }

    // ---------- DATE ----------
    const date = document.getElementById('date');
    if (date) {
        if (get('show-date') === false) date.style.display = 'none';
    }

    // ---------- WEATHER ----------
    const weatherTemp = document.getElementById('weather-temp');
    if (weatherTemp) {
        if (get('weather-text-color')) weatherTemp.style.color = get('weather-text-color');
        if (get('show-temperature') === false) weatherTemp.style.display = 'none';
    }

    const weatherIcon = document.getElementById('weather-icon');
    if (weatherIcon && get('show-weather-icon') === false) {
        weatherIcon.style.display = 'none';
    }

    // ---------- BOTTOM BAR ----------
    const bottomBar = document.getElementById('bottombar');
    if (bottomBar) {
        if (get('show-bottombar') === false) bottomBar.style.display = 'none';
        if (get('bottombar-text-color')) bottomBar.style.color = get('bottombar-text-color');
    }

    // ---------- BACKGROUND ----------
    if (get('background-color')) {
        document.body.style.backgroundColor = get('background-color');
    }

    if (get('background-image-url')) {
        document.body.style.backgroundImage = `url("${get('background-image-url')}")`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
    }

    // Opacity applied to a bg overlay, not body (avoids fading all content)
    if (get('background-opacity') !== null) {
        document.body.style.setProperty('--bg-opacity', get('background-opacity'));
    }

});