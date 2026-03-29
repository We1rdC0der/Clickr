
    //pages
    const welcome = document.getElementById('landing');
    const client = document.getElementById('client');
    const server = document.getElementById('server');
    const settings = document.getElementById('settings');
    const apps = document.getElementById('apps');

    //nav btns
    const welcomeBtn = document.getElementById('welcome-btn');
    const clientBtn = document.getElementById('client-btn');
    const serverBtn = document.getElementById('server-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const appsBtn = document.getElementById('apps-btn');

    // Set welcome as default highlighted
    if (welcomeBtn) welcomeBtn.style.borderBottom = '2px solid #1F6ED5';
    if (welcomeBtn) welcomeBtn.style.color = '#FFF';

function page(pageName) {
    // Hide all pages
    if (welcome) welcome.style.display = 'none';
    if (client) client.style.display = 'none';
    if (server) server.style.display = 'none';
    if (settings) settings.style.display = 'none';
    if (apps) apps.style.display = 'none';
    
    // Clear all button highlights
    if (welcomeBtn) welcomeBtn.style.borderBottom = 'none';
    if (clientBtn) clientBtn.style.borderBottom = 'none';
    if (serverBtn) serverBtn.style.borderBottom = 'none';
    if (settingsBtn) settingsBtn.style.borderBottom = 'none';
    if (appsBtn) appsBtn.style.borderBottom = 'none';

    //clear text color
    if (welcomeBtn) welcomeBtn.style.color = '#808080';
    if (clientBtn) clientBtn.style.color = '#808080';
    if (serverBtn) serverBtn.style.color = '#808080';
    if (settingsBtn) settingsBtn.style.color = '#808080';
    if (appsBtn) appsBtn.style.color = '#808080';

    // Show selected page and highlight button
    if (pageName === 'welcome') {
        if (welcome) welcome.style.display = 'flex';
        if (welcomeBtn) welcomeBtn.style.borderBottom = '2px solid #1F6ED5';
        if (welcomeBtn) welcomeBtn.style.color = '#FFF';
    } else if (pageName === 'client') {
        if (client) client.style.display = 'flex';
        if (clientBtn) clientBtn.style.borderBottom = '2px solid #1F6ED5';
        if (clientBtn) clientBtn.style.color = '#FFF';
    } else if (pageName === 'server') {
        if (server) server.style.display = 'flex';
        if (serverBtn) serverBtn.style.borderBottom = '2px solid #1F6ED5';
        if (serverBtn) serverBtn.style.color = '#FFF';
    } else if (pageName === 'settings') {
        if (settings) settings.style.display = 'flex';
        if (settingsBtn) settingsBtn.style.borderBottom = '2px solid #1F6ED5';
        if (settingsBtn) settingsBtn.style.color = '#FFF';
    } else if (pageName === 'apps') {
        if (apps) apps.style.display = 'flex';
        if (appsBtn) appsBtn.style.borderBottom = '2px solid #1F6ED5';
        if (appsBtn) appsBtn.style.color = '#FFF';
    }
}

