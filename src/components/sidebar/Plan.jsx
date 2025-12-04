import React from 'react'

export const Plan = () => {
    return (
        <div className="mt-auto border-t border-[#1f0104] py-3">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-semibold text-[#1f0104]">Patient Care</p>
                    <p className="text-xs text-[#555]">A healthy smile is a happy smile.</p>
                </div>
                <button
                    className="px-4 py-2 text-xs font-medium text-white rounded-md 
                 bg-gradient-to-r from-[#FF8008] via-[#FFC837] to-[#FF8008] 
                 bg-[length:200%_auto] bg-left transition-all duration-500 
                 ease-in-out hover:bg-right shadow-md cursor-pointer"
                >
                    Support
                </button>
            </div>
        </div>


    )
}
