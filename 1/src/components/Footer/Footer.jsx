import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../index'

function Footer() {
  return (
    <footer className="py-6 bg-white border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <Link to="/">
              <Logo width="100px" />
            </Link>
          </div>
          <div className="text-center md:text-right text-gray-600">
            <p>&copy; {new Date().getFullYear()} Blog Project. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer