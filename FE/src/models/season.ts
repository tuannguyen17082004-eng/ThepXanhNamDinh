import { Match } from "./match";
import { Scoreboard } from "./scoreboard";

export interface Season {
    season : number,
    matchList : [Match],
    scoreboard : Scoreboard
}