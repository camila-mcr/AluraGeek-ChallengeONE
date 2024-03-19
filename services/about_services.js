//GET

const url = "https://alurageek-api-1637.onrender.com";

const aboutList = () => {
    return fetch(`${url}/about`).then((response) => {
        return response.json();
    });
};

export {aboutList}