import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordConfirm } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {AiFillLock} from 'react-icons/ai'
import Spinner from "../../components/Spinner";
import "./index.css";



const ResetPasswordPageConfirm = () => {
 

    const dispatch = useDispatch()
    const { uid, token } = useParams()
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    const [formData, setFormData] = useState({
        "new_password": "",
        "re_new_password": ""
    })

    const { new_password, re_new_password } = formData

    const naigate = useNavigate()

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const userData = {
            uid,
            token,
            new_password,
            re_new_password
        }
        dispatch(resetPasswordConfirm(userData))
    }

    useEffect(() => {
        if (isSuccess) {
            naigate('/login')
            toast.success("Password reset successfully")
        }
        if (isError) {
            toast.error(message)
        }
    }
    )



    return (
        <div className="container auth__container">
            <h1 className="main__title">Reset Password Page Confirm <AiFillLock/> </h1>
            {isLoading && <Spinner />}
            <form className="auth__form">
                <input type="password"
                    placeholder="New Password"
                    name="new_password"
                    onChange={handleChange} 
                    value={new_password}
                    required    
                />
                <input type="password"
                    placeholder="Re-enter New Password"
                    name="re_new_password"
                    onChange={handleChange} 
                    value={re_new_password}
                    required  
                />
                  <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Confirm password</button>     
            </form>
        </div>
    )
}

export default ResetPasswordPageConfirm;