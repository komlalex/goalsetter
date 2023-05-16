import {FaTimes, FaEdit} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {deleteGoal, updateGoal} from "../features/goals/goalSlice";
import {toast} from "react-toastify";

function GoalItem(props) {
    const dispatch = useDispatch();
    const {isSuccess} = useSelector(state => state.goal);
    const {goal} = props;

    const handleDelete = () => {
       window.confirm("Deleted goals cannot be recovered. Are you sure you want to deleted this goal?") && dispatch(deleteGoal(goal._id));
    }
    const handleEdit  = () => {
        let text;
        const promptText = window.prompt("Enter new goal here");
        if (!promptText || !promptText.trim) {
            return;
        } else {
            text = promptText
        }
        
        const goalData = {
            id: goal._id,
            text
        }
        dispatch(updateGoal(goalData));
        if (isSuccess) {
            toast.success("Goal Editing Successful");
        }
    }
  return (
    <div className="goal">
        <button onClick={handleEdit}><FaEdit color="green"/></button>
        <div>
            {
                new Date(goal.createdAt).toLocaleString("en-US")
            }
        </div>
        <h2>{goal.text}</h2>
        <button className="close" onClick = { handleDelete }><FaTimes color="red"/></button>
    </div>
  )
}

export default GoalItem