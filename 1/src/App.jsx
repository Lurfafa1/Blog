import { useEffect, useState } from "react"
import authServicObject from './appwrite/auth'  // Fix import name to match export
import { useDispatch } from 'react-redux'
import { Login, LogOut } from './store/auth-Slice'
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authServicObject.getUserCurrent()
      .then((userData) => {
        if (userData) {
          dispatch(Login({ userData }))
        } else {
          dispatch(LogOut())
        }
      })
      .finally(() => setLoading(false))
  }, [dispatch])


  return !loading ? (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-pulse text-gray-500">Loading...</div>
    </div>
  )

}

export default App
