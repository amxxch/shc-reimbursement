/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useEffect, useState } from "react";
import ViewFileButton from "../components/ViewFileButton";
import CircularProgress from '@mui/material/CircularProgress';
import { DeleteConfirmation } from "../components/DeleteConfirmation";
import { TrashIcon } from "@heroicons/react/20/solid";
import { FaEnvelope, FaFile } from "react-icons/fa";

interface AdditionalDocumentDto {
    doc_id: number;
    receipt_id: number;
    doc_type: string;
    file_path: string;
}

interface ReceiptDto {
    receipt_id: number;
    request_id: number;
    description: string;
    payment_method: string; 
    amount: number;
    copyOfReceipt: string;
    additional_docs: AdditionalDocumentDto[];
}

interface ReimbursementRequestDto {
    request_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    uid: string;

    event_name: string;
    event_date: Date | string;  // Can be parsed to Date object 
    organizing_committee: string | null;
    num_of_participants: number;
    location: string;
    total_amount: number;
    email_poster: string;
    participant_list: null | string; 
    submission_date: Date | string; // Can be parsed to Date object
    status: "Pending" | "Approved" | "Rejected" | string;
    receipts: ReceiptDto[];
}



export default function AdminPage() {

    const [requestsList, setRequestsList] = useState<ReimbursementRequestDto[]>([]);
    const [expandedRequestId, setExpandedRequestId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchRequests = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/requests', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Failed to fetch requests');

        const data = await response.json();

        setRequestsList(data.map((req: ReimbursementRequestDto) => ({
          ...req,
          submission_date: new Date(req.submission_date),
          event_date: new Date(req.event_date)
        })));

        setRequestsList((prev) => prev.sort((a, b) => {
          const dateA = new Date(a.submission_date).getTime();
          const dateB = new Date(b.submission_date).getTime();
          return dateB - dateA;
        }));

      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleUpdateStatus = async (requestId: number, status: string) => {
    try {
      const response = await fetch(`/api/requests/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) throw new Error('Failed to update status');

      const updatedRequest = await response.json();

      setRequestsList((prev) => prev.map((req) => 
        req.request_id === requestId ? {
            ...req,
            status: updatedRequest.status
        }
        : req
      ));

      toggleExpand(null)

    } catch (error) {
      console.error('Error updating status:', error);
    }
  }

  const handleDeleteRequest = async (requestId: number) => {
    try {
        const response = await fetch(`/api/requests/${requestId}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Failed to delete request');

    } catch (error) {
        console.error('Error deleting request:', error);
    }
  }

  const onConfirmDelete = async (requestId: number) => {
    setIsDeleting(true);
    await handleDeleteRequest(requestId);
    setRequestsList((prev) => prev.filter((req) => req.request_id !== requestId));
    setIsDeleting(false);
    setIsDeleteConfirmationOpen(false);
  }

  const onCancelDelete = () => {
    setIsDeleting(false);
    setIsDeleteConfirmationOpen(false);
  }

  const toggleExpand = (requestId?: number | null) => {
    if (requestId === undefined) {
      setExpandedRequestId(null);
      return;
    }
    setExpandedRequestId((prev) => (prev === requestId ? null : requestId));
  }

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  const formatString = (text: string) => {
    return text
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before capital letters
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
  }
    
  return (
    <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-medium text-gray-900 text-center my-10">Reimbursement Requests Records</h1>
        {isDeleteConfirmationOpen && (
            <DeleteConfirmation
                onClose={onCancelDelete}
                onConfirm={() => onConfirmDelete(expandedRequestId as number)}
                isLoading={isDeleting}
            />
        )}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <CircularProgress size="8rem"/>
        </div>
      ) : (
        <div className="space-y-4">
          {requestsList.map((request) => (
            <div 
              key={request.request_id} 
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-all duration-200"
            >
              <div 
                className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 ${
                  expandedRequestId === request.request_id ? 'bg-gray-50' : ''
                }`}
                onClick={() => toggleExpand(request.request_id)}
              >
                <div className="w-20 font-medium text-gray-600">#{request.request_id}</div>
                <div className="flex-1 font-medium">{request.event_name}</div>
                <div className="flex-1">{request.first_name} {request.last_name}</div>
                <div className="flex-1 text-gray-600">{formatDate(request.submission_date)}</div>
                <div className={`w-24 text-center py-1 rounded-full text-sm font-medium ${
                  request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  request.status === 'InProgress' ? 'bg-yellow-100 text-yellow-800' :
                  request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {request.status}
                </div>
                <div className="w-8 text-center">
                  {expandedRequestId === request.request_id ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
              
              {expandedRequestId === request.request_id && (
                <div className="p-6 border-t border-gray-200 bg-white">
                    {/* Button */}
                    <div className="flex justify-end mb-3 gap-5">
                        <button
                            className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-sm hover:bg-gray-100"
                        >
                            {/* <FaFile className="h-5 w-5" /> */}
                            Auto Fill
                        </button>
                        
                        <button
                            className="text-gray-600 hover:text-black p-2"
                        >
                            <FaEnvelope className="h-5 w-5" />
                        </button>
                        <button
                            onClick={() => setIsDeleteConfirmationOpen(true)}
                            className="text-red-600 hover:text-red-800 p-2"
                            aria-label="Delete request"
                        >
                            <TrashIcon className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Claimant Info */}
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Claimant Info</h3>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Claimant Name</h3>
                            <p className="mt-1">{request.first_name} {request.last_name}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">University Number</h3>
                            <p className="mt-1">{request.uid}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Email</h3>
                            <p className="mt-1">{request.email}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                            <p className="mt-1 font-medium">{request.phone_number}</p>
                        </div>
                    </div>

                    {/* Event Info */}
                    <h3 className="text-lg font-medium text-gray-900 mt-2 mb-4">Event Info</h3>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Event Name</h3>
                            <p className="mt-1">{request.event_name}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Committee</h3>
                            <p className="mt-1">{request.organizing_committee || 'N/A'}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Event Date</h3>
                            <p className="mt-1">{formatDate(request.event_date)}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Location</h3>
                            <p className="mt-1">{request.location}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Number of Participants</h3>
                            <p className="mt-1">{request.num_of_participants}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Total Amount</h3>
                            <p className="mt-1 font-medium">HK${request.total_amount.toFixed(2)}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Mass Email or Poster</h3>
                            {(request.email_poster && request.email_poster !== 'undefined') ? (
                            <div className="mt-2">
                                <ViewFileButton
                                    key='poster'
                                    href={request.email_poster}
                                    color="blue"
                                    text="View Poster"
                                />
                            </div>
                            ) : (
                            <p className="mt-1">N/A</p>
                            )}
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Participant List</h3>
                            
                            {(request.participant_list && request.participant_list !== 'undefined') ? (
                            <div className="mt-2">
                                <ViewFileButton
                                    key='participant_list'
                                    href={request.participant_list ? request.participant_list : ''}
                                    color="blue"
                                    text="View Participant List"
                                />
                            </div>
                            ) : (
                            <p className="mt-1">N/A</p>
                            )}
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Multiple Payers Authorization Letter</h3>
                            
                            {/* {(request.participant_list && request.participant_list !== 'undefined') ? (
                            <div className="mt-2">
                                <ViewFileButton
                                    key='participant_list'
                                    href={request.participant_list ? request.participant_list : ''}
                                    color="blue"
                                    text="View Participant List"
                                />
                            </div>
                            ) : (
                            <p className="mt-1">N/A</p>
                            )} */}
                            <p className="mt-1">N/A</p>
                        </div>
                    </div>
                  
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Receipts</h3>
                  <div className="space-y-4">
                    {request.receipts.map((receipt) => (
                      <div key={receipt.receipt_id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                                <h4 className="font-medium">{receipt.description}</h4>
                            <ViewFileButton
                                key={receipt.receipt_id}
                                href={receipt.copyOfReceipt}
                                color="blue"
                                text="View Receipt"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Amount</h3>
                                <p className="mt-1">HK${receipt.amount.toFixed(2)}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Payment Method</h3>
                                <p className="mt-1">{formatString(receipt.payment_method)}</p>
                            </div>
                        </div>
                        
                        {receipt.additional_docs.length > 0 && (
                          <div className="mt-3">
                            <h5 className="text-sm font-medium text-gray-500 mb-2">Supporting Documents</h5>
                            <div className="flex flex-wrap gap-2">
                              {receipt.additional_docs.map((doc) => (
                                <ViewFileButton
                                    key={doc.doc_id}
                                    href={doc.file_path}
                                    color="gray"
                                    text={formatString(doc.doc_type)}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end mr-5 mt-10 gap-7">
                    <button
                        className="px-3 py-3 bg-green-50 text-green-500 rounded-md text-sm hover:bg-gray-100"
                        onClick={() => handleUpdateStatus(request.request_id, 'Approved')}
                    >
                        Completed
                    </button>

                    <button
                        className="px-3 py-1 bg-red-50 text-red-600 rounded-md text-sm hover:bg-gray-100"
                        onClick={() => handleUpdateStatus(request.request_id, 'Rejected')}
                    >
                        Rejected
                    </button>
                    {/* <button
                        className="px-3 py-1 bg-red-50 text-red-600 rounded-md text-sm hover:bg-gray-100"
                        onClick={() => handleUpdateStatus(request.request_id, 'Pending')}
                    >
                        Pending
                    </button> */}
                </div>
                </div>
              )}
            </div>
            
          ))}
        </div>
      )}
    </div>
  );
}
