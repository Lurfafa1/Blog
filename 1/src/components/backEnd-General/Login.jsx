import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Login as StoreLogin } from '../../store/auth-Slice'
import { Button, Input, Logo } from '../index'
import { useDispatch } from 'react-redux'
import { authServicObject } from '../../components'
import { useForm } from 'react-hook-form'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, } = useForm()
    const [error, setError] = useState('')

    const methodLogin = async (data) => {
        setError('')

        try {

            const session = await authServicObject.Login(data)
            if (session) {
                const userData = await authServicObject.getUserCurrent()
                if (userData) {
                    dispatch(StoreLogin(userData))
                }
                navigate('/')
            }

        } catch (error) {
            setError(error.message)
        }
    }


    return (
        <div>
            <div>
                <div>
                    <Logo width='100%' />
                </div>
                <h2>Sign in to your Acount</h2>
            </div>
            <div>
                Don&apos;t have any Account ?&ansp;
                <Link
                    to='/signup'
                    className='text-blue-500 hover:text-blue-700'
                >
                    Sign Up
                </Link>
            </div>
            {error &&
                <p className='text-red-600 mt-8 text-center'>{error}</p>
            }
            <form onSubmit={handleSubmit(methodLogin)} className='mt-8'>
                <div>
                    <Input
                        label='Email: '
                        type='email'
                        placeholder='Enter your Email'
                        {...register('email', {
                            required: true,
                            validate: {
                                matchPatern: (value) => (
                                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                                        .test(value) ||
                                    "Invalid email"
                                )
                            }
                        })}
                    />

                    <Input
                        label='password'
                        type='password'
                        placeholder='Enter your password'
                        {...register('password', {
                            required: true,
                        })}
                    />

                    <Button
                        type='submit'
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px'
                    >
                        Sign in
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Login