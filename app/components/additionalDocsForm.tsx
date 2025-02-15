'use client'

import { useState } from 'react';
import InputFileBox from './inputFileBox';
import { ReceiptInfo, Receipt } from '../types';
import FormButton from './formButton';

interface ReceiptInfoProps {
    receiptInfo: ReceiptInfo;
    onChange: (info: ReceiptInfo) => void;
    currentStep: number;
    setCurrentStep: (n: number) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const AdditionalDocsForm = ({ receiptInfo, onChange, currentStep, setCurrentStep, handleSubmit } : ReceiptInfoProps) => {

    const [errors, setErrors] = useState<Partial<ReceiptInfo>>({});

    const handleReceiptInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange({ ...receiptInfo, [name]: value });
    };

    const handleReceiptChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange({
            ...receiptInfo,
            receipts: [
                ...receiptInfo.receipts.map((receipt) => 
                receipt.id === id ? ({ ...receipt, [name]: value}) : receipt)
            ],
        });
    };

    const handleNext = async (e: React.FormEvent) => {
        e.preventDefault();

        // Simple validation logic
        const newErrors: Partial<ReceiptInfo> = {};

        // add more validation logic (maybe to phone number, staff no.)

        if (Object.keys(newErrors).length === 0) {
            alert('Form submitted successfully');
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <form onSubmit={ handleNext }>
            <hr className="mt-4 mb-4 border-t-2 border-gray-300" />
                <h2 className="text-xl font-bold mb-4 text-center">Additional Documents</h2>
                {receiptInfo.receipts.map((receipt, index) => (
                <div key={receipt.id} className="mb-4 p-4 border rounded-lg shadow-sm">
                    <label className="block text-lg font-bold text-gray-900 mb-2">
                        Receipt {receipt.id}
                    </label>

                    <label className="block text-md font-bold text-gray-700 mb-2">
                        Payment method: {receipt.paymentMethod}
                    </label>

                    <label className="block text-md font-bold text-gray-700 mb-2">
                        Amount: HKD$ {receipt.amount}
                    </label>

                    {(receipt.paymentMethod === 'Cash' || receipt.paymentMethod === 'Octopus') &&
                        <label className="block text-sm text-gray-700 mb-2">
                            No additional document required
                        </label>
                    }

                    {receipt.paymentMethod === 'Card' &&
                        <div>
                            <InputFileBox
                                label="Bank Statement / Screenshot of Transaction History"
                                id="bankStatement"
                                name="bankStatement"
                                onChange={e => handleReceiptChange(receipt.id, e)}
                                isRequired={true}
                            />

                            <InputFileBox
                                label="A copy of Bank Card"
                                id="bankCard"
                                name="bankCard"
                                onChange={e => handleReceiptChange(receipt.id, e)}
                                isRequired={true}
                            />
                        </div>
                    }

                </div>
            ))}
            <FormButton 
                currentStep={currentStep} 
                setCurrentStep={setCurrentStep} 
                handleSubmit={handleSubmit}
            />
        </form>
    );
};

export default AdditionalDocsForm;
