import { z } from 'zod';

const ClaimantInfoSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phoneNo: z.string(),
    uid: z.string(),
});

const EventInfoSchema = z.object({
    eventName: z.string(),
    eventDate: z.date(),
    committee: z.string().optional(),
    numOfParticipants: z.string(), 
    location: z.string(),
    emailPoster: z.any().optional(),
    participantList: z.any().optional(),
});

const ReceiptSchema = z.object({
    id: z.number(),
    description: z.string(),
    paymentMethod: z.string(),
    amount: z.string(),
    copyOfReceipt: z.any(),
    additionalDocs: z.array(z.object({ key: z.any() })).optional(),
});

const ReceiptInfoSchema = z.object({
    totalAmount: z.string(),
    receipts: z.array(ReceiptSchema),
});

const ReimbursementRequestSchema = z.object({
    claimantInfo: ClaimantInfoSchema,
    eventInfo: EventInfoSchema,
    receiptInfo: ReceiptInfoSchema,
});

// export the schema
export default { ClaimantInfoSchema, EventInfoSchema, ReceiptInfoSchema, ReimbursementRequestSchema };