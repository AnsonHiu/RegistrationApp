'use client'

import { useEffect, useState } from "react";

import CreateParticipant from "./create-participant";
import EventCategory from "@/app/model/event-category.model";
import Participant from "@/app/model/participant.model";
import Team from "@/app/model/team.model";
import CreateTeam from "./create-team";
import addParticipantsCommandHandler from "@/app/sql/command/insert-participants";
import addTeamsCommandHandler from "@/app/sql/command/insert-teams";
import AddTeamsCommand from "@/app/model/commands/add-teams-command.model";
import { getParticipants } from "@/app/sql/query/get-participants";
import { getTeams } from "@/app/sql/query/get-teams";

export default function EventCategoryView(props: { eventCategory: EventCategory }){
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [newParticipants, setNewParticipants] = useState<Participant[]>([]);
    const [newTeams, setNewTeams] = useState<Team[]>([]);

    useEffect(() => {
        let cancel = false;

        async function fetchParticipants() {
            if(cancel) {
                return;
            }
            const participants = await getParticipants(props.eventCategory.id);
            setParticipants(participants);
        }
        fetchParticipants().catch(console.log);

        return () => { cancel = true };
    }, []);

    useEffect(() => {
        let cancel = false;

        async function fetchTeams() {
            if(cancel) {
                return;
            }
            const teams = await getTeams(props.eventCategory.id);
            setTeams(teams);
        }
        fetchTeams().catch(console.log);
        
        return () => { cancel = true };
    }, []);

    function addParticipant() {
        const newParticipant = new Participant();
        setNewParticipants([...newParticipants, newParticipant]);
    }
    
    function addTeam() {
        let participants = [];
        for(let i=0; i<(props.eventCategory.participantsperteam ?? 1); i++){
            const newTeamParticipant = new Participant();
            newTeamParticipant.id = i;
            participants.push(newTeamParticipant);
        }
        const newTeamId = newTeams.length > 0 
            ? newTeams.reduce((prev, current) => (prev ?? 0) > (current?.id ?? 0) ? prev : (current?.id ?? 0), newTeams[0].id) ?? 0 + 1
            : 0
        const newTeam = new Team({id: newTeamId, name: '', paid: false, signedin: false, participants: [...participants]});
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
                    JSON.parse(JSON.stringify({
                        participants: newParticipants,
                        eventCategoryId: props.eventCategory.id
                    }))
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
                setNewTeams([]);
                const teams = await getTeams(props.eventCategory.id);
                setTeams(teams);
            }
        // TODO: error handling
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="mt-10">
            { props.eventCategory.participantsperteam === 1 && 
                <button type="button" className="secondary" onClick={addParticipant}>Add Participant</button> }
            { props.eventCategory.participantsperteam && props.eventCategory.participantsperteam > 1 && 
                <button type="button" className="secondary" onClick={addTeam}>Add Team</button> }
            <p>Style: {props.eventCategory.style}</p>
            { newParticipants.map((participant, index) => (
                <CreateParticipant key={index} id={index} participant={participant} updateParticipant={updateParticipant}/>
            ))}
            { newTeams.map((team, index) => (
                <CreateTeam key={index}
                    id={index}
                    team={team}
                    updateTeam={updateTeam}/>
            ))}
            { participants.length > 0 || teams.length > 0 && <h2 className="mt-5">Participants</h2> }
                    { props.eventCategory.participantsperteam == 1 && participants.length > 0 &&
                        <table className="mt-5">
                            <thead>
                                <tr>
                                    <td>Name</td>
                                    <td>Paid</td>
                                    <td>Signed In</td>
                                </tr>
                            </thead>
                            <tbody>
                                { participants.map((participant, index) => (
                                    <tr key={index}>
                                        <td>{participant.dancername}</td>
                                        <td>{participant.paid ? 'x' : ''}</td>
                                        <td>{participant.signedin ? 'x' : ''}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                    { props.eventCategory.participantsperteam && props.eventCategory.participantsperteam > 1 && teams.length > 0 &&
                        <table className="mt-5">
                            <thead>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>Paid</td>
                                    <td>Signed In</td>
                                </tr>
                            </thead>
                            <tbody>
                                { teams.map((team) => (
                                    <>
                                    <tr key={team.id}>
                                        <td>{team.name}</td>
                                        <td></td>
                                        <td>{team.participants.every(participant => participant.paid) ? 'x' : ''}</td>
                                        <td>{team.participants.every(participant => participant.signedin) ? 'x' : ''}</td>
                                    </tr>
                                    {team.participants.map((participant) => (
                                        <tr key={[team.id, participant.id].join('-')}>
                                            <td></td>
                                            <td>{participant.dancername}</td>
                                            <td>{participant.paid ? 'x' : ''}</td>
                                            <td>{participant.signedin ? 'x' : ''}</td>
                                        </tr>
                                    ))}
                                    </>
                                ))}
                            </tbody>
                        </table>
                    }
            { (newParticipants.length > 0 || newTeams.length > 0) && <button className="primary mt-5" onClick={save}>Save</button>}
        </div>
    );
}