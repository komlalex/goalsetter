import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5000/api";


//Register user
const register = async(userData) => {
    const response = await axios.post("/users/register", userData);

    if (response.data ) {
        localStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data;
}
//Logout user
const logout = () =>  {
    localStorage.removeItem("user");
}

//Login user
const login = async (userData) => {
    const response = await axios.post("/users/login", userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
}
const authService = {
    register,
    logout,
    login
}

export default authService;