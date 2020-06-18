import React from 'react'
import '../../css/style.css';

export default function Footer() {
  return (
    // <footer className="bg-royal footer text-white mt-5 p-4 text-center">
    // Copyright &copy; { new Date().getFullYear()} Blue and White Connect
    // </footer>
    <div>
      <div className='phantom' />
      <div className="bg-royal footer text-white mt-5 p-4 text-center" >
          Copyright &copy; { new Date().getFullYear()} Blue and White Connect
      </div>
  </div>
  )
}
