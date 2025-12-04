import React from 'react'
import AccountHandle from './AccountHandle'
import { Plan } from './Plan'
import { RouteSelect } from './RouteSelect'

const Sidebar = () => {
    return (
        <div className='sticky top-4 h-[calc(100vh-28px-8px)] flex flex-col'>
            <AccountHandle />
            <RouteSelect />
            <div className="mt-auto">
                <Plan />
            </div>
        </div>

    )
}

export default Sidebar