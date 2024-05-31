'use client'

import Participant from "@/app/model/participant.model";
import { useEffect } from "react";

export default function CreateParticipant(props: { id: number, participant: Participant, updateParticipant: (participant: Participant) => void }
){
    useEffect(() => {
        if(props.participant.id === undefined){
            const id = props.id;
            props.updateParticipant({...props.participant, id});
        }
    }, []);

    function updateParticipantName(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.value;
        props.updateParticipant({...props.participant, name});
    }

    function updateParticipantDancerName(event: React.ChangeEvent<HTMLInputElement>) {
        const dancername = event.target.value;
        props.updateParticipant({...props.participant, dancername});
    }

    function updateParticipantEmail(event: React.ChangeEvent<HTMLInputElement>) {
        const email = event.target.value;
        props.updateParticipant({...props.participant, email});
    }

    function updateParticipantSignedIn(event: React.ChangeEvent<HTMLInputElement>) {
        const signedin = !!event.target.checked;
        props.updateParticipant({...props.participant, signedin});
    }

    function updateParticipantPaid(event: React.ChangeEvent<HTMLInputElement>) {
        const paid = !!event.target.checked;
        props.updateParticipant({...props.participant, paid});
    }

    return (
        <div className="mt-5">
            <input type='text' placeholder="Participant Name" value={props.participant.name} onChange={updateParticipantName}/>
            <input className="mt-2" type='text' placeholder="Dancer Name" value={props.participant.dancername} onChange={updateParticipantDancerName} />
            <input className="mt-2" type='text' placeholder="Participant Email" value={props.participant.email} onChange={updateParticipantEmail} />
            <div className="flex mt-2">
                <label className="flex mr-5"><span className="mr-2">Signed In</span><input className="self-center" type="checkbox" checked={props.participant.signedin} onChange={updateParticipantSignedIn} /></label>
                <label className="flex"><span className="mr-2">Paid</span><input className="self-center" type="checkbox" checked={props.participant.paid} onChange={updateParticipantPaid} /></label>
            </div>
        </div>
    );
}