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
    emailPoster: File;
    participantList: File;
}

interface ReceiptInfo {
    totalAmount: string;
    receipts: Receipt[];
}

interface Receipt {
    receiptId: number;
    description: string;
    paymentMethod: string;
    amount: string;
    copyOfReceipt: File;
    additionalDocs?: Record<string, File>;
}

interface ReimbursementRequest {
    claimantInfo: ClaimantInfo;
    eventInfo: EventInfo;
    receiptInfo: ReceiptInfo;
}

interface Steps {
    label: string;
    description: string;
    remark?: string;
}

export type { ClaimantInfo, EventInfo, ReceiptInfo, Receipt, ReimbursementRequest, Steps }