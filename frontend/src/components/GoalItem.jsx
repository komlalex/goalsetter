import { useState } from "react";
import {FaTimes, FaPen} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {deleteGoal, updateGoal} from "../features/goals/goalSlice";
import {toast} from "react-toastify";

function GoalItem(props) {
    const [showModal, setShowModal] = useState(false);
    const [newText, setNewText] = useState("")
    const dispatch = useDispatch();
    const {isSuccess} = useSelector(state => state.goal);
    const {goal} = props;

    const handleDelete = () => {
       window.confirm("Deleted goals cannot be recovered. Click Okay to continue") && dispatch(deleteGoal(goal._id));
    }
    const handleUpdate  = (e) => {
        e.preventDefault();
        
        const goalData = {
            id: goal._id,
            text: newText
        }
        dispatch(updateGoal(goalData));
        if (isSuccess) {
            toast.success("Goal Editing Successful");
        }
    }
  return (
    <div className="goal">
        <div>
            {
                new Date(goal.createdAt).toLocaleString("en-US")
            }
        </div>
        <h2>{goal.text}</h2>
        <button className="close" onClick = { handleDelete }><FaTimes color="red"/></button>
        <button className="edit" onClick={ () => setShowModal(!showModal)}><FaPen color="green"/></button>


        <div className = {showModal ? "modal" : "hide"}>
            <div className="heading">
                <h1>Update Goal</h1>
            </div>
            <form onSubmit={handleUpdate}>
                <div className="form-group">
                    <label htmlFor="goal">New Goal</label>
                    <input 
                    type="text"
                    id="goal"
                    placeholder="Enter your new goal"
                    value={newText}
                    onChange = {(e) => setNewText(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <button className="btn btn-block" type="submit">Submit</button>
                </div>
            </form>
            <button className="close" onClick={() => setShowModal(!showModal)}><FaTimes color="red"/></button>
        </div>
    </div>
  )
}

export default GoalItem