const host = "https://web-develop-react-express-chat.herokuapp.com"
const htmlGetUsers = document.querySelector("#getUsers");
const htmlUpdateButton = document.querySelector("#updateButton");

async function get(url) {
    const response = await fetch(url, {
        headers: {
            'Accept': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

async function getUsers () {
    const users = await get(host+"/users/");
    htmlGetUsers.innerText = JSON.stringify(users);
};

function updateButtonClickHandler() {
    getUsers();
}

htmlUpdateButton.addEventListener("click", updateButtonClickHandler)