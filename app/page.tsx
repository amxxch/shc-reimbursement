'use client'
import Steppers from "./components/Steppers";
import PaymentOptions from "./components/PaymentOptions";
import { useEffect } from "react";

export default function Home() {
  const reimbursementSteps = [
    { label: 'Step 1', description: 'Make Payment in your preferred forms', remark: 'Always keep the original receipts'},
    { label: 'Step 2', description: 'Fill in reimbursement forms', remark: 'Within 1 week after the event' },
    { label: 'Step 3', description: 'Submit all the receipts in one batch', remark: 'Submit within 30 days of expense incurrence. It should take 4-6 weeks for payment processing.' },
    { label: 'Step 4', description: 'Sign authorization letter', remark: 'If an individual serves as the claimant on the payers\' behalf' },
  ] 

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <main className="grid min-h-full place-items-center px-6 py-10 sm:py-10 lg:px-8">
      <div className="text-center">
        <h1 className='text-3xl font-bold py-5'>Reimbursement Timeline</h1>
        <Steppers steps={reimbursementSteps} />
        <PaymentOptions />
      </div>
    </main>
  
  );
}
