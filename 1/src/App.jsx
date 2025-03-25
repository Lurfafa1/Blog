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
    <div className="min-h-screen flex flex-wrap content-between bg-gray-500">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null

}

export default App
