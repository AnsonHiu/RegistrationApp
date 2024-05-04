import Team from "@/app/model/team.model";
import { useEffect } from "react";

export default function CreateTeam(props: { id: number, team: Team, updateTeam: (team: Team) => void }) {
    useEffect(() => {
        if(props.team.id === undefined){
            let teamToUpdate = new Team(props.team);
            teamToUpdate.id = props.id;
            props.updateTeam(teamToUpdate);
        }
    }, []);

    function updateTeamName(event: React.ChangeEvent<HTMLInputElement>) {
        let teamToUpdate = new Team(props.team);
        teamToUpdate.name = event.target.value;
        props.updateTeam(teamToUpdate);
    }

    function updateSignedIn(event: React.ChangeEvent<HTMLInputElement>) {
        let teamToUpdate = new Team(props.team);
        teamToUpdate.signedIn = event.target.checked;
        props.updateTeam(teamToUpdate);        
    }

    function updatePaid(event: React.ChangeEvent<HTMLInputElement>) {
        let teamToUpdate = new Team(props.team);
        teamToUpdate.paid = event.target.checked;
        props.updateTeam(teamToUpdate);        
    }

    return (
        <form className="mt-5">
                <input type='text' placeholder="Team Name" onChange={updateTeamName}/>
                <div className="flex mt-2">
                    <label className="flex mr-5"><span className="mr-2">Signed In</span><input className="self-center" type="checkbox" onChange={updateSignedIn} /></label>
                    <label className="flex"><span className="mr-2">Paid</span><input className="self-center" type="checkbox" onChange={updatePaid} /></label>
                </div>
            </form>
        );
}