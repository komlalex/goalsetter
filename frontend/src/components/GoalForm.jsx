import { useState } from "react";
import { useDispatch } from "react-redux";
import { setGoal } from "../features/goals/goalSlice";
import {toast} from "react-toastify";

function GoalForm() {
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        
        if (!text || !text.trim()) {
            toast.error("Text field is empty");
        } else {
            dispatch(setGoal({text}));
        setText("");
        }
        
    }
  return (
    <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
            <label htmlFor="goal">Goal</label>
            <input name="text" 
            id ="text" 
            type="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)}/>
            </div>
            <div className="form-group">
                <button className="btn btn-block">Set Goal</button>
            </div>
        </form>
    </section>
  )
}

export default GoalForm