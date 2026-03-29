window.deleteClient = async function(clientId) {
    try {
        await window.api.deleteClient(clientId);
        loadConnectedClients();
    } catch (error) {
        console.error('Error deleting client:', error);
    }
}

async function loadConnectedClients() {
            try {
                const clients = await window.api.getConnectedClients();
                const clientsList = document.getElementById('clients-list');
                
                if (!clients || clients.length === 0) {
                    clientsList.innerHTML = '<p>No clients connected</p>';
                    return;
                }
                
                let html = '<ul style="list-style: none; padding: 0;width: 94vw;">';
                clients.forEach(client => {
                    const connectedTime = new Date(client.connectedAt).toLocaleTimeString();
                    html += `
    <li style="width: 90vw; padding: 10px; margin: 10px; border-radius: 32px; background-color: #333; display: flex; align-items: center;">
        <div>
            <strong>ID:</strong> ${client.id}
            <span style="margin-left: 40px;"></span>
            <strong>Type:</strong> ${client.type} <br>
            <strong>Status:</strong> ${client.status}
            <span style="margin-left: 40px;"></span>
            <strong>Connected At:</strong> ${connectedTime}
        </div>
        <button class="delete-client-btn" onclick="deleteClient('${client.id}')">X</button>
    </li>
`;
                });
                html += '</ul>';
                clientsList.innerHTML = html;
            } catch (error) {
                console.error('Error loading clients:', error);
                document.getElementById('clients-list').innerHTML = '<p>Error loading clients</p>';
            }
        }

        function refresh() {
            loadConnectedClients();
            
            //pop-up message
            const refreshMessage = document.createElement('div');
            refreshMessage.textContent = 'Refreshed!';
            refreshMessage.style.position = 'fixed';
            refreshMessage.style.top = '20vh'; // just below the nav
            refreshMessage.style.left = '50%';
            refreshMessage.style.transform = 'translateX(-50%)';
            refreshMessage.style.backgroundColor = '#333';
            refreshMessage.style.color = '#fff';
            refreshMessage.style.padding = '10px 20px';
            refreshMessage.style.borderRadius = '32px';
            document.getElementById('message').appendChild(refreshMessage);
            setTimeout(() => {
                document.getElementById('message').removeChild(refreshMessage);
            }, 2000);

        }

        function clientPage(pageName) {
            // Placeholder for client subpage functionality
            console.log('Client page:', pageName);
        }

        // Track if auto-refresh is active
        let autoRefreshInterval = null;

        // Load clients when client page is displayed
        const oldPageFunction = page;
        page = function(pageName) {
            oldPageFunction(pageName);
            if (pageName === 'client') {
                loadConnectedClients();
                // Start auto-refresh when client page is shown
                if (!autoRefreshInterval) {
                    autoRefreshInterval = setInterval(loadConnectedClients, 2000);
                }
            } else {
                // Stop auto-refresh when leaving client page
                if (autoRefreshInterval) {
                    clearInterval(autoRefreshInterval);
                    autoRefreshInterval = null;
                }
            }
        };


         // Load server info
        async function loadServerInfo() {
            try {
                const serverInfo = await window.api.getServerInfo();
                document.getElementById('server-url').textContent = serverInfo.url;
                document.getElementById('server-ip').textContent = serverInfo.ip;
                document.getElementById('server-port').textContent = serverInfo.port;

                // Generate QR code
                const qrcodeDiv = document.getElementById('qrcode');
                qrcodeDiv.innerHTML = ''; // Clear previous QR code
                new QRCode(qrcodeDiv, {
                    text: serverInfo.url,
                    width: 200,
                    height: 200,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
                });
            } catch (error) {
                console.error('Error loading server info:', error);
                document.getElementById('server-url').textContent = 'Error loading server info';
            }
        }

        window.addEventListener('load', () => {
            loadServerInfo();
        });
        // Load on page load
        window.addEventListener('load', () => {
            loadConnectedClients();
        });


        //Open Server info page via button
const panel = document.getElementById('server-info');

function changeadddevicebtn(display) {
    const button = document.getElementById('add-device-btn');
    if (display === "block") {
        button.innerText = "Close";
        button.style.backgroundColor = "#bb2c2ce0";
    }else{
        button.innerText = "Add Device";
        button.style.backgroundColor = "#333";

    }
}


function openadddevice(){
    if (panel.style.display === 'none' || panel.style.display === '') {
        panel.style.display = 'block';
        changeadddevicebtn("block");
    } else {
        panel.style.display = 'none';
        changeadddevicebtn("none");
    }
}

panel.style.display = 'none';
changeadddevicebtn("none");