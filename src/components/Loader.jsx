import React from 'react'
import loaderImage from '../assets/loaderImg.gif'

const Loader = () => {
  return (
    <div className='flex justify-center'>
        <img className='w-200' src={loaderImage} alt="" />
    </div>
  )
}

export default Loader