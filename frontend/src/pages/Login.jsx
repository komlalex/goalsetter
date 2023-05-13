import { useState , useEffect} from "react";
import { FaSignInAlt } from "react-icons/fa";

function Login() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });
    const {email, password} = formData;
    const onChange = (e) => {
        setFormData(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }
    const onSubmit = () => {

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