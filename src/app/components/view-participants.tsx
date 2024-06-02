import { EventCategory } from "../model/event-category.model";
import { Participant } from "../model/participant.model";
import { CreateParticipant, UpdateParticipantType } from "./create-participant";

export function ViewParticipants(props: {
        participants: Participant[],
        eventCategory: EventCategory,
        markParticipantForEdit: (participantId: number, isUpdating: boolean) => void,
        updateParticipant: (updatedParticipant: Participant, updateType: UpdateParticipantType) => void,
        saveParticipant: (participantId: number) => void,
        deleteParticipant: (participantId: number) => void
    }) {
    const markParticipantForUpdate = (participantId: number | undefined) => {
        if(participantId) {
            props.markParticipantForEdit(participantId, true);
        }
    }

    const updateParticipant = (updatedParticipant: Participant) => {
        props.updateParticipant(updatedParticipant, 'ExistingParticipant')
    }

    const saveParticipant = (participantId: number | undefined) => {
        if(participantId) {
            props.saveParticipant(participantId);
        }
    }

    const deleteParticipant = (participantId: number | undefined) => {
        if(participantId) {
            props.deleteParticipant(participantId);
        }
    }

    return(
        <>
            { props.eventCategory.participantsperteam === 1 && props.participants.length > 0 && <h2 className="mt-5">Participants</h2> }
            { props.eventCategory.participantsperteam === 1 && props.participants.length > 0 &&
                <>
                    <div className="mt-5 grid grid-cols-4 gap-4">
                        <div className="justify-self-start">Participant</div>
                        <div className="justify-self-center">Paid</div>
                        <div className="justify-self-center">Signed In</div>
                        <div className="justify-self-center">Actions</div>
                    </div>
                    { props.participants.map((participant) => (
                        (participant.isUpdating && participant.id)
                        ? <div key={participant.id}>
                            <CreateParticipant id={participant.id} participant={participant} updateParticipant={updateParticipant} />
                            <button onClick={() => saveParticipant(participant.id)} className="button primary">Save</button>
                        </div>
                        : <div key={participant.id} className="grid grid-cols-4 mt-2">
                            <div className="justify-self-start">{participant.dancername}</div>
                            <div className="justify-self-center">{participant.paid ? 'x' : ''}</div>
                            <div className="justify-self-center">{participant.signedin ? 'x' : ''}</div>
                            <div className="justify-self-center">
                                <button onClick={() => markParticipantForUpdate(participant.id)} className="button secondary mr-2">Edit</button>
                                <button onClick={() => deleteParticipant(participant.id)} className="button secondary">Delete</button>
                            </div>
                        </div>
                    ))}
                </>
            }
        </>
    );
}