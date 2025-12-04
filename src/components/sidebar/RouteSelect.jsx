import React from 'react';
import {
    faTableColumns,
    faRightFromBracket,
    faGear, faHospitalUser, faStethoscope
} from '@fortawesome/free-solid-svg-icons';
import SidebarRoute from './SidebarRoute';

export const RouteSelect = () => {
    return (
        <div className="space-y-3">
            <SidebarRoute icon={faTableColumns} path="/dashboard/home" title="Dashboard" />
            <SidebarRoute icon={faHospitalUser} path="/dashboard/addpatients" title="Patients" />
            <SidebarRoute icon={faStethoscope} path="/dashboard/team" title="Team" />
            <SidebarRoute icon={faGear} path="/dashboard/settings" title="Settings" />
            <SidebarRoute icon={faRightFromBracket} path="/" title="Logout" />
        </div>
    );
};
