document.addEventListener('DOMContentLoaded', () => {

    function get(id) {
        return JSON.parse(localStorage.getItem(id));
    }

    // ---------- CLOCK ----------
    const clock = document.getElementById('clock');
    if (clock && get('clock-text-color')) {
        clock.style.color = get('clock-text-color');
    }

    // ---------- DAY ----------
    const day = document.getElementById('day');
    if (day && get('day-text-color')) {
        day.style.color = get('day-text-color');
    }

    // ---------- WEATHER ----------
    const weatherTemp = document.getElementById('weather-temp');
    if (weatherTemp && get('weather-text-color')) {
        weatherTemp.style.color = get('weather-text-color');
    }

    // Show / hide weather parts
    if (get('show-temperature') === false && weatherTemp) {
        weatherTemp.style.display = 'none';
    }

    const weatherIcon = document.getElementById('weather-icon');
    if (get('show-weather-icon') === false && weatherIcon) {
        weatherIcon.style.display = 'none';
    }

    // ---------- BOTTOM BAR ----------
    const bottomBar = document.getElementById('bottombar');
    if (bottomBar) {
        if (get('show-bottombar') === false) {
            bottomBar.style.display = 'none';
        }

        if (get('bottombar-text-color')) {
            bottomBar.style.color = get('bottombar-text-color');
        }
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

        if (get('background-opacity') !== null) {
            document.body.style.opacity = get('background-opacity');
        }
    }

    // ---------- SIDEBAR ----------
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && get('sidebar-color')) {
        sidebar.style.backgroundColor = get('sidebar-color');
    }

    if (get('sidebar-icon-color')) {
        document.querySelectorAll('.sidebar img, .sidebar p').forEach(el => {
            el.style.color = get('sidebar-icon-color');
            el.style.fill = get('sidebar-icon-color');
        });
    }

});
