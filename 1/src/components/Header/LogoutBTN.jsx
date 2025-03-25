import React from 'react'
import { useDispatch } from 'react-redux'
import authServicObject from '../../appwrite/auth'
import { LogOut } from '../../store/auth-Slice'

const LogoutBTN = () => {
    const dispatch = useDispatch()

    const logOuthandler = () => {
        authServicObject.Logout()
            .then(() => {
                dispatch(LogOut())
            })
    }

  return (
    <button className='' > Logout</button>
  )
}

export default LogoutBTN