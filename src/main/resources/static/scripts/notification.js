const notifications = document.querySelector('.notifications');

function createToast(type, icon, title, text) {
    const newToast = document.createElement('div');
    newToast.innerHTML = `
            <div class="toast ${type}">
                <i class="${icon}"></i>
                <div class="content">
                    <div class="title">${title}</div>
                    <span>${text}</span>
                </div>
                <i class="fa-solid fa-xmark" onclick="(this.parentElement).remove()"></i>
            </div>`;
    notifications.appendChild(newToast);
    newToast.timeOut = setTimeout(
        () => newToast.remove(), 5000
    )
}

function sendSuccessNotification() {
    const type = 'success';
    const icon = 'fa-solid fa-circle-check';
    const title = 'Success';
    const text = 'This is a success toast.';
    createToast(type, icon, title, text);
}

function sendErrorNotification() {
    const type = 'error';
    const icon = 'fa-solid fa-circle-exclamation';
    const title = 'Error';
    const text = 'This is a error toast.';
    createToast(type, icon, title, text);
}

function sendWarningNotification() {
    const type = 'warning';
    const icon = 'fa-solid fa-triangle-exclamation';
    const title = 'Warning';
    const text = 'This is a warning toast.';
    createToast(type, icon, title, text);
}

function sendInfoNotification() {
    const type = 'info';
    const icon = 'fa-solid fa-circle-info';
    const title = 'Info';
    const text = 'This is a info toast.';
    createToast(type, icon, title, text);
}

/**
 * @param {NotificationConfig} config
 */
function sendNotification(config) {
    const type = config.type;
    const text = config.text;
    const title = config.type.toUpperCase();
    const icon = notificationIcon[config.type];

    createToast(type, icon, title, text);
}