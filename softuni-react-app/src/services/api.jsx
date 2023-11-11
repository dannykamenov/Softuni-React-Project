const API_URL = "http://localhost:3000/api";

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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

const createCoinbaseCharge = async (product, user) => {
  //post request to backend
  const response = await fetch(`${API_URL}/create-coinbase-charge`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product, user }),
  });
  return response.json();
};

const getProducts = async (uid) => {
  const response = await fetch(`${API_URL}/get-products?uid=${uid}`);
  const data = await response.json();
  return data;
};

const getPaymentDetails = async (uid) => {
  const response = await fetch(`${API_URL}/payment-details?uid=${uid}`);
  const data = await response.json();
  return data;
};

const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/product/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

const addProduct = async (product) => {
  const response = await fetch(`${API_URL}/upload-product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  return response.json();
};

const getProduct = async (id) => {
  const response = await fetch(`${API_URL}/product/${id}`);
  const data = await response.json();
  return data;
};

const editProduct = async (id, product) => {
  const response = await fetch(`${API_URL}/product/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  return response.json();
}

export const ApiService = {
  getMerchants,
  searchMerchants,
  getMerchant,
  getProductById,
  createPaymentIntent,
  paymentDetails,
  createCoinbaseCharge,
  getProducts,
  getPaymentDetails,
  deleteProduct,
  addProduct,
  getProduct,
  editProduct
};
