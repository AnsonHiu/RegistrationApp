'use client'

import Participant from "@/app/model/participant.model";
import { useEffect } from "react";

export default function CreateParticipant(props: { id: number, participant: Participant, updateParticipant: (participant: Participant) => void }
){
    useEffect(() => {
        if(props.participant.id === undefined){
            let participantToUpdate = new Participant(props.participant);
            participantToUpdate.id = props.id;
            props.updateParticipant(participantToUpdate);
        }
    }, []);

    function updateParticipantName(event: React.ChangeEvent<HTMLInputElement>) {
        let participantToUpdate = new Participant(props.participant);
        participantToUpdate.name = event.target.value;
        props.updateParticipant(participantToUpdate);
    }

    function updateParticipantDancerName(event: React.ChangeEvent<HTMLInputElement>) {
        let participantToUpdate = new Participant(props.participant);
        participantToUpdate.dancername = event.target.value;
        props.updateParticipant(participantToUpdate);
    }

    function updateParticipantEmail(event: React.ChangeEvent<HTMLInputElement>) {
        let participantToUpdate = new Participant(props.participant);
        participantToUpdate.email = event.target.value;
        props.updateParticipant(participantToUpdate);
    }

    function updateParticipantSignedIn(event: React.ChangeEvent<HTMLInputElement>) {
        let participantToUpdate = new Participant(props.participant);
        console.log(event.target.checked);
        participantToUpdate.signedin = !!event.target.checked;
        props.updateParticipant(participantToUpdate);
    }

    function updateParticipantPaid(event: React.ChangeEvent<HTMLInputElement>) {
        let participantToUpdate = new Participant(props.participant);
        console.log(event.target.checked);
        participantToUpdate.paid = !!event.target.checked;
        props.updateParticipant(participantToUpdate);
    }

    return (
        <form className="mt-5">
            <input type='text' placeholder="Participant Name" value={props.participant.name} onChange={updateParticipantName}/>
            <input className="mt-2" type='text' placeholder="Dancer Name" value={props.participant.dancername} onChange={updateParticipantDancerName} />
            <input className="mt-2" type='text' placeholder="Participant Email" value={props.participant.email} onChange={updateParticipantEmail} />
            <div className="flex mt-2">
                <label className="flex mr-5"><span className="mr-2">Signed In</span><input className="self-center" type="checkbox" checked={props.participant.signedin} onChange={updateParticipantSignedIn} /></label>
                <label className="flex"><span className="mr-2">Paid</span><input className="self-center" type="checkbox" checked={props.participant.paid} onChange={updateParticipantPaid} /></label>
            </div>
        </form>
    );
}