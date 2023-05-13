import { useState , useEffect} from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user, isLoading, isSuccess, message, isError} = useSelector((state) => state.auth)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });
    const {email, password} = formData;

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate("/")
        }

        dispatch(reset());
    }, [user, message, isError, isSuccess, navigate, dispatch])
    const onChange = (e) => {
        setFormData(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email,
            password
        }

        dispatch(login(userData))
        
    }

    if (isLoading) {
        return <Spinner/>
    }
  return (
    <>
        <section className="heading">
            <h1>
                <FaSignInAlt/>
            </h1>
            <p>Please log in</p>
        </section>
        <section className="form">
            <form onSubmit= {onSubmit}>
               

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
                    <button type="submit" className="btn btn-block">Submit</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Login