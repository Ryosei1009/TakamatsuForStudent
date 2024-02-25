import axios from 'axios';

export function fetchData(url, setData) {
    axios.get(`${process.env.REACT_APP_API_DOMAIN}${url}`)
        .then((response) => {
            const data = response.data;
            setData(data);
        })
        .catch((error) => {
            console.error(error.message);
        });
}