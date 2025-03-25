import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Login } from '../../store/auth-Slice'
import { Button, Input, Logo } from '../index'
import { useDispatch } from 'react-redux'
import { authServicObject } from '../../components'
import { useForm } from 'react-hook-form'


const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState(null)

    const create = async (data) => {
        setError('')

        try {
            const userData = await authServicObject.createAccount(data)
            if (userData) {
                const dataUser = await authServicObject.getUserCurrent()
                if (dataUser) dispatch(Login(dataUser))
                navigate('/')
            }

        } catch (error) {
            setError(error.message)
        }
    }



    return (
        <div>
            <div>
                <Logo />
            </div>
            <h2>Sign up To create Acount</h2>
            <div>
                Allready have an Account ?&ansp;
                <Link
                    to='/login'
                    className='text-blue-500 hover:text-blue-700'
                >
                    Login
                </Link>
            </div>
            {error &&
                <p className='text-red-600 mt-8 text-center'>{error}</p>
            }
            <form onSubmit={handleSubmit(create)} className='mt-8'>
                <div>

                    <Input
                        label='Name: '
                        placeholder='Enter your Name'
                        {...register('name', {
                            required: true,
                        })}
                    />

                    <Input
                        label='Email: '
                        type='email'
                        placeholder='Enter your Email'
                        {...register('email', {
                            required: true,
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
                        Sign up
                    </Button>
                </div>
            </form>

        </div>
    )
}

export default Signup