'use client'

import { useState } from 'react';
import InputFileBox from '../inputBox/inputFileBox';
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

    const [errors, setErrors] = useState<Partial<ReceiptInfo>>({});

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
                                description={`*Please name the file as (Event Name)_receipt_${receipt.receiptId}_transactionHistory`}
                                onChange={e => handleDocumentChange(receipt.receiptId, e)}
                                isRequired={true}
                            />

                            <InputFileBox
                                label="A copy of Bank Card with cardholder's name"
                                id="bankCard"
                                name="bankCard"
                                description={`*Please name the file as (Event Name)_receipt_${receipt.receiptId}_bankCard`}
                                onChange={e => handleDocumentChange(receipt.receiptId, e)}
                                isRequired={true}
                            />
                        </div>
                    }

                    {receipt.paymentMethod === 'MobileWithCard' &&
                        <div>
                            <InputFileBox
                                label="Declaration Form"
                                id="declarationForm"
                                name="declarationForm"
                                description={`*Please name the file as (Event Name)_receipt_${receipt.receiptId}_declarationForm`}
                                onChange={e => handleDocumentChange(receipt.receiptId, e)}
                                isRequired={true}
                            />

                            <InputFileBox
                                label="Transaction History with bank account number"
                                id="transactionHistory"
                                name="transactionHistory"
                                description={`*Please name the file as (Event Name)_receipt_${receipt.receiptId}_bankCard`}
                                onChange={e => handleDocumentChange(receipt.receiptId, e)}
                                isRequired={true}
                            />

                            <InputFileBox
                                label="A copy of Bank Card with cardholder's name"
                                id="bankCard"
                                name="bankCard"
                                description={`*Please name the file as (Event Name)_receipt_${receipt.receiptId}_bankCard`}
                                onChange={e => handleDocumentChange(receipt.receiptId, e)}
                                isRequired={true}
                            />
                        </div>
                    }

                    {receipt.paymentMethod === 'MobileWithBalance' &&
                        <div>
                            <InputFileBox
                                label="Declaration Form"
                                id="declarationForm"
                                name="declarationForm"
                                description={`*Please name the file as (Event Name)_receipt_${receipt.receiptId}_declarationForm`}
                                onChange={e => handleDocumentChange(receipt.receiptId, e)}
                                isRequired={true}
                            />

                            <InputFileBox
                                label="A screenshot of Transaction History"
                                id="transactionHistory"
                                name="transactionHistory"
                                description={`*Please name the file as (Event Name)_receipt_${receipt.receiptId}_transactionHistory`}
                                onChange={e => handleDocumentChange(receipt.receiptId, e)}
                                isRequired={true}
                            />
                        </div>
                    }

                    {receipt.paymentMethod === 'OnlinePurchases' &&
                        <div>
                            <InputFileBox
                                label="Delivery Note with delivery status shown as 'Delivered' or 'Completed'"
                                id="deliveryNote"
                                name="deliveryNote"
                                description={`*Please name the file as (Event Name)_receipt_${receipt.receiptId}_deliveryNote`}
                                onChange={e => handleDocumentChange(receipt.receiptId, e)}
                                isRequired={true}
                            />
                        </div>
                    }

                    {receipt.paymentMethod === 'TaoBaoWithCO' &&
                        <div>
                            <InputFileBox
                                label="A screenshot of the order status shown as 'Delivered' or 'Completed'"
                                id="orderStatus"
                                name="orderStatus"
                                description={`*Please name the file as (Event Name)_receipt_${receipt.receiptId}_orderStatus`}
                                onChange={e => handleDocumentChange(receipt.receiptId, e)}
                                isRequired={true}
                            />

                            <InputFileBox
                                label="A screenshot of Transaction Record"
                                id="transactionRecord"
                                name="transactionRecord"
                                description={`*Please name the file as (Event Name)_receipt_${receipt.receiptId}_transactionRecord`}
                                onChange={e => handleDocumentChange(receipt.receiptId, e)}
                                isRequired={true}
                            />
                        </div>
                    }

                    {receipt.paymentMethod === 'TaoBaoWithoutCO' &&
                        <div>
                            <InputFileBox
                                label="A screenshot of the order status shown as 'Delivered' or 'Completed'"
                                id="orderStatus"
                                name="orderStatus"
                                description={`*Please name the file as (Event Name)_receipt_${receipt.receiptId}_orderStatus`}
                                onChange={e => handleDocumentChange(receipt.receiptId, e)}
                                isRequired={true}
                            />

                            <InputFileBox
                                label="A screenshot of Transaction Record"
                                id="transactionRecord"
                                name="transactionRecord"
                                description={`*Please name the file as (Event Name)_receipt_${receipt.receiptId}_transactionRecord`}
                                onChange={e => handleDocumentChange(receipt.receiptId, e)}
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
