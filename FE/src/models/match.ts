export interface Match{
    _id: string,
    stadium: string,
    league: string,
    leaguelg: {
        link: string,
        id: string
    },
    hometeam: string,
    hometeamlg: {
        link: string,
        id: string
    },
    awayteam: string,
    awayteamlg: {
        link: string,
        id: string
    },
    result: string,
    highlight: string,
    time: string
}