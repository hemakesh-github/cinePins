function isAuthenticated() {
    var cookies = document.cookie.split(';');
    console.log(cookies)
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith('authenticated=true')) {
            return true;
        }
    }
    return false;
}
