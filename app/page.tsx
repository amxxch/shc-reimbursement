import Image from "next/image";
import Steppers from "./components/steppers";
import PaymentCards from "./components/paymentOptions";

export default function Home() {
  const reimbursementSteps = [
    { label: 'Step 1', description: 'Propose event and budget', remark: ''},
    { label: 'Step 2', description: 'Make Payment in your preferred forms', remark: 'Always keep the receipts' },
    { label: 'Step 3', description: 'Fill in reimbursement forms within 1 week after the event', remark: '' },
    { label: 'Step 4', description: 'Wait for your reimbursement.', remark: 'It should take 6-9 weeks to process.' },
  ] 
  return (
    <main className="grid min-h-full place-items-center px-6 py-10 sm:py-10 lg:px-8">
      <div className="text-center">
        <h1 className='text-3xl font-bold py-5'>Reimbursement Timeline</h1>
        <Steppers steps={reimbursementSteps} />
        <PaymentCards />
      </div>
    </main>
  
  );
}
