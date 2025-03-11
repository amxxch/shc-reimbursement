'use client'

import { useEffect, useState } from 'react';
import InputTextBox from '../inputBox/InputTextBox';
import { ClaimantInfo } from '../../types';
import FormButton from '../formButton';

interface ClaimantInfoProps {
    claimantInfo: ClaimantInfo;
    onChange: (info: ClaimantInfo) => void;
    currentStep: number;
    setCurrentStep: (n: number) => void;
}

const ClaimantInfoForm = ({ claimantInfo, onChange, currentStep, setCurrentStep } : ClaimantInfoProps) => {

    const [errors, setErrors] = useState<Partial<ClaimantInfo>>({});

    useEffect(() => {
        window.scrollTo(0, 0);
      });

    const handleClaimantInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange({ ...claimantInfo, [name]: value });
    };

    const handleNextStep = async (e: React.FormEvent) => {
        e.preventDefault();

        // Simple validation logic
        const newErrors: Partial<ClaimantInfo> = {};

        if (!claimantInfo.firstName) newErrors.firstName = 'First name is required';
        if (!claimantInfo.lastName) newErrors.lastName = 'Last name is required';
        if (!claimantInfo.email || !/\S+@\S+\.\S+/.test(claimantInfo.email)) {
            newErrors.email = 'A valid email is required';
        }
        if (!claimantInfo.phoneNo) newErrors.phoneNo = 'Phone Number is required';
        if (!claimantInfo.uid) newErrors.uid = 'UID / Staff No. is required';

        // add more validation logic (maybe to phone number, staff no.)

        if (Object.keys(newErrors).length === 0) {
            setCurrentStep(currentStep + 1);
        } else {
            setErrors(newErrors);
        }
    };

    return (
            <form>
                <hr className="mt-4 mb-4 border-t-2 border-gray-300" />
                <h2 className="text-xl font-bold mb-2 text-center">Claimant Information</h2>
                <InputTextBox
                    label="First Name"
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={claimantInfo.firstName}
                    onChange={handleClaimantInfoChange}
                    isRequired={true}
                    error={errors.firstName}
                />
                <InputTextBox
                    label="Last Name"
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={claimantInfo.lastName}
                    onChange={handleClaimantInfoChange}
                    isRequired={true}
                    error={errors.lastName}
                />
                <InputTextBox
                    label="UID / Staff No."
                    type="text"
                    id="uid"
                    name="uid"
                    value={claimantInfo.uid}
                    onChange={handleClaimantInfoChange}
                    isRequired={true}
                    error={errors.uid}
                />
                <InputTextBox
                    label="Email"
                    type="email"
                    id="email"
                    name="email"
                    value={claimantInfo.email}
                    onChange={handleClaimantInfoChange}
                    isRequired={true}
                    error={errors.email}
                />
                <InputTextBox
                    label="Phone Number"
                    type="text"
                    id="phoneNo"
                    name="phoneNo"
                    value={claimantInfo.phoneNo}
                    onChange={handleClaimantInfoChange}
                    isRequired={true}
                    error={errors.phoneNo}
                />

                <FormButton 
                    currentStep={currentStep} 
                    setCurrentStep={setCurrentStep} 
                    handleNextStep={handleNextStep} 
                />

        </form>
    );
};

export default ClaimantInfoForm;
