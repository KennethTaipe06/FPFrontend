import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { resetPassword } from "../../features/auth/authSlice"
import { toast } from "react-toastify"
import { BiLogInCircle } from "react-icons/bi"
import Spinner from "../../components/Spinner"
import "./index.css";


const LoginPage = () => {

    const [formData, setFormData] = useState({
        "email": "",
    
    })

    const { email } = formData


    const dispatch = useDispatch()
    const navigate = useNavigate()


    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)


    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const userData = {
            email,
        }
        dispatch(resetPassword(userData))

    }



    useEffect(() =>{    
        if(isSuccess){
            navigate('/')
            toast.success("Password reset link sent to your email")
        }
        if(isError){
            toast.error(message)
        }
    }, [isSuccess, isError, dispatch, navigate])



    return (
        <div className="container auth__container">
            <h1 className="main__title">Reset Password<BiLogInCircle /></h1>
            {isLoading && <Spinner />}
            <form className="auth__form" onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    name="email" 
                    onChange={handleChange} 
                    value={email} 
                    required 
                />
              
                <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Reset Password</button>
            </form>
        </div>
    )
}

export default LoginPage;
