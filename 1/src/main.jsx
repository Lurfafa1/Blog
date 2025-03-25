import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import Store from './store/Store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LayoutAuth, Home, Login, Signup, Post, AllPosts, AddPost, EditPost } from './components'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: (
          <LayoutAuth authentication={false}>
            <Login />
          </LayoutAuth>
        )
      },
      {
        path: '/signup',
        element: (
          <LayoutAuth authentication={false}>
            <Signup />
          </LayoutAuth>
        )
      },
      {
        path: '/all-posts',
        element: (
          <LayoutAuth authentication={true}>
            {''}
            <AllPosts />
          </LayoutAuth>
        )
      },
      {
        path: '/add-post',
        element: (
          <LayoutAuth authentication={true}>
            {' '}
            <AddPost />
          </LayoutAuth>
        )
      },
      {
        path: '/edit-post:slug',
        element: (
          <LayoutAuth authentication={true}>
            {' '}
            <EditPost />
          </LayoutAuth>
        )
      },
      {
        path: '/post:slug',
        element: <Post />,
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
