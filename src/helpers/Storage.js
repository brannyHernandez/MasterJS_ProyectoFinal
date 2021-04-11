
function setUser(usuario) {
    localStorage.setItem('USER', usuario);
}

function getUser() {
    return JSON.parse(localStorage.getItem('USER'));
}

function logOut(){
    localStorage.removeItem("USER");
}

export default {
    setUser,
    getUser,
    logOut
 };