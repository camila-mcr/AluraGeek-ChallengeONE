//GET

const moreInfoList = () => {
    return fetch("http://localhost:3000/more_info").then((response) => {
        return response.json();
    });
};

export {moreInfoList}