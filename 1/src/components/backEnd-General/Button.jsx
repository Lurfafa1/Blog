import React from 'react'

const Button = ({
    children,
    type = 'button',
    bgColor = 'bg-yellow-500',
    textColor = 'text-white',
    className = '',
    ...props
}) => {

  return (
    <button className={` ${type} ${bgColor} ${textColor} ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button