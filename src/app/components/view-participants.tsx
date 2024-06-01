import EventCategory from "../model/event-category.model";
import Participant from "../model/participant.model";

export default function ViewParticipants(props: {participants: Participant[], eventCategory: EventCategory}) {
    return(
        <>
            { props.eventCategory.participantsperteam === 1 && props.participants.length > 0 && <h2 className="mt-5">Participants</h2> }
            { props.eventCategory.participantsperteam === 1 && props.participants.length > 0 &&
                <table className="mt-5">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Paid</td>
                            <td>Signed In</td>
                        </tr>
                    </thead>
                    <tbody>
                        { props.participants.map((participant, index) => (
                            <tr key={index}>
                                <td>{participant.dancername}</td>
                                <td>{participant.paid ? 'x' : ''}</td>
                                <td>{participant.signedin ? 'x' : ''}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </>
    );
}