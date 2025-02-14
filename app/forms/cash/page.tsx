'use client'

import React, { useState } from 'react';

// Define the structure of the form data
interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    // Add more fields as needed
}

const MultiStepForm = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    });
    const [currentStep, setCurrentStep] = useState(0); // Track current step
    const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Track validation errors

    // Handle form data change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    // Handle Next button click
    const handleNext = () => {
        setCurrentStep(prevStep => prevStep + 1);
    };

    // Handle Submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Validate form data
        if (validateForm()) {
            // Submit the form data here
            console.log("Form Submitted:", formData);
        }
    };

    // Basic validation (you can add more checks here)
    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.firstName) newErrors.firstName = 'First Name is required';
        if (!formData.lastName) newErrors.lastName = 'Last Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Render input fields for each step
    const renderStepFields = () => {
        switch (currentStep) {
            case 0:
                return (
                    <>
                        <div className="mb-4">
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                        </div>
                    </>
                );
            case 1:
                return (
                    <>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                        </div>
                    </>
                );
            // Add more steps here as needed
            default:
                return null;
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {renderStepFields()}

            {/* Navigation buttons */}
            <div className="mt-6 flex justify-between">
                {currentStep > 0 && (
                    <button
                        type="button"
                        onClick={() => setCurrentStep(prevStep => prevStep - 1)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    >
                        Previous
                    </button>
                )}
                {currentStep < 1 ? (
                    <button
                        type="button"
                        onClick={handleNext}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Next
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded-md"
                    >
                        Submit
                    </button>
                )}
            </div>
        </form>
    );
};

export default MultiStepForm;
