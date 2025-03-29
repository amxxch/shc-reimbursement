'use client'

import { useState } from 'react';
import Image from 'next/image';
import InputFileBox from '../inputBox/InputFileBox';
import { ReceiptInfo } from '../../types';
import FormButton from '../formButton';

interface ReceiptInfoProps {
    receiptInfo: ReceiptInfo;
    onChange: (info: ReceiptInfo) => void;
    currentStep: number;
    setCurrentStep: (n: number) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const AdditionalDocsForm = ({ receiptInfo, onChange, currentStep, setCurrentStep, handleSubmit } : ReceiptInfoProps) => {

    // Maximum file size is 5MB
    const MAX_FILE_SIZE = 5 * 1000 * 1000;

    const [errors, setErrors] = useState<Record<number, Record<string, string>>>({});

    const handleDocumentChange = (receiptId: number, e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const rawFile = type === 'file' ? e.target.files?.[0] : value;

        onChange({
            ...receiptInfo,
            receipts: [
                ...receiptInfo.receipts.map((receipt) => 
                receipt.receiptId === receiptId ? ({ 
                    ...receipt, 
                    additionalDocs: {
                        ...receipt.additionalDocs,
                        [name]: rawFile as File
                    }}) 
                    : receipt
                )
            ],
        });

        // Clear error when file is selected
        if (type === 'file' && rawFile) {
            setErrors(prev => {
                const newErrors = {...prev};
                if (newErrors[receiptId]?.[name]) {
                    delete newErrors[receiptId][name];
                    if (Object.keys(newErrors[receiptId]).length === 0) {
                        delete newErrors[receiptId];
                    }
                }
                return newErrors;
            });
        }

    };

    const getRequiredFilesForMethod = (method: string) => {
        switch(method) {
            case 'Card':
                return ['transactionHistory', 'bankCard'];
            case 'MobileWithCard':
                return ['declarationForm', 'transactionHistory', 'bankCard'];
            case 'MobileWithBalance':
                return ['declarationForm', 'transactionHistory'];
            case 'OnlinePurchases':
                return ['deliveryNote'];
            case 'TaoBao':
                return ['deliveryNote', 'transactionRecord'];
            default:
                return [];
        }
    };

    const validateForm = () => {
        const newErrors: Record<number, Record<string, string>> = {};

        receiptInfo.receipts.forEach(receipt => {
            if (receipt.paymentMethod === 'Cash' || receipt.paymentMethod === 'Octopus') {
                return;
            }

            const requiredFiles = getRequiredFilesForMethod(receipt.paymentMethod);
            const receiptErrors: Record<string, string> = {};

            requiredFiles.forEach(fileKey => {
                if (!receipt.additionalDocs?.[fileKey] || 
                    (receipt.additionalDocs[fileKey] instanceof File && 
                     receipt.additionalDocs[fileKey].size === 0)) {
                    receiptErrors[fileKey] = 'This file is required';
                } else if (receipt.additionalDocs[fileKey].size > MAX_FILE_SIZE) {
                    receiptErrors[fileKey] = 'File size must be less than 5MB';
                }
            });

            if (Object.keys(receiptErrors).length > 0) {
                newErrors[receipt.receiptId] = receiptErrors;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = async (e: React.FormEvent) => {
        e.preventDefault();

        const isValid = validateForm();
        if (isValid) {
            handleSubmit(e);
        }
    };

    const paymentMethodNames = {
        Cash: 'Cash',
        Octopus: 'Octopus',
        Card: 'Debit / Credit Card',
        MobileWithCard: 'Mobile Payment Services (with card)',
        MobileWithBalance: 'Mobile Payment Services (with balance)',
        OnlinePurchases: 'Online Purchases',
        TaoBaoWithCO: 'TaoBao using cash/octopus',
        TaoBaoWithoutCO: 'TaoBao using payments other than cash/octopus',
    }
    type paymentMethodsKeys = keyof typeof paymentMethodNames;

    return (
        <form onSubmit={ handleNext }>
            <hr className="mt-4 mb-4 border-t-2 border-gray-300" />
                <h2 className="text-xl font-bold mb-4 text-center">Additional Documents</h2>
                {receiptInfo.receipts.map((receipt) => (
                <div key={receipt.receiptId} className="mb-4 p-4 border rounded-lg shadow-sm bg-white">
                    <label className="block text-xl font-bold text-sky-700 mb-2">
                        # Receipt {receipt.receiptId}
                    </label>

                    <label className="block text-md font-semibold text-gray-700 mb-2">
                        Description: {receipt.description}
                    </label>

                    <label className="block text-md font-semibold text-gray-700 mb-2">
                        Payment method: {paymentMethodNames[receipt.paymentMethod as paymentMethodsKeys]}
                    </label>

                    <label className="block text-md font-semibold text-gray-700 mb-4">
                        Amount: HK$ {receipt.amount}
                    </label>

                    <div className="border-t-2 border-gray-300 my-4" />

                    {(receipt.paymentMethod === 'Cash' || receipt.paymentMethod === 'Octopus') &&
                        <label className="block text-sm text-gray-700 mb-2">
                            No additional document required
                        </label>
                    }

                    {receipt.paymentMethod === 'Card' &&
                        <div>
                            <InputFileBox
                                label="Bank Statement / Screenshot of Transaction History"
                                id="transactionHistory"
                                name="transactionHistory"
                                filename={receipt.additionalDocs?.transactionHistory?.name}
                                description={`*Please name the file as (Event Name)_receipt_${receipt.receiptId}_transactionHistory`}
                                onChange={e => handleDocumentChange(receipt.receiptId, e)}
                                isRequired={true}
                                error={errors[receipt.receiptId]?.transactionHistory}
                            />

                            <InputFileBox
                                label="A copy of Bank Card with cardholder's name"
                                id="bankCard"
                                name="bankCard"
                                filename={receipt.additionalDocs?.bankCard?.name}
                                description={`*Please name the file as (Event Name)_receipt_${receipt.receiptId}_bankCard`}
                                onChange={e => handleDocumentChange(receipt.receiptId, e)}
                                isRequired={true}
                                error={errors[receipt.receiptId]?.bankCard}
                            />
                        </div>
                    }

                    {receipt.paymentMethod === 'MobileWithCard' &&
                        <div>
                            <InputFileBox
                                label="Declaration Form"
                                id="declarationForm"
                                name="declarationForm"
                                filename={receipt.additionalDocs?.declarationForm?.name}
                                description={`*Please name the file as (Event Name)_receipt_${receipt.receiptId}_declarationForm`}
                                onChange={e => handleDocumentChange(receipt.receiptId, e)}
                                isRequired={true}
                                error={errors[receipt.receiptId]?.declarationForm}
                            />

                            <InputFileBox
                                label="Transaction History with bank account number"
                                id="transactionHistory"
                                name="transactionHistory"
                                filename={receipt.additionalDocs?.transactionHistory?.name}
                                description={`*Please name the file as (Event Name)_receipt_${receipt.receiptId}_bankCard`}
                                onChange={e => handleDocumentChange(receipt.receiptId, e)}
                                isRequired={true}
                                error={errors[receipt.receiptId]?.transactionHistory}
                            />

                            <InputFileBox
                                label="A copy of Bank Card with cardholder's name"
                                id="bankCard"
                                name="bankCard"
                                filename={receipt.additionalDocs?.bankCard?.name}
                                description={`*Please name the file as (Event Name)_receipt_${receipt.receiptId}_bankCard`}
                                onChange={e => handleDocumentChange(receipt.receiptId, e)}
                                isRequired={true}
                                error={errors[receipt.receiptId]?.bankCard}
                            />
                        </div>
                    }

                    {receipt.paymentMethod === 'MobileWithBalance' &&
                        <div>
                            <InputFileBox
                                label="Declaration Form"
                                id="declarationForm"
                                name="declarationForm"
                                filename={receipt.additionalDocs?.declarationForm?.name}
                                description={`*Please name the file as (Event Name)_receipt_${receipt.receiptId}_declarationForm`}
                                onChange={e => handleDocumentChange(receipt.receiptId, e)}
                                isRequired={true}
                                error={errors[receipt.receiptId]?.declarationForm}
                            />

                            <InputFileBox
                                label="A screenshot of Transaction History"
                                id="transactionHistory"
                                name="transactionHistory"
                                filename={receipt.additionalDocs?.transactionHistory?.name}
                                description={`*Please name the file as (Event Name)_receipt_${receipt.receiptId}_transactionHistory`}
                                onChange={e => handleDocumentChange(receipt.receiptId, e)}
                                isRequired={true}
                                error={errors[receipt.receiptId]?.transactionHistory}
                            />
                        </div>
                    }

                    {receipt.paymentMethod === 'OnlinePurchases' &&
                        <div>
                            <InputFileBox
                                label="Delivery Note with delivery status shown as 'Delivered' or 'Completed'"
                                id="deliveryNote"
                                name="deliveryNote"
                                filename={receipt.additionalDocs?.deliveryNote?.name}
                                description={`*Please name the file as (Event Name)_receipt_${receipt.receiptId}_deliveryNote`}
                                onChange={e => handleDocumentChange(receipt.receiptId, e)}
                                isRequired={true}
                                error={errors[receipt.receiptId]?.deliveryNote}
                            />
                        </div>
                    }

                    {receipt.paymentMethod === 'TaoBao' &&
                        <div>
                            <InputFileBox
                                label="Delivery Note with delivery status shown as 'Delivered' or 'Completed'"
                                id="deliveryNote"
                                name="deliveryNote"
                                filename={receipt.additionalDocs?.deliveryNote?.name}
                                description={`*Please name the file as (Event Name)_receipt_${receipt.receiptId}_deliveryNote`}
                                onChange={e => handleDocumentChange(receipt.receiptId, e)}
                                isRequired={true}
                                error={errors[receipt.receiptId]?.deliveryNote}
                            />
                            <InputFileBox
                                label="Transaction Record"
                                id="transactionRecord"
                                name="transactionRecord"
                                filename={receipt.additionalDocs?.transactionRecord?.name}
                                description={`*Please name the file as (Event Name)_receipt_${receipt.receiptId}_transactionRecord`}
                                onChange={e => handleDocumentChange(receipt.receiptId, e)}
                                isRequired={true}
                                error={errors[receipt.receiptId]?.transactionRecord}
                            />
                            <div className='flex justify-center'>
                                <Image className="flex justify-center" src="/images/taobao-receipt.png" width={500} height={500} alt="Delivery Note" />
                            </div>
                        </div>
                    }

                </div>
            ))}
            <FormButton 
                currentStep={currentStep} 
                setCurrentStep={setCurrentStep} 
                handleSubmit={handleNext}
            />
        </form>
    );
};

export default AdditionalDocsForm;
