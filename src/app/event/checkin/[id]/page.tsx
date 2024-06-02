'use client'

import { EventCategory } from "@/app/model/event-category.model";
import { Team } from "@/app/model/team.model";
import { getEvent } from "@/app/sql/query/get-event";
import { getEventCategory } from "@/app/sql/query/get-event-category";
import { getTeams } from "@/app/sql/query/get-teams";
import { useEffect, useState } from "react";

export default function CheckIn({params}: {params: {id: number}}){
    const [teams, setTeams] = useState<Team[]>([]);
    const [eventName, setEventName] = useState<string>('');
    const [category, setCategory] = useState<EventCategory>();

    const totalOfParticipants = teams.reduce((prev, current) => prev += current.participants.length, 0);
    const totalOfCheckedInParticipants = teams.reduce((prev, current) => prev += current.participants.filter(participant => participant.signedin).length, 0);
    const totalOfCheckedInTeams = teams.reduce((prev, current) => 
        current.participants.every(participant => participant.signedin) 
            ? prev = prev+1
            : prev
    , 0)

    useEffect(() => {
        let cancel = false;
        async function fetchTeams() {
            if(cancel) { return; }
            const eventCategoryId = params.id;
            const eventCategoryTask = getEventCategory(eventCategoryId);
            const teamsTask =  getTeams(eventCategoryId);
            const [eventCategory, teams] = await Promise.all([eventCategoryTask, teamsTask]);
            setCategory(eventCategory);
            setTeams(teams);
            if(eventCategory.eventid){
                const event = await getEvent(eventCategory.eventid);
                setEventName(event.name);
            }
        }
        fetchTeams().catch(console.error);        
        return () => { cancel = true };
    }, []);

    useEffect(() => {
        console.log(teams);
    }, [teams])

    return (
        <div className="flex justify-around grow">
            <div className="bg-black text-white grow">
                <div className="vertical-half-container">
                    <div>
                        <h1>{eventName}</h1>
                        <h2 className="mt-2">{category?.name}</h2>
                        <h3 className="mt-7">Check-in Status</h3>
                        <p className="mt-2">No. of signed-in participants: {totalOfCheckedInParticipants}/{totalOfParticipants}</p>
                        <p className="mt-2">No. of signed-in teams: {totalOfCheckedInTeams}/{teams.length}</p>
                    </div>
                </div>
            </div>
            <div className="grow pt-5 bg-blue-400">
                <div className="grid grid-cols-2 gap-3 pl-5 pr-5">
                    {teams.map((team) =>(
                        <div key={team.id} className="mt-5 sign-in-card flex justify-around items-center">
                            <span className="mr-5">{team.name}</span>
                            <span>{team.participants.filter(participant => participant.signedin).length}/{team.participants.length}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}