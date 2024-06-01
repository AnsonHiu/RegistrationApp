import { Team } from "@/app/model/team.model";
import { useEffect, useState } from "react";
import { CreateParticipant } from "./create-participant";
import { Participant } from "../model/participant.model";

export function CreateTeam(props: { id: number, team: Team, updateTeam: (team: Team) => void }) {
    const [team, setTeam] = useState<Team>(props.team);

    useEffect(() => {
        if(props.team.id === undefined){
            let teamToUpdate = new Team(props.team);
            teamToUpdate.id = props.id;
            props.updateTeam(teamToUpdate);
        }
    }, []);

    useEffect(() => {
        setTeam(props.team);
    }, []);

    function updateTeamName(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.value;
        const updatedTeam = {...team, name};
        setTeam(updatedTeam);
        props.updateTeam(updatedTeam);
    }

    function updateParticipant(updatedParticipant: Participant) {
        let existingParticipantIndex = team.participants.findIndex(participant => participant.id === updatedParticipant.id);
        if(existingParticipantIndex === -1) {
            existingParticipantIndex = team.participants.findIndex(participant => participant.id === undefined);
        }
        if(existingParticipantIndex === -1) {
            return;
        }
        const participants = [...team.participants.slice(0, existingParticipantIndex), updatedParticipant, ...team.participants.slice(existingParticipantIndex+1)]
        const updatedTeam = {...team, participants};
        setTeam(updatedTeam);
        props.updateTeam(updatedTeam);
    }

    return (
        <div className="mt-5">
            <input type='text' placeholder="Team Name" onChange={updateTeamName} value={team.name}/>
            <div className="flex flex-row mt-2">
                {team.participants.map((participant, index) => (
                    <CreateParticipant key={index} id={index} participant={participant} updateParticipant={updateParticipant}/> 
                ))}
            </div>
        </div>
    );
}

export type UpdateTeamType = 'NewTeam' | 'ExistingTeam';