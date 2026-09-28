import { Club } from "./club";
import { Tourament } from "./tourament";

export interface Match{
    _id: string,
    stadium: string,
    league: Tourament,
    hometeam: Club,
    awayteam: Club,
    result: string,
    highlight: string,
    time: string,
    VNtime: string
}