'use client'

import { useState } from 'react';
import InputTextBox from '../components/inputTextBox';
import { motion } from 'framer-motion';
import InputSelectBox from '../components/inputSelectBox';
import InputFileBox from '../components/inputFileBox';


interface ClaimantInfo {
    firstName: string;
    lastName: string;
    email: string;
    phoneNo: string;
    uid: string;
}

interface EventInfo {
    eventName: string;
    eventDate: string;
    committee?: string;
    numOfParticipants: string;
    location: string;
    emailPoster?: File;
    participantList?: File
}

interface ReceiptInfo {
    totalAmount: string;
    receipts: Receipt[];
}

interface Receipt {
    id: number;
    description: string;
    paymentMethod?: string;
    amount: string;
    additionalDocs?: Record<string, File>[];
}

interface ReimbursementRequest {
    claimantInfo: ClaimantInfo;
    eventInfo: EventInfo;
    receiptInfo: ReceiptInfo;
}

const FormsPage = () => {
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
    });

    const [receiptInfo, setReceiptInfo] = useState<ReceiptInfo>({
        totalAmount: '',
        receipts: [],
    });

    const [receipts, setReceipts] = useState<Receipt[]>([])
    
    const [errors, setErrors] = useState<Partial<ReimbursementRequest>>({
        claimantInfo: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNo: '',
            uid: '',
        },
        eventInfo: {
            eventName: '',
            eventDate: '',
            committee: '',
            numOfParticipants: '',
            location: '',
        },
        receiptInfo: {
            totalAmount: '',
            receipts: [],
        }
    });

    const addReceipt = () => {
        const newReceiptId = receiptInfo.receipts.length + 1;
        setReceiptInfo((prevData) => ({
            ...prevData,
            receipts: [
                ...prevData.receipts,
                { id: newReceiptId, description: '', amount: '' },
            ],
        }));
    };

    const removeReceipt = (id: number) => {
        setReceiptInfo((prevData) => ({
            ...prevData,
            receipts: prevData.receipts
                .filter((receipt) => receipt.id !== id)
                .map((receipt, index) => ({ ...receipt, id: index + 1 }))
        }))
    };
    
    const handleClaimantInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setClaimantInfo(prevData => ({ ...prevData, [name]: value }));
    };

    const handleEventInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEventInfo(prevData => ({ ...prevData, [name]: value }));
    };

    const handleReceiptInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setReceiptInfo(prevData => ({ ...prevData, [name]: value }));
    };

    const handleReceiptChange = (id: number, e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setReceipts((prevData) => 
            prevData.map((receipt) => 
                receipt.id === id ? ({ ...receipt, [name]: value}) : receipt)
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Simple validation logic
        // const newErrors: Partial<ReimbursementRequest> = {
        //     claimantInfo: {}
        // };

        // if (!claimantInfo.firstName) newErrors.claimantInfo!.firstName = 'First name is required';
        // if (!claimantInfo.lastName) newErrors.claimantInfo!.lastName = 'Last name is required';
        // if (!claimantInfo.email || !/\S+@\S+\.\S+/.test(claimantInfo.email)) {
        //     newErrors.claimantInfo!.email = 'A valid email is required';
        // }
        // if (!claimantInfo.phoneNo) newErrors.claimantInfo!.phoneNo = 'Phone Number is required';
        // if (!claimantInfo.uid) newErrors.claimantInfo!.uid = 'UID / Staff No. is required';

        // if (!eventInfo.eventName) newErrors.eventInfo!.eventName = 'Event name is required';
        // if (!eventInfo.eventDate) newErrors.eventInfo!.eventDate = 'Event date is required';
        // if (!eventInfo.numOfParticipants) newErrors.eventInfo!.numOfParticipants = 'Number of participants is required';
        // if (!eventInfo.location) newErrors.eventInfo!.location = 'Location is required';

        // formData.receipts.map((receipt) => {
        //     if (!receipt.description) newErrors.receipts
        // })

        // add more validation logic (maybe to phone number, staff no.)

        // if (Object.keys(newErrors).length === 0) {
        //     // Submit form if no errors
        //     // send POST
        //     // redirect to form submit successfully
        //     // const response = await fetch("/api/upload", {
        //     //     method: "POST",
        //     //     body: formData,
        //     //   });
        //     alert('Form submitted successfully');
        // } else {
        //     setErrors(newErrors);
        // }
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
                <form onSubmit={handleSubmit}>
                    <h2 className="text-xl font-bold mb-2 text-center">Personal Information</h2>
                    <InputTextBox
                        label="First Name"
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={claimantInfo.firstName}
                        onChange={handleClaimantInfoChange}
                        isRequired={true}
                        error={errors.claimantInfo!.firstName}
                    />
                    <InputTextBox
                        label="Last Name"
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={claimantInfo.lastName}
                        onChange={handleClaimantInfoChange}
                        isRequired={true}
                        error={errors.claimantInfo!.lastName}
                    />
                    <InputTextBox
                        label="UID / Staff No."
                        type="text"
                        id="uid"
                        name="uid"
                        value={claimantInfo.uid}
                        onChange={handleClaimantInfoChange}
                        isRequired={true}
                        error={errors.claimantInfo!.uid}
                    />
                    <InputTextBox
                        label="Email"
                        type="email"
                        id="email"
                        name="email"
                        value={claimantInfo.email}
                        onChange={handleClaimantInfoChange}
                        isRequired={true}
                        error={errors.claimantInfo!.email}
                    />
                    <InputTextBox
                        label="Phone Number"
                        type="text"
                        id="phoneNo"
                        name="phoneNo"
                        value={claimantInfo.phoneNo}
                        onChange={handleClaimantInfoChange}
                        isRequired={true}
                        error={errors.claimantInfo!.phoneNo}
                    />

                    <hr className="mt-4 mb-4 border-t-2 border-gray-300" />
                    <h2 className="text-xl font-bold mb-4 text-center">Event Details</h2>
                    <InputTextBox
                        label="Event Name"
                        type="string"
                        id="eventName"
                        name="eventName"
                        value={eventInfo.eventName}
                        onChange={handleEventInfoChange}
                        isRequired={true}
                        error={errors.eventInfo!.eventName}
                    />
                    <InputTextBox
                        label="Event Date"
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        value={eventInfo.eventDate}
                        onChange={handleEventInfoChange}
                        isRequired={true}
                        error={errors.eventInfo!.eventDate}
                    />
                    <InputTextBox
                        label="Organizing Committee (if applicable)"
                        type="text"
                        id="committee"
                        name="committee"
                        value={eventInfo.committee}
                        onChange={handleEventInfoChange}
                        isRequired={false}
                        error={errors.eventInfo!.committee}
                    />
                    <InputTextBox
                        label="Number of participants"
                        type="number"
                        id="numOfParticipants"
                        name="numOfParticipants"
                        value={eventInfo.numOfParticipants}
                        onChange={handleEventInfoChange}
                        isRequired={true}
                        error={errors.eventInfo!.numOfParticipants}
                    />
                    <InputTextBox
                        label="Location of the event"
                        type="text"
                        id="location"
                        name="location"
                        value={eventInfo.location}
                        onChange={handleEventInfoChange}
                        isRequired={true}
                        error={errors.eventInfo!.location}
                    />

                    <InputFileBox
                        label="Event poster or mass email"
                        id="eventPoster"
                        name="eventPoster"
                        onChange={handleEventInfoChange}
                        isRequired={true}
                    />

                    <InputFileBox
                        label="Participant list"
                        id="participantList"
                        name="participantList"
                        onChange={handleEventInfoChange}
                        isRequired={true}
                    />

                    <hr className="mt-4 mb-4 border-t-2 border-gray-300" />
                    <h2 className="text-xl font-bold mb-4 text-center">Receipts</h2>
                    <InputTextBox
                        label="Total reimbursement amount"
                        type="number"
                        id="totalAmount"
                        name="totalAmount"
                        value={receiptInfo.totalAmount}
                        onChange={handleReceiptInfoChange}
                        isRequired={true}
                        error={errors.receiptInfo!.totalAmount}
                    />
                    <button className='btn mb-4' onClick={addReceipt}>+ Add new receipt</button>
                    {receiptInfo.receipts.map((receipt, index) => (
                    <div key={receipt.id} className="mb-4 p-4 border rounded-lg shadow-sm">
                        {/* make sure the id is correct, when deleting a receipt, the id is change. Has to change the id to follow the index (index change always update id (when remove always update new id)) */}
                        <label className="block text-lg font-bold text-gray-700 mb-2">
                            Receipt {receipt.id}
                        </label>

                        <InputTextBox
                            label="Description"
                            type="text"
                            id="description"
                            name="description"
                            value={receiptInfo.receipts[index].description}
                            onChange={e => handleReceiptChange(receipt.id, e)}
                            isRequired={true}
                            error={''}
                        /> 

                        <InputSelectBox
                            label="Payment Method"
                            id="paymentMethod"
                            name="paymentMethod"
                            value={receiptInfo.receipts[index].paymentMethod}
                            onChange={e => handleReceiptChange(receipt.id, e)}
                            isRequired={true}
                            options={[
                                { label: 'Cash', value: 'cash' },
                                { label: 'Octopus', value: 'octopus' },
                                { label: 'Debit / Credit Card', value: 'card' },
                                { label: 'Apple Pay', value: 'applePay' },
                                { label: 'Alipay', value: 'alipay' },
                                { label: 'Wechat Pay', value: 'wechatPay' },
                            ]}
                            error={''}
                        />
                        <InputTextBox
                            label="Amount"
                            type="number"
                            id="amount"
                            name="amount"
                            value={receiptInfo.receipts[index].amount}
                            onChange={e => handleReceiptChange(receipt.id, e)}
                            isRequired={true}
                            error={''}
                        />

                        <button type="button" onClick={() => removeReceipt(receipt.id)} className="text-red-500 mt-2">
                            Remove
                        </button>
                    </div>
                ))}

                    <button
                        className="w-full mt-4 px-4 py-2 bg-orange-400 text-white font-semibold rounded-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        onClick={() => console.log('next')}
                    >
                        Next
                    </button>

                    <button
                        type="submit"
                        className="w-full mt-4 px-4 py-2 bg-orange-400 text-white font-semibold rounded-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Submit
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default FormsPage;
