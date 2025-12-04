import React from 'react'

import { Topbar } from './Topbar'
import { Grid } from './Grid'
import AddPatients from '../../components/patients/AddPatients'


const Patients = () => {
    return (
        <div className="bg-white h-screen p-2 shadow rounded-lg">
            <Topbar title="Patients"
                description="Add new patient records and view existing patient details." />
            <div>
                <AddPatients />
            </div>
        </div>
    )
}

export default Patients