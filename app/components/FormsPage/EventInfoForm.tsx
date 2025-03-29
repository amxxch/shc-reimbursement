'use client'

import { useState } from 'react';
import InputTextBox from '../inputBox/InputTextBox';
import InputFileBox from '../inputBox/InputFileBox';
import { EventInfo } from '../../types';
import FormButton from '../formButton';

interface EventInfoProps {
    eventInfo: EventInfo;
    setEventInfo: (info: EventInfo) => void;
    currentStep: number;
    setCurrentStep: (n: number) => void;
}

const EventInfoForm = ({ eventInfo, setEventInfo, currentStep, setCurrentStep } : EventInfoProps) => {

    // Maximum file size is 5MB
    const MAX_FILE_SIZE = 5 * 1000 * 1000;

    const [errors, setErrors] = useState<Partial<Record<keyof EventInfo, string>>>({});

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const file = e.target.files?.[0];

        if (file) {
            setErrors(prev => {
                const newErrors = {...prev};
                if (newErrors[name as keyof EventInfo]) {
                    delete newErrors[name as keyof EventInfo];
                }
                return newErrors;
            });
        }

        setEventInfo({ ...eventInfo, [name]: file });
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEventInfo({ ...eventInfo, [name]: value });
    };

    const handleNextStep = async (e: React.FormEvent) => {
        e.preventDefault();

        // Simple validation logic
        const newErrors: Partial<Record<keyof EventInfo, string>> = {};

        if (!eventInfo.eventName) newErrors.eventName = 'Event name is required';
        if (!eventInfo.eventDate) newErrors.eventDate = 'Event date is required';
        if (!eventInfo.numOfParticipants) newErrors.numOfParticipants = 'Number of participants is required';
        else if (parseInt(eventInfo.numOfParticipants) <= 0) newErrors.numOfParticipants = 'Number of participants must be more than 0'
        if (!eventInfo.location) newErrors.location = 'Location is required';
        if (!eventInfo.emailPoster || eventInfo.emailPoster.size === 0) newErrors.emailPoster = 'Email poster is required';
        else if (eventInfo.emailPoster.size > MAX_FILE_SIZE) newErrors.emailPoster = 'File size must be less than 5MB';
        // if (!eventInfo.participantList || eventInfo.participantList.size === 0) newErrors.participantList = 'Participant list is required';

        // add more validation logic (maybe to phone number, staff no.)

        if (Object.keys(newErrors).length === 0) {
            setCurrentStep(currentStep + 1);
        } else {
            setErrors(newErrors);
        }
    };

    return (
            <form>
                <hr className="mt-4 mb-4 border-t-2 border-gray-300" />
                <h2 className="text-xl font-bold mb-4 text-center">Event Details</h2>
                <InputTextBox
                    label="Event Name"
                    type="string"
                    id="eventName"
                    name="eventName"
                    value={eventInfo.eventName}
                    onChange={handleTextChange}
                    isRequired={true}
                    error={errors.eventName}
                />
                <InputTextBox
                    label="Event Date"
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={eventInfo.eventDate}
                    onChange={handleTextChange}
                    isRequired={true}
                    error={errors.eventDate}
                />
                <InputTextBox
                    label="Organizing Committee (if applicable)"
                    type="text"
                    id="committee"
                    name="committee"
                    value={eventInfo.committee}
                    onChange={handleTextChange}
                    isRequired={false}
                    error={errors.committee}
                />
                <InputTextBox
                    label="Number of participants"
                    type="number"
                    id="numOfParticipants"
                    name="numOfParticipants"
                    value={eventInfo.numOfParticipants}
                    onChange={handleTextChange}
                    isRequired={true}
                    error={errors.numOfParticipants}
                />
                <InputTextBox
                    label="Location of the event"
                    type="text"
                    id="location"
                    name="location"
                    value={eventInfo.location}
                    onChange={handleTextChange}
                    isRequired={true}
                    error={errors.location}
                />

                <InputFileBox
                    label="Event poster or mass email"
                    id="emailPoster"
                    name="emailPoster"
                    description={"*Please name the file as (Event Name)_emailPoster"}
                    filename={eventInfo.emailPoster?.name}
                    onChange={handleFileChange}
                    isRequired={true}
                    error={errors.emailPoster}
                />

                <InputFileBox
                    label="Participant list"
                    description={
                        <>
                        *Except for compulsory events, such as High Table Dinner<br />
                        *Please name the file as (Event Name)_participantList
                        </>
                    }
                    id="participantList"
                    name="participantList"
                    filename={eventInfo.participantList?.name}
                    onChange={handleFileChange}
                    isRequired={false}
                    error={errors.participantList}
                />

                <FormButton 
                    currentStep={currentStep} 
                    setCurrentStep={setCurrentStep} 
                    handleNextStep={handleNextStep} 
                />
        </form>
    );
};

export default EventInfoForm;
