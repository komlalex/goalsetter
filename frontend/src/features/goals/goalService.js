import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000/api";

//Create a new goal
 const setGoal = async (goal, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post("/goals", goal);

    if (response.data) {
        return response.data
    }
}

const updateGoal = async (goal) => {
    const response = await axios.put("/goals", goal);

    if (response.data) {
        return response.data;
    }
}
const getGoal = async () => {
    const response = await axios.get("/goals");

    if (response.data) {
        return response.data
    }
}

const deleteGoal = async () => {
    const response = await axios.delete("/goals");

    if (response.data) {
        return response.data;
    }
}

const goalService = {
    setGoal,
    updateGoal,
    getGoal,
    deleteGoal
}
export default goalService;