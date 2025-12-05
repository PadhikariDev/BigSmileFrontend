import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from "react-hot-toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { BeatLoader } from 'react-spinners';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Doctors = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [doctorName, setDoctorName] = useState("");
    const [doctorSpeciality, setDoctorSpeciality] = useState("");
    const [doctorImage, setDoctorImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const API = import.meta.env.VITE_BACKEND_URL;
    const API_URL = `${API}/api/doctors`;
    const token = localStorage.getItem("token"); // get token

    const showTemporaryAlert = () => {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    // Handle 401 error globally
    const handleUnauthorized = () => {
        toast.error("Unauthorized. Please log in again.");
        // Optional: redirect to login page
        // window.location.href = "/login";
    };

    // Fetch doctors
    const fetchDoctors = async () => {
        if (!token) return handleUnauthorized();

        setIsLoading(true);
        try {
            const res = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDoctors(res.data.doctors || res.data);
        } catch (err) {
            if (err.response && err.response.status === 401) {
                handleUnauthorized();
            } else {
                console.error(err);
                toast.error("Failed to fetch doctors");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    // Add doctor
    const handleAdd = async (e) => {
        e.preventDefault();
        if (!doctorName || !doctorSpeciality || !doctorImage) {
            showTemporaryAlert();
            return;
        }

        if (!token) return handleUnauthorized();

        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("name", doctorName);
            formData.append("speciality", doctorSpeciality);
            formData.append("image", doctorImage);

            const res = await axios.post(API_URL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                },
            });

            setDoctors(prev => [...prev, res.data.doctor || res.data]);
            setDoctorName("");
            setDoctorSpeciality("");
            setDoctorImage(null);
            setIsOpen(false);
            toast.success("Doctor added successfully!", { duration: 4000 });
        } catch (err) {
            if (err.response && err.response.status === 401) {
                handleUnauthorized();
            } else {
                console.error(err);
                toast.error("Error adding doctor");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // Remove doctor
    const handleRemove = async () => {
        if (!doctorName.trim()) {
            showTemporaryAlert();
            return;
        }

        if (!token) return handleUnauthorized();

        setIsSubmitting(true);
        try {
            await axios.delete(`${API_URL}/name/${doctorName}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDoctors(prev => prev.filter(doc => doc.name !== doctorName));
            setDoctorName("");
            setDoctorSpeciality("");
            setDoctorImage(null);
            setIsOpen(false);
            toast.success("Doctor deleted successfully!", { duration: 4000 });
        } catch (err) {
            if (err.response && err.response.status === 401) {
                handleUnauthorized();
            } else {
                console.error(err);
                toast.error("Error removing doctor");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className='flex justify-end'>
                <button
                    onClick={() => setIsOpen(true)}
                    className='flex text-sm items-center gap-2 px-2 py-2 rounded-lg bg-gradient-to-r from-[#d27f0a] to-[#ea940c] cursor-pointer hover:from-[#ea940c] hover:to-[#f5a623] text-[#fffbfa]'
                >
                    <FontAwesomeIcon icon={faSliders} />
                    <span>Edit List</span>
                </button>
            </div>

            <Toaster position="bottom-right" reverseOrder={false} />

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-md animate-fadeIn">
                        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
                            Edit Doctor
                        </h2>

                        <form className="flex flex-col gap-4" onSubmit={handleAdd}>
                            <input
                                type="text"
                                placeholder="Doctor name (for add/remove)"
                                className="w-full border border-gray-300 dark:border-gray-700 px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
                                value={doctorName}
                                onChange={(e) => setDoctorName(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Speciality"
                                className="w-full border border-gray-300 dark:border-gray-700 px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
                                value={doctorSpeciality}
                                onChange={(e) => setDoctorSpeciality(e.target.value)}
                            />
                            <input
                                type="file"
                                className="w-full border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-lg cursor-pointer text-sm"
                                onChange={(e) => setDoctorImage(e.target.files[0])}
                            />

                            <div className="flex gap-3 mt-2">
                                <button
                                    type="submit"
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-amber-400 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? <BeatLoader color="#6f6d69" size={10} /> : <><FontAwesomeIcon icon={faPlus} /> Add</>}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleRemove}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-500 text-white font-semibold shadow-md hover:bg-red-600 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? <BeatLoader color="#6f6d69" size={10} /> : <><FontAwesomeIcon icon={faMinus} /> Remove</>}
                                </button>
                            </div>
                        </form>

                        {showAlert && (
                            <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Incomplete Fields</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Please fill all required fields before submitting.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={() => setShowAlert(false)}>Close</AlertDialogCancel>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}

                        <button
                            onClick={() => setIsOpen(false)}
                            className="mt-6 w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all cursor-pointer"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Doctors List */}
            <div className='flex flex-col items-center gap-4 my-4 text-gray-900 md:mx-10'>
                <h1 className='text-3xl font-medium'>Meet Our Expert Team</h1>
                <p className='text-center text-sm'>Dedicated professionals committed to providing exceptional dental care.</p>
                {isLoading ? (
                    <BeatLoader />
                ) : (
                    <div className='w-full flex gap-4 pt-5 px-3 sm:px-0 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 snap-x snap-mandatory'>
                        {doctors.map((item) => (
                            <div
                                key={item._id}
                                className='min-w-[200px] snap-center border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 h-[300px] flex flex-col'
                            >
                                <div className='h-full w-full overflow-hidden'>
                                    <img
                                        className='w-full h-50 object-cover'
                                        src={item.image}
                                        alt={item.name}
                                    />
                                </div>
                                <div className='p-4 flex flex-col justify-between flex-1'>
                                    <div className='flex items-center text-center gap-2 text-sm text-green-500'>
                                        <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                                        <p>Available</p>
                                    </div>
                                    <div>
                                        <p className='text-lg font-medium'>{item.name}</p>
                                        <p className='text-sm text-gray-600'>{item.speciality}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <Toaster position="bottom-right" reverseOrder={false} />
                    </div>
                )}
            </div>
        </>
    );
};

export default Doctors;
