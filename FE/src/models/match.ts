import { Club } from "./club";

export interface Match{
    _id: string,
    stadium: string,
    league: string,
    leaguelg: {
        link: string,
        id: string
    },
    hometeam: Club,
    awayteam: Club,
    result: string,
    highlight: string,
    time: string,
    VNtime: string
}