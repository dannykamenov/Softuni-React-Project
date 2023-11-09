

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

const getMerchant = async (id) => {
    const response = await fetch(`${API_URL}/merchant/${id}`);
    const data = await response.json();
    return data;
};

const getProductById = async (id) => {
    const response = await fetch(`${API_URL}/product/${id}`);
    const data = await response.json();
    return data;
};

const createPaymentIntent = async (amount) => {
    try {
        const response = await fetch(`${API_URL}/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount }),
        });

        // Check if the request was successful
        if (response.ok) {
            const paymentIntentData = await response.json();
            return paymentIntentData; // This will return the entire Payment Intent object
        } else {
            // Handle errors if the server didn't respond with a 2xx status code
            const errorData = await response.json();
            throw new Error(`Error from server: ${errorData.error}`);
        }
    } catch (error) {
        // Handle errors if the fetch itself fails (network error, etc.)
        throw new Error(`Network error: ${error.message}`);
    }
};

const paymentDetails = async (paymentDetails) => {
    try {
        const response = await fetch(`${API_URL}/payment-details`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentDetails),
        });

        // Check if the request was successful
        if (response.ok) {
            const paymentDetailsData = await response.json();
            return paymentDetailsData; // This will return the entire Payment Intent object
        } else {
            // Handle errors if the server didn't respond with a 2xx status code
            const errorData = await response.json();
            throw new Error(`Error from server: ${errorData.error}`);
        }
    } catch (error) {
        // Handle errors if the fetch itself fails (network error, etc.)
        throw new Error(`Network error: ${error.message}`);
    }
};


export const ApiService = {getMerchants, searchMerchants, getMerchant, getProductById, createPaymentIntent, paymentDetails};
