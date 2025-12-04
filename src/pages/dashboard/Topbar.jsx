import React from 'react'
export const Topbar = ({ title, description }) => {
    return (
        <div className='border-b px-4 mb-4 mt-2 pb-2 border-stone-200'>
            <div className="flex items-center justify-between p-0.5">
                <div>
                    <span className="text-sm font-bold block text-[#d27f0a]">{title}</span>
                    <span className="text-sm block text-stone-500">
                        {description}
                    </span>
                </div>

            </div>
        </div>
    )
}
