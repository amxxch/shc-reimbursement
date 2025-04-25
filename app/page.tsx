'use client'
import Steppers from "./components/steppers";
import PaymentOptions from "./components/paymentOptions";
import GoToForm from "./components/goToForm";
import { useEffect, useState } from "react";
import ReceiptsReminder from "./components/receiptsReminder";

export default function Home() {
  const reimbursementSteps = [
    { label: 'Step 1', description: 'BEFORE you make a purchase: Please read carefully the documents that need to be submitted for different payment methods before choosing one to purchase. We strongly recommend that you choose cash, Octopus or physical credit card transactions, which are the easist ways to get reimbursed.', remark: ''},
    { label: 'Step 1.5', description: 'DURING the purchase: Please keep all original receipts and ensure they are ACCEPTABLE', remark: 'Failure to do so will not be able to do reimbursement' },
    { label: 'Step 2', description: 'AFTER the purchase: Fill in reimbursement forms and upload REQUIRED MATERIALS (as stipulated in step)', remark: 'Within 1 week after the event' },
    { label: 'Step 3', description: 'Submit the original receipts in one batch to the general office', remark: 'Submit as soon as possible to the general office on the 4th floor' },
    // { label: 'Step 4', description: 'Sign authorization letter', remark: 'If an individual serves as the claimant on the payers\' behalf' },
  ];

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <main className="grid min-h-full place-items-center px-6 py-10 sm:py-10 lg:px-8">
      <div className="text-center">
        <h1 className='text-3xl font-bold py-5'>Reimbursement Timeline: Click the step buttons to see the actions that should be performed</h1>
        <Steppers steps={reimbursementSteps} activeStep={activeStep} setActiveStep={setActiveStep} />
        { activeStep === 0 && <PaymentOptions /> }
        { activeStep === 1 && <ReceiptsReminder /> }
        { activeStep === 2 && <GoToForm /> }
      </div>
    </main>
  
  );
}
