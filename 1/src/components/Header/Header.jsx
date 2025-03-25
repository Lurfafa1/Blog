import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Container, Logo, LogoutBTN } from '../../components'
import { useSelector } from 'react-redux'


const Header = () => {

  const { status: authStatus } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      Url: '/',
      active: true
    },
    {
      name: 'Login',
      Url: '/login',
      active: !authStatus
    },
    {
      name: 'SignUp',
      Url: '/signup',
      active: !authStatus
    },
    {
      name: 'All Posts',
      Url: '/all-posts',
      active: authStatus
    },
    {
      name: 'Add Post',
      Url: '/add-post',
      active: authStatus
    },

  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container className='flex justify-between items-center'>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>

          <ul className='flex ml-auto'>
            {navItems.map((itmes) =>
              itmes.active ? (
                <li key={itmes.name}>
                  <button
                    className='inline-block px-6 py-2 duration-200 hover:bg-blue-600 rounded-full'
                    onClick={() => navigate(itmes.Url)}
                  >
                    {itmes.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBTN />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )

}

export default Header