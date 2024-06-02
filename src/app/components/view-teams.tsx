import { useEffect, useState } from "react";
import { EventCategory } from "../model/event-category.model";
import { Team } from "../model/team.model";
import { CreateTeam, UpdateTeamType } from "./create-team";

export function ViewTeams(
    props: {
        teams: Team[],
        eventCategory: EventCategory,
        markTeamForEdit: (teamId: number, isUpdate: boolean) => void,
        saveTeam: (teamId: number) => void,
        updateTeam: (updatedTeam: Team, updateType: UpdateTeamType) => void,
        deleteTeam: (teamId: number) => void
    }) {
    const [teams, setTeams] = useState<Team[]>(props.teams);
    const markTeamForEdit = (teamId: number|undefined) => {
        if(teamId) {
            props.markTeamForEdit(teamId, true);
        }
    }

    const updateTeam = (updatedTeam: Team) => {
        props.updateTeam(updatedTeam, 'ExistingTeam');
    }

    const saveTeam = (teamId: number | undefined) => {
        if(teamId){
            props.saveTeam(teamId);
        }
    }

    const deleteTeam = (teamId: number | undefined) => {
        if(teamId){
            props.deleteTeam(teamId);
        }
    }

    useEffect(() => {
        setTeams(props.teams);
    }, [props.teams]);

    return (
        <>
            { props.teams.length > 0 && <h2 className="mt-5">Teams</h2> }
            { props.eventCategory.participantsperteam && props.eventCategory.participantsperteam > 1 && props.teams.length > 0 &&
            <div>
                <div className="mt-5 grid grid-cols-5 gap-4">
                    <div className="justify-self-start">Team</div>
                    <div className="justify-self-start">Participant</div>
                    <div className="justify-self-center">Paid</div>
                    <div className="justify-self-center">Signed In</div>
                    <div className="justify-self-center">Actions</div>
                </div>
                { teams.map((team) => (
                    (team.isUpdate && team.id)
                    ? <div key={team.id}>
                        <CreateTeam id={team.id} team={team} updateTeam={updateTeam} />
                        <button onClick={() => saveTeam(team.id)} className="button primary">Save</button>
                    </div>
                    : <div key={team.id}>
                        <div className="grid grid-cols-5">
                            <div className="justify-self-start">{ team.name }</div>
                            <div></div>
                            <div className="justify-self-center">{team.participants.every(participant => participant.paid) ? 'x' : ''}</div>
                            <div className="justify-self-center">{team.participants.every(participant => participant.signedin) ? 'x' : ''}</div>
                            <div>
                                <button className="secondary button mr-2" onClick={() => markTeamForEdit(team.id)}>Edit</button>
                                <button className="secondary button" onClick={() => deleteTeam(team.id)}>Delete</button>
                            </div>
                        </div>
                        {team.participants.map((participant) => (
                            <div key={[team.id, participant.id].join('-')} className="grid grid-cols-5">
                                <div></div>
                                <div className="justify-self-start">{participant.dancername}</div>
                                <div className="justify-self-center">{participant.paid ? 'x' : ''}</div>
                                <div className="justify-self-center">{participant.signedin ? 'x' : ''}</div>
                                <div></div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            }
        </>
    );
}