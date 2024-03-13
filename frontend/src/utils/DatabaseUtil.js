import axios from 'axios';

export async function fetchData(url, setData = null, eachData = null, target = null, eachTarget = null) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_DOMAIN}${url}`);
        const data = response.data;

        if (target && eachData) {
            for (let i = 0; i < data.length; i++) {
                if (eachTarget) {
                    if (data[i][target] === eachData[eachTarget]) {
                        setData(data[i]);
                        return;
                    }
                } else {
                    if (data[i][target] === eachData) {
                        setData(data[i]);
                        return;
                    }
                }
            }
        }

        if (setData) {
            setData(data);
        } else {
            return data;
        }
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export async function deleteData(url, locationUrl) {
    try {
        await axios.delete(`${process.env.REACT_APP_API_DOMAIN}${url}`);
        window.location.href = locationUrl;
    } catch (error) {
        console.error(error.message);
    }
}

export const postData = async (url, formData) => {
    try {
        await axios.post(`${process.env.REACT_APP_API_DOMAIN}${url}`, formData);
        window.location.reload();
    } catch (error) {
        console.error('Error uploading data:', error);
    }
};