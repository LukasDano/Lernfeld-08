/**
 * Gibt den Wert des Cookies als String zurück.
 * Wenn der Cookie nicht existiert, wird ein leer String **""** zurückgegeben.
 * @param {string} name Name unter dem der Cookie gespeichert wurde
 * @returns {string} Der Wert des Cookies
 */
function getCookie(name) {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split("=");
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
}

/**
 * Gibt den Wert eines Cookies als boolean zurück.
 * Es wird auch **false** zurückgegeben, wenn der Cookie nicht existiert
 * @param {string} name Name unter dem der Cookie gespeichert wurde
 * @returns {boolean} Den Wert des Cookies
 */
function getBooleanCookie(name) {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split("=");
        if (cookieName === name) {
            if (cookieValue === "true") {
                return true;
            } else if (cookieValue === "false" || cookieValue === null) {
                return false;
            }
        }
    }
}

/**
 * Setzt einen Cookie, der sich nach 1 Minute löscht
 * @param {string} name Name des Cookies
 * @param {string} value Wert des Cookies
 */
function setCookieForOneMinute(name, value) {
    const cookiePath = getCurrentPath();
    const now = new Date();
    const expiresDate = new Date(now.getTime() + (60 * 1000));
    const expires = "; expires=" + expiresDate.toUTCString();
    document.cookie =
        name + "=" + encodeURIComponent(value) + expires + "; path=" + cookiePath;
}

/**
 * Gibt den aktuellen Pfad aus der URL aus.
 * Das genaue HTML-Dokument wird dabei ignoriert.
 * @return {string} Den aktuellen Pfad
 */
function getCurrentPath() {
    const fullPath = window.location.pathname;
    return fullPath.substring(0, fullPath.lastIndexOf('/') + 1);
}