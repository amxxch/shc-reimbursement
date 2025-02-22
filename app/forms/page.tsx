'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ClaimantInfo, EventInfo, ReceiptInfo, Receipt, ReimbursementRequest } from '../types';
import ClaimantInfoForm from '../components/claimantInfoForm';
import EventInfoForm from '../components/eventInfoForm';
import ReceiptInfoForm from '../components/receiptInfoForm';
import AdditionalDocsForm from '../components/additionalDocsForm';
import Steppers from '../components/steppers';
import FormButton from '../components/formButton';
import { p } from 'framer-motion/client';


const FormsPage = () => {

    const router = useRouter();

    const [claimantInfo, setClaimantInfo] = useState<ClaimantInfo>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNo: '',
        uid: '',
    });

    const [eventInfo, setEventInfo] = useState<EventInfo>({
        eventName: '',
        eventDate: '',
        committee: '',
        numOfParticipants: '',
        location: '',
        emailPoster: new File([], ''),
        participantList: new File([], ''),
    });

    const [receiptInfo, setReceiptInfo] = useState<ReceiptInfo>({
        totalAmount: '',
        receipts: [],
    });

    const [currentStep, setCurrentStep] = useState(1);

    const formSteps = [
        { label: 'Claimant Information', description: '', remark: ''},
        { label: 'Event Information', description: '', remark: '' },
        { label: 'Receipts Information', description: '', remark: '' },
        { label: 'Additional Documents', description: '', remark: '' },
    ]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // use formData object to store all the data

        const requestData = new FormData();
        requestData.append('firstName', claimantInfo.firstName);
        // const requestData = {
        //     firstName: claimantInfo.firstName,
        // }
        requestData.append('lastName', claimantInfo.lastName);
        requestData.append('email', claimantInfo.email);
        requestData.append('phoneNo', claimantInfo.phoneNo);
        requestData.append('uid', claimantInfo.uid);
        requestData.append('eventName', eventInfo.eventName);
        requestData.append('eventDate', eventInfo.eventDate);
        if (eventInfo.committee) requestData.append('committee', eventInfo.committee);
        requestData.append('numOfParticipants', eventInfo.numOfParticipants);
        requestData.append('location', eventInfo.location);
        if (eventInfo.emailPoster) requestData.append('emailPoster', eventInfo.emailPoster);
        if (eventInfo.participantList) requestData.append('participantList', eventInfo.participantList);
        requestData.append('totalAmount', receiptInfo.totalAmount);

        console.log(eventInfo.emailPoster)

        // receiptInfo.receipts.forEach((receipt, index) => {
        //     requestData.append(`receipts[${index}][description]`, receipt.description);
        //     requestData.append(`receipts[${index}][paymentMethod]`, receipt.paymentMethod);
        //     requestData.append(`receipts[${index}][amount]`, receipt.amount);
        //     if (receipt.copyOfReceipt) requestData.append(`receipts[${index}][copyOfReceipt]`, receipt.copyOfReceipt);

        //     if (receipt.additionalDocs) {
        //         Object.entries(receipt.additionalDocs).forEach(([key, file]) => {
        //             requestData.append(`receipts[${index}][additionalDocs][${key}]`, file);
        //         });
        //     }
        // });

        // requestData.forEach((value, key) => {
        //     console.log(key, value);
        // });

        // router.push('/success');

        try {
            const response = await fetch('/api/submitForm', {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                body: requestData,
            });

            // if (!response.ok) throw new Error('Failed to submit form', response);
            if (!response.ok) console.log('Failed to submit form', response);
            const result = await response.json();
            console.log(result);

            // const result = await response.json();
            // router.push('/success');

        } catch (error) {
            console.error('Error: ', error);
            // router.push('/error');
        }
    };

    return (
        <div className="flex justify-center min-h-screen">
            <motion.div className="w-full max-w-xl p-6 rounded-lg" 
                initial={{ opacity: 0.1 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-bold mb-2 text-center">Reimbursement Forms</h2>
                <h6 className="mb-6 text-center italic ">*Please submit this form as soon as possible after the event has ended.</h6>
                {/* <Steppers steps={formSteps} /> */}

                {currentStep === 1 && 
                <ClaimantInfoForm 
                    claimantInfo={claimantInfo} 
                    onChange={setClaimantInfo} 
                    currentStep={currentStep} 
                    setCurrentStep={setCurrentStep} 
                />}
                {currentStep === 2 && 
                <EventInfoForm 
                    eventInfo={eventInfo} 
                    setEventInfo={setEventInfo} 
                    currentStep={currentStep} 
                    setCurrentStep={setCurrentStep}
                />}
                {currentStep === 3 && 
                <ReceiptInfoForm 
                    receiptInfo={receiptInfo} 
                    onChange={setReceiptInfo} 
                    currentStep={currentStep} 
                    setCurrentStep={setCurrentStep}
                />}
                {currentStep === 4 && 
                <AdditionalDocsForm 
                    receiptInfo={receiptInfo} 
                    onChange={setReceiptInfo} 
                    currentStep={currentStep} 
                    setCurrentStep={setCurrentStep}
                    handleSubmit={handleSubmit}
                />}
            </motion.div>
        </div>
    );
};

export default FormsPage;
