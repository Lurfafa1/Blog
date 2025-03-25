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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <div className="flex flex-col items-center">
                    <div className="w-auto h-12 mb-6">
                        <Logo width='100%' />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your Account</h2>
                </div>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have any Account?&nbsp;
                    <Link
                        to='/signup'
                        className='font-medium text-blue-600 hover:text-blue-500'
                    >
                        Sign Up
                    </Link>
                </div>
                {error &&
                    <p className='text-red-600 mt-4 text-center text-sm'>{error}</p>
                }
                <form onSubmit={handleSubmit(methodLogin)} className='mt-8 space-y-6'>
                    <div className="space-y-4">
                        <Input
                            label='Email: '
                            type='email'
                            placeholder='Enter your Email'
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
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
                            label='Password'
                            type='password'
                            placeholder='Enter your password'
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                            {...register('password', {
                                required: true,
                            })}
                        />

                        <Button
                            type='submit'
                            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out'
                        >
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login