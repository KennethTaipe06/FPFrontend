import React from "react";
import { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";
import {useNavigate} from 'react-router-dom'
import Spinner from "../../components/Spinner";
import "./index.css";

const RegisterPage = () => {

    const [fomrData, setFormData] = useState({
        "first_name": "",
        "last_name": "",
        "email": "",
        "password": "",
        "re_password": "",
    })

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    const { first_name, last_name, email, password, re_password } = fomrData

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
        console.log(fomrData)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(password !== re_password){
            toast.error("Passwords do not match")
        }else{
            const userData = {
                first_name,
                last_name,
                email,
                password,
                re_password
            }   
            dispatch(register(userData))
        }
        
    }


    useEffect(() => {
        if(isSuccess || user){
            navigate('/')
            toast.success("Registration successful, please check your email to activate your account")
        }
        if(isError){
            toast.error(message)
        }
        dispatch(reset())
    }, [isSuccess, isError, user, dispatch, navigate])

  return (
    <div className="container auth__container">
                <h1 className="main__title">Register <FaUserAlt /></h1>
                {isLoading && <Spinner />}
                <form className="auth__form">
                    <input 
                        type="text" 
                        placeholder="First Name" 
                        name="first_name"
                        onChange={handleChange}
                        value={first_name}
                        required 
                    />
                    <input 
                        type="text" 
                        placeholder="last Name" 
                        name="last_name"
                        onChange={handleChange}
                        value={last_name}
                        required 
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        name="email"
                        onChange={handleChange}
                        value={email}
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        name="password"
                        onChange={handleChange}
                        value={password}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Re-enter Password" 
                        name="re_password"
                        onChange={handleChange}
                        value={re_password}
                        required
                    />
                    <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Register</button>
                </form>
                
            </div>
  );
}


export default RegisterPage; 