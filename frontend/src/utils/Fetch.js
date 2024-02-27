import axios from 'axios';

export async function fetchData(url, setData) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_DOMAIN}${url}`);
        const data = response.data;
        setData(data);
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export async function fetchSearchData(url) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_DOMAIN}${url}`);
        return response.data;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}