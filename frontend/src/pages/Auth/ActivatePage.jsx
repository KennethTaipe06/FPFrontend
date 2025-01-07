//ActivatePage.jsx

import { useEffect, useState } from 'react'
import { BiUserCheck } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { activate, reset } from '../../features/auth/authSlice'
import { toast } from 'react-toastify'
import React from 'react'
import Spinner from '../../components/Spinner'
import { useNavigate, useParams } from 'react-router-dom'
import "./index.css";

const ActivatePage = () => {

    const {uid, token} = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)


    const handleSubmit = (e) => {
        e.preventDefault()
        const userData = {
            uid,
            token
        }

        dispatch(activate(userData))
        toast.success("Account activated successfully, you can login now")
    }



    return (
        <div>
            {navigate('/login')}
            <div className="container auth__container">
                <h1 className="main__title">Activate Account <BiUserCheck /> </h1>
                {isLoading && <Spinner />}

                <button className="btn btn-accent btn-activate-account" type="submit" onClick={handleSubmit}>Activate Account</button>
            </div>
        </div>
    )
}

export default ActivatePage