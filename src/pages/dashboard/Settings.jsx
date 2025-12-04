// Settings.jsx
import React from "react";
import { Topbar } from "./Topbar";

const Settings = () => {

    return (
        <div className="bg-[#FFFCFB] h-screen flex flex-col p-2 rounded-2xl shadow-md overflow-hidden">

            <Topbar title="Settings" description="Everything you need to know about the app " />
            {/* App Info */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-6">
                <h3 className="font-medium mb-2 text-[#d27f0a]">App Information</h3>
                <p className="text-sm">Version: <span className="font-semibold">0.1</span></p>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-6">
                <h3 className="font-medium mb-2 text-[#d27f0a]">Terms & Conditions</h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    By using this application, you agree to our Terms & Conditions.
                    We are committed to protecting your privacy and ensuring your data
                    is secure. Please use the application responsibly. Misuse or
                    unauthorized access may lead to restrictions. Updates to the terms
                    will be communicated within the app.
                </p>
            </div>

            {/* Footer */}
            <footer className="text-center text-xs text-black mt-10">
                © {new Date().getFullYear()} BigSmile Dental App. All rights reserved.
            </footer>
        </div>
    );
};

export default Settings;
