'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { CreateParticipant } from "./create-participant";
import { EventCategory } from "@/app/model/event-category.model";
import { Participant } from "@/app/model/participant.model";
import { Team } from "@/app/model/team.model";
import { CreateTeam } from "./create-team";
import { addParticipantsCommandHandler } from "@/app/sql/command/insert-participants";
import { addTeamsCommandHandler } from "@/app/sql/command/insert-teams";
import { getParticipants } from "@/app/sql/query/get-participants";
import { getTeams } from "@/app/sql/query/get-teams";
import { ViewParticipants } from "./view-participants";
import { ViewTeams } from "./view-teams";
import { updateTeamCommandHandler } from "../sql/command/update-team";
import { InsertTeamsCommand } from "../sql/model/command/insert-teams-command.model";

export function EventCategoryView(props: { eventCategory: EventCategory }){
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
        const newTeam = new Team({id: newTeamId, name: '', participants: [...participants]});
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

    function updateTeam(updatedTeam: Team, teamToUpdate: 'NewTeam' | 'ExistingTeam'){
        let existingTeamIndex = teamToUpdate === 'NewTeam'
            ? newTeams.findIndex(team => team.id === updatedTeam.id)
            : teams.findIndex(team => team.id === updatedTeam.id);
        if(existingTeamIndex === -1) {
            existingTeamIndex = newTeams.findIndex(team => team.id === undefined);
        }
        if(existingTeamIndex === -1) {
            return;
        }
        
        const actionToPass = teamToUpdate === 'NewTeam'
            ? setNewTeams
            : setTeams;
        const teamsToUpdate = teamToUpdate === 'NewTeam'
            ? newTeams
            : teams;
        updateState(actionToPass, teamsToUpdate, existingTeamIndex, updatedTeam);
    }

    function updateState<T>(methodToUpdate: Dispatch<SetStateAction<T[]>>, items: T[], index: number, updatedItem: T){
        console.log(items);
        methodToUpdate([...items.slice(0, index), updatedItem, ...items.slice(index+1)]);
    }

    function markTeamForEdit(id: number, isUpdate: boolean){
        let teamIndex = teams.findIndex(team => team.id === id);
        if(teamIndex != -1){
            setTeams([...teams.slice(0, teamIndex), {...teams[teamIndex], isUpdate}, ...teams.slice(teamIndex+1)]);
        }
    }

    async function saveTeam(teamId: number) {
        let team = teams.find(team => team.id === teamId)
        if(team){
            const updatedTeam = await updateTeamCommandHandler({team: team});
            let teamIndex = teams.findIndex(team => team.id === updatedTeam.id);
            if(teamIndex != -1){
                setTeams([...teams.slice(0, teamIndex), updatedTeam, ...teams.slice(teamIndex+1)]);
            }
            markTeamForEdit(teamId, false);
        }
    }

    async function deleteTeam(teamId: number) {
        let teamIndex = teams.findIndex(team => team.id === teamId);
        if(teamIndex !== -1) {
            
        }
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
                const addedTeams = await addTeamsCommandHandler(
                    JSON.parse(JSON.stringify(new InsertTeamsCommand({
                        teams: newTeams,
                        eventCategoryId: props.eventCategory.id
                    })))
                );
                setNewTeams([]);
                setTeams([...teams, ...addedTeams]);
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
            { newTeams.map((team, index) => (<CreateTeam key={index} id={index} team={team} updateTeam={(team) => updateTeam(team, 'NewTeam')}/> ))}

            { (newParticipants.length > 0 || newTeams.length > 0) && <button className="primary mt-5" onClick={save}>Save</button>}

            <ViewParticipants participants={participants} eventCategory={props.eventCategory} />
            <ViewTeams 
                teams={teams}
                eventCategory={props.eventCategory}
                markTeamForEdit={markTeamForEdit}
                saveTeam={saveTeam}
                updateTeam={updateTeam}
                deleteTeam={deleteTeam} />
        </div>
    );
}