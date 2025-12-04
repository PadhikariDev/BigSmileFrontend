import React from 'react'
import { Topbar } from './Topbar'
import { Grid } from './Grid'

const Home = () => {
    return (
        <div className="bg-[#f2f6fc] h-screen p-2 shadow rounded-lg">
            <Topbar title="Welcome to Dental Clinic Dashboard"
                description="Start your day with a healthy smile – 'Every tooth in a man’s head is more valuable than a diamond.'"
            />
            <Grid />
        </div>
    )
}

export default Home