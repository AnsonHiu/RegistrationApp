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
    const [teams, setTeams] = useState<Team[]>([]);
    const editTeam = (teamId: number|undefined) => {
        if(teamId) {
            props.markTeamForEdit(teamId, true);
        }
    }

    const update = (updatedTeam: Team) => {
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
    }, props.teams);

    return (
        <>
            { props.teams.length > 0 && <h2 className="mt-5">Teams</h2> }
            { props.eventCategory.participantsperteam && props.eventCategory.participantsperteam > 1 && props.teams.length > 0 &&
                <table className="mt-5">
                    <thead>
                        <tr>
                            <td>Team</td>
                            <td>Participant</td>
                            <td>Paid</td>
                            <td>Signed In</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        { teams.map((team) => (
                            (team.isUpdate && team.id)
                            ? <tr>
                                <td colSpan={4}>
                                    <CreateTeam id={team.id} team={team} updateTeam={update} />
                                    <button onClick={() => saveTeam(team.id)} className="button primary">Save</button>
                                </td>
                            </tr>
                            : <>
                            <tr key={team.id}>
                                <td>{team.name}</td>
                                <td></td>
                                <td>{team.participants.every(participant => participant.paid) ? 'x' : ''}</td>
                                <td>{team.participants.every(participant => participant.signedin) ? 'x' : ''}</td>
                                <td><button className="primary button" onClick={() => editTeam(team.id)}>Edit</button></td>
                                <td><button className="primary button" onClick={() => deleteTeam(team.id)}>Delete</button></td>
                            </tr>
                            {team.participants.map((participant) => (
                                <tr key={[team.id, participant.id].join('-')}>
                                    <td></td>
                                    <td>{participant.dancername}</td>
                                    <td>{participant.paid ? 'x' : ''}</td>
                                    <td>{participant.signedin ? 'x' : ''}</td>
                                    <td></td>
                                </tr>
                            ))}
                            </>
                        ))}
                    </tbody>
                </table>
            }
        </>
    );
}