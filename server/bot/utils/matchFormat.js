import Team from '../template/team.js'
import Match from '../template/match.js'

const matchFormat = (games) => {

    const matches = [];
    
    for(const game of games) {
        
        const home = new Team();
        const away = new Team();
        

        home.name = game.home;
        away.name = game.away;

        if(game.minutes == 'Half') {
            game.minutes = 45;
        } else if (game.minutes == 'Full') {
            game.minutes = 90;
        }
        
        /* 
            Convert scrapped data to numbers, to later be used in analysis
            In case any of the fields include an hyphen convert the right-side value to 0 (ex.: '3 - ', convert '- ' to 0) 
        */
        let keysToParse = ["attacks", "corners", "shots", "goals"];
        let homeValues = [game.attacks.substr(0,2), game.corners.substr(0,2), game.shots.substr(0,2), game.score.substr(0,2)]
        let awayValues = [game.attacks.substr(game.attacks.length-2,2), game.corners.substr(game.corners.length-2,2), game.shots.substr(game.shots.length-2,2), game.score.substr(game.score.length-2,2)]

        for(let i=0; i < keysToParse.length; i++) {
            let parsed = parseInt(homeValues[i]);
            if(!isNaN(parsed)) {
                home[keysToParse[i]] = parsed;
            } else {
                home[keysToParse[i]] = 0;
            }

            parsed = parseInt(awayValues[i]);
            if(!isNaN(parsed)) {
                away[keysToParse[i]] = parsed;
            } else {
                away[keysToParse[i]] = 0;
            }
        }
        
        const match = new Match(home, away, game.minutes);

        matches.push(match);

        

    }

    return matches;
}

export default matchFormat;