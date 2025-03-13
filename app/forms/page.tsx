'use client'

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ClaimantInfo, EventInfo, ReceiptInfo } from '../types';
import ClaimantInfoForm from '../components/FormsPage/ClaimantInfoForm';
import EventInfoForm from '../components/FormsPage/EventInfoForm';
import ReceiptInfoForm from '../components/FormsPage/ReceiptInfoForm';
import AdditionalDocsForm from '../components/FormsPage/AdditionalDocsForm';
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
        const emailPosterUrl = await handleFileUpload(eventInfo.emailPoster);
        requestData.append('emailPoster', emailPosterUrl);
        if (eventInfo.participantList.size > 0) {
            const participantListUrl = await handleFileUpload(eventInfo.participantList);
            requestData.append('participantList', participantListUrl);
        }
        requestData.append('totalAmount', receiptInfo.totalAmount);

        for (let index = 0; index < receiptInfo.receipts.length; index++) {
            const receipt = receiptInfo.receipts[index];
            requestData.append(`receipts[${index}][description]`, receipt.description);
            requestData.append(`receipts[${index}][paymentMethod]`, receipt.paymentMethod);
            requestData.append(`receipts[${index}][amount]`, receipt.amount);
    
            const copyOfReceiptUrl = await handleFileUpload(receipt.copyOfReceipt);
            requestData.append(`receipts[${index}][copyOfReceipt]`, copyOfReceiptUrl);
    
            if (receipt.additionalDocs) {
                for (const [key, file] of Object.entries(receipt.additionalDocs)) {
                    const additionalDocUrl = await handleFileUpload(file);
                    requestData.append(`receipts[${index}][additionalDocs][${key}]`, additionalDocUrl);
                }
            }
        }

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

    const handleFileUpload = async (file: File) => {
        try {
            const response = await fetch('/api/getPresignedUrl', {
                method: 'POST',
                body: JSON.stringify({ 
                    fileName: file.name,
                    fileType: file.type,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        
            if (!response.ok) throw new Error('Failed to get pre-signed URL');
            const { url, location } = await response.json();
        
            const uploadResponse = await fetch(url, {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': file.type,
                },
            });
        
            if (!uploadResponse.ok) throw new Error('Failed to upload file');
            return location;
        } catch (error) {
            console.error('Error:', error);
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