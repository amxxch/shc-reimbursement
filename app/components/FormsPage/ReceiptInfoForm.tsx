'use client'

import { useState } from 'react';
import InputTextBox from '../inputBox/inputTextBox';
import InputFileBox from '../inputBox/inputFileBox';
import InputSelectBox from '../inputBox/inputSelectBox';
import { ReceiptInfo, Receipt } from '../../types';
import FormButton from '../formButton';

interface ReceiptInfoProps {
    receiptInfo: ReceiptInfo;
    onChange: (info: ReceiptInfo) => void;
    currentStep: number;
    setCurrentStep: (n: number) => void;
}

interface ReceiptErrors {
    [key: string]: Partial<Record<keyof Receipt, string>>;
}

const ReceiptInfoForm = ({ receiptInfo, onChange, currentStep, setCurrentStep } : ReceiptInfoProps) => {

    const [infoErrors, setInfoErrors] = useState<Partial<Record<keyof ReceiptInfo, string>>>({});
    const [receiptErrors, setReceiptErrors] = useState<ReceiptErrors>({});

    const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange({ ...receiptInfo, [name]: value });
    };

    const handleReceiptChange = (id: number, e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const realValue = type === 'file' ? e.target.files?.[0] : value;

        onChange({
            ...receiptInfo,
            receipts: [
                ...receiptInfo.receipts.map((receipt) => 
                receipt.receiptId === id ? ({ ...receipt, [name]: realValue}) : receipt)
            ],
        });

    };

    const addReceipt = () => {
        const newReceiptId = receiptInfo.receipts.length + 1;
        onChange({
            ...receiptInfo,
            receipts: [
                ...receiptInfo.receipts,
                { 
                    receiptId: newReceiptId, 
                    description: '', 
                    amount: '', 
                    paymentMethod: '', 
                    copyOfReceipt: new File([], '') 
                },
            ],
        });
    };

    const removeReceipt = (id: number) => {
        onChange({
            ...receiptInfo,
            receipts: receiptInfo.receipts
                .filter((receipt) => receipt.receiptId !== id)
                .map((receipt, index) => ({ ...receipt, id: index + 1 }))
        })
    };

    const handleNextStep = async (e: React.FormEvent) => {
        e.preventDefault();

        // add checking if total amount === sum of each receipt

        // Simple validation logic
        const newInfoErrors: Partial<Record<keyof ReceiptInfo, string>> = {};
        const newReceiptErrors: ReceiptErrors = {};
        
        receiptInfo.receipts.forEach((receipt) => {
            const receiptError: Partial<Record<keyof Receipt, string>> = {};
            if (!receipt.description) receiptError.description = 'Description is required'
            if (!receipt.amount) receiptError.amount = 'Amount is required'
            else if (parseInt(receipt.amount) <= 0) receiptError.amount = 'Amount must be more than 0'
            if (!receipt.paymentMethod) receiptError.paymentMethod = 'Payment method is required'
            if (!receipt.copyOfReceipt) receiptError.copyOfReceipt = 'A copy of receipt is required'

            if (Object.keys(receiptError).length !== 0) {
                newReceiptErrors[receipt.receiptId] = receiptError;
            }
        })

        if (!receiptInfo.totalAmount) newInfoErrors.totalAmount = 'Total Amount is required'
        else if (parseInt(receiptInfo.totalAmount) <= 0) newInfoErrors.totalAmount = 'Total amount must be more than 0'
        if (receiptInfo.receipts.length === 0) newInfoErrors.receipts = 'At least one receipt is required'

        if (Object.keys(newInfoErrors).length === 0 && Object.keys(newReceiptErrors).length === 0) {
            setCurrentStep(currentStep + 1)
        } else {
            setInfoErrors(newInfoErrors);
            setReceiptErrors(newReceiptErrors);
        }
    };

    return (
        <form onSubmit={ handleNextStep }>
            <hr className="mt-4 mb-4 border-t-2 border-gray-300" />
            <h2 className="text-xl font-bold mb-4 text-center">Receipts</h2>
            <InputTextBox
                label="Total reimbursement amount (in HKD)"
                type="number"
                id="totalAmount"
                name="totalAmount"
                value={receiptInfo.totalAmount}
                onChange={handleInfoChange}
                isRequired={true}
                error={infoErrors.totalAmount}
            />

            <button className='flex btn mb-4' onClick={addReceipt}>+ Add new receipt</button>
            <span className='flex text-red-500 text-xs'>{infoErrors.receipts}</span>

            {receiptInfo.receipts.map((receipt, index) => (
            <div key={receipt.receiptId} className="mb-4 p-4 border rounded-lg shadow-sm">
                <label className="block text-lg font-bold text-gray-700 mb-2">
                    Receipt {receipt.receiptId}
                </label>

                <InputTextBox
                    label="Description"
                    type="text"
                    id="description"
                    name="description"
                    value={receiptInfo.receipts[index].description}
                    onChange={e => handleReceiptChange(receipt.receiptId, e)}
                    isRequired={true}
                    error={receiptErrors[receipt.receiptId]?.description}
                /> 

                <InputSelectBox
                    label="Payment Method"
                    id="paymentMethod"
                    name="paymentMethod"
                    value={receiptInfo.receipts[index].paymentMethod}
                    onChange={e => handleReceiptChange(receipt.receiptId, e)}
                    isRequired={true}
                    options={[
                        { label: 'Cash', value: 'Cash' },
                        { label: 'Octopus', value: 'Octopus' },
                        { label: 'Debit / Credit Card', value: 'Card' },
                        { label: 'Mobile Payment Services (with card)', value: 'MobileWithCard' },
                        { label: 'Mobile Payment Services (with balance)', value: 'MobileWithBalance' },
                        { label: 'Online Purchases', value: 'OnlinePurchases' },
                        { label: 'TaoBao using cash/octopus', value: 'TaoBaoWithCO' },
                        { label: 'TaoBao using payments other than cash/octopus', value: 'TaoBaoWithoutCO' },
                    ]}
                    error={receiptErrors[receipt.receiptId]?.paymentMethod}
                />
                <InputTextBox
                    label="Amount (in HKD)"
                    type="number"
                    id="amount"
                    name="amount"
                    value={receiptInfo.receipts[index].amount}
                    onChange={e => handleReceiptChange(receipt.receiptId, e)}
                    isRequired={true}
                    error={receiptErrors[receipt.receiptId]?.amount}
                />
                <InputFileBox
                    label="A copy of receipt"
                    id="copyOfReceipt"
                    name="copyOfReceipt"
                    description={`*Please name the file as (Event Name)_receipt_${receipt.receiptId}`}
                    filename={receiptInfo.receipts[index].copyOfReceipt?.name}
                    onChange={e => handleReceiptChange(receipt.receiptId, e)}
                    isRequired={true}
                    error={receiptErrors[receipt.receiptId]?.copyOfReceipt}
                />

                <button type="button" onClick={() => removeReceipt(receipt.receiptId)} className="text-red-500 mt-2">
                    Remove
                </button>
            </div>
            ))}

            <FormButton 
                currentStep={currentStep} 
                setCurrentStep={setCurrentStep} 
                handleNextStep={handleNextStep} 
            />
        </form>
    );
};

export default ReceiptInfoForm;
