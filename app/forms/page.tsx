'use client'

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ClaimantInfo, EventInfo, ReceiptInfo } from '../types';
import ClaimantInfoForm from '../components/FormsPage/claimantInfoForm';
import EventInfoForm from '../components/FormsPage/eventInfoForm';
import ReceiptInfoForm from '../components/FormsPage/receiptInfoForm';
import AdditionalDocsForm from '../components/FormsPage/additionalDocsForm';
// import Steppers from '../components/Steppers';
import { useRouter } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';


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

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [isLoading]);

    // const formSteps = [
    //     { label: 'Claimant Information', description: '', remark: ''},
    //     { label: 'Event Information', description: '', remark: '' },
    //     { label: 'Receipts Information', description: '', remark: '' },
    //     { label: 'Additional Documents', description: '', remark: '' },
    // ]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const requestData = new FormData();

        requestData.append('firstName', claimantInfo.firstName);
        requestData.append('lastName', claimantInfo.lastName);
        requestData.append('email', claimantInfo.email);
        requestData.append('phoneNo', claimantInfo.phoneNo);
        requestData.append('uid', claimantInfo.uid);
        requestData.append('eventName', eventInfo.eventName);
        requestData.append('eventDate', eventInfo.eventDate);
        if (eventInfo.committee) requestData.append('committee', eventInfo.committee);
        requestData.append('numOfParticipants', eventInfo.numOfParticipants);
        requestData.append('location', eventInfo.location);
        requestData.append('emailPoster', eventInfo.emailPoster);
        if (eventInfo.participantList) requestData.append('participantList', eventInfo.participantList);
        requestData.append('totalAmount', receiptInfo.totalAmount);

        console.log(eventInfo.emailPoster)

        receiptInfo.receipts.forEach((receipt, index) => {
            requestData.append(`receipts[${index}][description]`, receipt.description);
            requestData.append(`receipts[${index}][paymentMethod]`, receipt.paymentMethod);
            requestData.append(`receipts[${index}][amount]`, receipt.amount);
            requestData.append(`receipts[${index}][copyOfReceipt]`, receipt.copyOfReceipt);

            if (receipt.additionalDocs) {
                Object.entries(receipt.additionalDocs).forEach(([key, file], docIndex) => {
                    requestData.append(`receipts[${index}][additionalDocs][${docIndex}][doc_type]`, key);
                    requestData.append(`receipts[${index}][additionalDocs][${docIndex}][file]`, file);
                });
            }
        });

        try {
            const response = await fetch('/api/submitForm', {
                method: 'POST',
                body: requestData,
            });

            if (!response.ok) throw new Error('Failed to submit form');
            const result = await response.json();

            console.log(result);

            router.push('/forms/success');

        } catch (error) {
            console.error('Error: ', error);
            router.push('/forms/error');
        }
    };

    return (
        <div className="flex justify-center min-h-screen">
            <motion.div className="w-full max-w-xl p-6 rounded-lg" 
                initial={{ opacity: 0.1 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5 }}
            >
                {isLoading &&
                    <div className="flex h-screen justify-center items-center">
                        <CircularProgress size="8rem"/>
                    </div>
                }   

                {!isLoading &&
                <div>
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
                </div>
                }
            </motion.div>
        </div>
    );
};

export default FormsPage;
