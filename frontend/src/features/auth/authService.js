import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5000/api";
const API_URL = "/users/register";


//Register user
const register = async(userData) => {
    const response = await axios.post(API_URL, userData);

    if (response.data ) {
        localStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data;
}

const logout = () =>  {
    localStorage.removeItem("user");
}

const authService = {
    register,
    logout
}

export default authService;