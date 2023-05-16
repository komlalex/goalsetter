import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000/api";

//Create a new goal
 const setGoal = async (goalData, token) => {
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post("/goals", goalData, config);
    if (response.data) {
        return response.data
    }
}

const updateGoal = async (goalData, token) => {
    const {id, text} = goalData;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(`/goals/${id}`, {text}, config);

    if (response.data) {
        return response.data;
    }
}

//Get user goals
const getGoals = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get("/goals", config);

    if (response.data) {
        return response.data
    }
}

const deleteGoal = async (goalId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(`/goals/${goalId}`, config);

    if (response.data) {
        return response.data
    }
}

const goalService = {
    setGoal,
    updateGoal,
    getGoals,
    deleteGoal
}
export default goalService;