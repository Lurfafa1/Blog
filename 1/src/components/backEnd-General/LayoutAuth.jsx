import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LayoutAuth = ({ children, authentication = true }) => {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const statusOfAuth = useSelector(state => state.auth.status)

    useEffect(() => {
        // TODO: make more easy
        // if (statusOfAuth === true) {
        //     navigate('/')
        // }else if (statusOfAuth === false) {
        //     navigate('/login')
        // }

        //let authValue = statusOfAuth === true ? true : false

        if (authentication && statusOfAuth !== authentication) {
            navigate('/login')
        } else if (!authentication && statusOfAuth !== authentication) {
            navigate('/')
        }
        setLoader(false)
    }, [statusOfAuth, navigate, authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}

export default LayoutAuth