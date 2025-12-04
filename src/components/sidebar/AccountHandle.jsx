import React from 'react'
import logo from '../../assets/bsLogo.png'
const AccountHandle = () => {
    return (
        <div className='border-b border-[#1f0104] mb-4 mt-2 pb-4'>
            <button className='flex p-0.5 hover:cursor-pointer rounded transition-colors relative gap-2 w-full items-center'>
                <img src={logo}
                    alt="avatar"
                    className='size-10 rounded shrink ' />
                <div className="textStart">
                    <span className='text-sm font-semibold block text-[#1f0104]'>Big Smile Dental</span>
                    <span className='text-xs block text-[#2b2a2a]'>bigsmile@gmail.com</span>
                </div>
            </button>

        </div>
    )
}

export default AccountHandle