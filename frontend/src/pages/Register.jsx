import { useState , useEffect} from "react";
import { FaUser } from "react-icons/fa";
import Spinner from "../components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import { register, reset } from "../features/auth/authSlice";


function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user, message, isLoading, isSuccess, isError} = useSelector((state) => state.auth);




    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });
    const {name, email, password, password2} = formData;

    useEffect (() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            navigate("/")
        }
       
        dispatch(reset())
    }, [user, message, isError, isSuccess, navigate, dispatch])
    const onChange = (e) => {
        setFormData(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== password2) {
            toast.error("Passwords do not match");
        } else {
            const userData = {
                name, 
                email, 
                password
            }

            dispatch(register(userData))
        }
    }

    if (isLoading) {
        return <Spinner/>
    }
  return (
    <>
        <section className="heading">
            <h1>
                <FaUser/>
            </h1>
            <p>Please create an account</p>
        </section>
        <section className="form">
            <form onSubmit= {onSubmit}>
                <div className="form-group">
                <input type="text" 
                className= "form-control" 
                id="name" name="name" 
                value={name}
                onChange={onChange} 
                placeholder="Enter your name"/>
                </div>

                <div className="form-group">
                <input type="email" 
                className= "form-control" 
                id="email" name="email" 
                value={email}
                onChange={onChange} 
                placeholder="Enter your email"/>
                </div>

                <div className="form-group">
                <input type="password" 
                className= "form-control" 
                id="password" name="password" 
                value={password}
                onChange={onChange} 
                placeholder="Enter password"/>
                </div>

                <div className="form-group">
                <input type="password" 
                className= "form-control" 
                id="password2" name="password2" 
                value={password2}
                onChange={onChange} 
                placeholder="Confirm password"/>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-block">Submit</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Register