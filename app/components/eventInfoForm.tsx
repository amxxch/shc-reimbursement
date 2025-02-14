'use client'

import { useState } from 'react';
import InputTextBox from './inputTextBox';
import InputFileBox from './inputFileBox';
import { EventInfo } from '../types';

interface EventInfoProps {
    eventInfo: EventInfo;
    onChange: (info: EventInfo) => void;
}

const EventInfoForm = ({ eventInfo, onChange } : EventInfoProps) => {

    const [errors, setErrors] = useState<Partial<EventInfo>>({});

    const handleEventInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange({ ...eventInfo, [name]: value });
    };

    const handleNext = async (e: React.FormEvent) => {
        e.preventDefault();

        // Simple validation logic
        const newErrors: Partial<EventInfo> = {};

        if (!eventInfo.eventName) newErrors.eventName = 'Event name is required';
        if (!eventInfo.eventDate) newErrors.eventDate = 'Event date is required';
        if (!eventInfo.numOfParticipants) newErrors.numOfParticipants = 'Number of participants is required';
        if (!eventInfo.location) newErrors.location = 'Location is required';

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
                <h2 className="text-xl font-bold mb-4 text-center">Event Details</h2>
                <InputTextBox
                    label="Event Name"
                    type="string"
                    id="eventName"
                    name="eventName"
                    value={eventInfo.eventName}
                    onChange={handleEventInfoChange}
                    isRequired={true}
                    error={errors.eventName}
                />
                <InputTextBox
                    label="Event Date"
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={eventInfo.eventDate}
                    onChange={handleEventInfoChange}
                    isRequired={true}
                    error={errors.eventDate}
                />
                <InputTextBox
                    label="Organizing Committee (if applicable)"
                    type="text"
                    id="committee"
                    name="committee"
                    value={eventInfo.committee}
                    onChange={handleEventInfoChange}
                    isRequired={false}
                    error={errors.committee}
                />
                <InputTextBox
                    label="Number of participants"
                    type="number"
                    id="numOfParticipants"
                    name="numOfParticipants"
                    value={eventInfo.numOfParticipants}
                    onChange={handleEventInfoChange}
                    isRequired={true}
                    error={errors.numOfParticipants}
                />
                <InputTextBox
                    label="Location of the event"
                    type="text"
                    id="location"
                    name="location"
                    value={eventInfo.location}
                    onChange={handleEventInfoChange}
                    isRequired={true}
                    error={errors.location}
                />

                <InputFileBox
                    label="Event poster or mass email"
                    id="eventPoster"
                    name="eventPoster"
                    onChange={handleEventInfoChange}
                    isRequired={true}
                />

                <InputFileBox
                    label="Participant list"
                    id="participantList"
                    name="participantList"
                    onChange={handleEventInfoChange}
                    isRequired={true}
                />
        </form>
    );
};

export default EventInfoForm;
