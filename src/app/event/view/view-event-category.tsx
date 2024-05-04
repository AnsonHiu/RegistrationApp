'use client'

import { useEffect, useState } from "react";

import CreateParticipant from "../participant/create/create-participant";
import EventCategory from "@/app/model/event-category.model";
import Participant from "@/app/model/participant.model";
import Team from "@/app/model/team.model";
import CreateTeam from "../team/create/create-team";
import addParticipantsCommandHandler from "@/app/sql/command/insert-participants";
import addTeamsCommandHandler from "@/app/sql/command/insert-teams";
import AddParticipantsCommand from "@/app/model/commands/add-participants-command.model";
import AddTeamsCommand from "@/app/model/commands/add-teams-command.model";
import { getParticipants } from "@/app/sql/query/get-participants";

export default function EventCategoryView(props: { eventCategory: EventCategory }){
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [newParticipants, setNewParticipants] = useState<Participant[]>([]);
    const [newTeams, setNewTeams] = useState<Team[]>([]);

    useEffect(() => {
        let cancel = false;

        async function fetchEvents() {
            if(cancel) {
                return;
            }
            const participants = await getParticipants(props.eventCategory.id);
            setParticipants(participants);
        }
        fetchEvents().catch(console.log);

        return () => { cancel = true };
    }, []);

    function addParticipant() {
        const newParticipant = new Participant({dancername: '', paid: false, signedin: false, id: undefined, name: '', email: ''});
        setNewParticipants([...newParticipants, newParticipant]);
    }
    
    function addTeam() {
        const newTeam = new Team({id: undefined, name: '', paid: false, signedIn: false});
        setNewTeams([...newTeams, newTeam]);
    }

    function updateParticipant(updatedParticipant: Participant) {
        let existingParticipantIndex = newParticipants.findIndex(participant => participant.id === updatedParticipant.id);
        if(existingParticipantIndex === -1) {
            existingParticipantIndex = newParticipants.findIndex(participant => participant.id === undefined);
        }
        if(existingParticipantIndex === -1) {
            return;
        }
        setNewParticipants([...newParticipants.slice(0, existingParticipantIndex), updatedParticipant, ...newParticipants.slice(existingParticipantIndex+1)]);
    }

    function updateTeam(updatedTeam: Team) {
        let existingTeamIndex = newTeams.findIndex(team => team.id === updatedTeam.id);
        if(existingTeamIndex === -1) {
            existingTeamIndex = newTeams.findIndex(team => team.id === undefined);
        }
        if(existingTeamIndex === -1) {
            return;
        }
        setNewTeams([...newTeams.slice(0, existingTeamIndex), updatedTeam, ...newTeams.slice(existingTeamIndex+1)]);
    }

    async function save() {
        try{
            if(newParticipants.length > 0) {
                await addParticipantsCommandHandler(
                    JSON.parse(JSON.stringify(new AddParticipantsCommand({
                        participants: newParticipants,
                        eventCategoryId: props.eventCategory.id
                    })))
                );
                setNewParticipants([]);
                const participants = await getParticipants(props.eventCategory.id);
                setParticipants(participants);
            }
            if(newTeams.length > 0) {
                await addTeamsCommandHandler(
                    JSON.parse(JSON.stringify(new AddTeamsCommand({
                        teams: newTeams,
                        eventCategoryId: props.eventCategory.id
                    })))
                );
            }
        // TODO: error handling
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="mt-5">
            { props.eventCategory.participantsperteam === 1 && 
                <button type="button" className="secondary" onClick={addParticipant}>Add Participant</button> }
            { props.eventCategory.participantsperteam > 1 && 
                <button type="button" className="secondary" onClick={addTeam}>Add Team</button> }
            <p>Style: {props.eventCategory.style}</p>
            { newParticipants.map((participant, index) => (
                <CreateParticipant key={index} id={index} participant={participant} updateParticipant={updateParticipant}/>
            ))}
            { newTeams.map((team, index) => (
                <CreateTeam key={index} id={index} team={team} updateTeam={updateTeam}/>
            ))}
            <h2 className="mt-5">Participants</h2>
            { participants.map((participant, index) => (
                    <table className="mt-5">
                        <thead>
                            <tr>
                                <td></td>
                                <td>Paid</td>
                                <td>Signed In</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={index}>
                                <td>{participant.dancername}</td>
                                <td>{participant.paid}</td>
                                <td>{participant.signedin}</td>
                            </tr>
                        </tbody>
                    </table>
            ))}
            { (newParticipants.length > 0 || newTeams.length > 0) && <button className="primary mt-5" onClick={save}>Save</button>}
        </div>
    );
}