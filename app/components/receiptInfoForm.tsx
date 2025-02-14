'use client'

import { useState } from 'react';
import InputTextBox from './inputTextBox';
import InputFileBox from './inputFileBox';
import InputSelectBox from './inputSelectBox';
import { ReceiptInfo, Receipt } from '../types';

interface ReceiptInfoProps {
    receiptInfo: ReceiptInfo;
    onChange: (info: ReceiptInfo) => void;
}

const ReceiptInfoForm = ({ receiptInfo, onChange } : ReceiptInfoProps) => {

    const [errors, setErrors] = useState<Partial<ReceiptInfo>>({});

    const handleReceiptInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange({ ...receiptInfo, [name]: value });
    };

    const handleReceiptChange = (id: number, e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        onChange({
            ...receiptInfo,
            receipts: [
                ...receiptInfo.receipts.map((receipt) => 
                receipt.id === id ? ({ ...receipt, [name]: value}) : receipt)
            ],
        });
    };

    const addReceipt = () => {
        const newReceiptId = receiptInfo.receipts.length + 1;
        onChange({
            ...receiptInfo,
            receipts: [
                ...receiptInfo.receipts,
                { id: newReceiptId, description: '', amount: '' },
            ],
        });
    };

    const removeReceipt = (id: number) => {
        onChange({
            ...receiptInfo,
            receipts: receiptInfo.receipts
                .filter((receipt) => receipt.id !== id)
                .map((receipt, index) => ({ ...receipt, id: index + 1 }))
        })
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
                <h2 className="text-xl font-bold mb-4 text-center">Receipts</h2>
                <InputTextBox
                    label="Total reimbursement amount"
                    type="number"
                    id="totalAmount"
                    name="totalAmount"
                    value={receiptInfo.totalAmount}
                    onChange={handleReceiptInfoChange}
                    isRequired={true}
                    error={errors.totalAmount}
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
                            { label: 'Cash', value: 'Cash' },
                            { label: 'Octopus', value: 'Octopus' },
                            { label: 'Debit / Credit Card', value: 'Card' },
                            { label: 'Apple Pay', value: 'ApplePay' },
                            { label: 'Alipay', value: 'Alipay' },
                            { label: 'Wechat Pay', value: 'WechatPay' },
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
        </form>
    );
};

export default ReceiptInfoForm;
