//GET

// const url = "http://localhost:3000";

const url = "https://camila-mcr.github.io/AluraGeek-api";

const aboutList = () => {
    return fetch(`${url}/about.json`).then((response) => {
        return response.json();
    });
};

export {aboutList}