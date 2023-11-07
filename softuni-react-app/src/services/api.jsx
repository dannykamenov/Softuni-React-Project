const API_URL = 'http://localhost:3000/api';

const getMerchants = async () => {
    const response = await fetch(`${API_URL}/merchants`);
    const data = await response.json();
    return data;
};

const searchMerchants = async (searchTerm) => {
    const response = await fetch(`${API_URL}/search?searchTerm=${searchTerm}`);
    const data = await response.json();
    return data;
};


export const ApiService = {getMerchants, searchMerchants};
