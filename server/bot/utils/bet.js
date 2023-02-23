const betAnalysis = (matches) => {

    const START_MINUTES_FIRST = 37;
    const END_MINUTES_FIRST = 44;

    const START_MINUTES_SECOND = 70;
    const END_MINUTES_SECOND = 89;

    const MIN_ATTACKS_FIRST = START_MINUTES_FIRST - 5;
    const MIN_ATTACKS_SECOND = START_MINUTES_SECOND - 10;

    const CORNER_SHOT_FIRSTHALF = 7
    const CORNER_SHOT_SECONDHALF = 14

    const betGames = [];  

    for(const match of matches) {

        let matchFirstHalf = (match.minutes > START_MINUTES_FIRST && match.minutes < END_MINUTES_FIRST);
        let matchSecondHalf = (match.minutes > START_MINUTES_SECOND && match.minutes < END_MINUTES_SECOND);

        if(!(matchFirstHalf || matchSecondHalf)) {
            continue;
        }

        /*
            Looking for games currently in:
            > Draw - where home team holds enough attacking action in the game
            > Away team is winning by one goal - where home team holds enough attacking action in the game
            Any other score will be discarded 

            Previous versions included away team losing by one goal (not implemented for now)
        */
        let scoreDifference = match.home.goals - match.away.goals;     
        if(![0, -1].includes(scoreDifference)) {
            continue;
        }
        console.log(match)
        const cornerShotHome = match.home.attacks + match.home.shots + match.home.corners;
                
        if(matchFirstHalf && (match.home.attacks >= MIN_ATTACKS_FIRST && cornerShotHome >= CORNER_SHOT_FIRSTHALF)) {
            betGames.push(match)
        }

        if(matchSecondHalf && (match.home.attacks >= MIN_ATTACKS_SECOND && cornerShotHome >= CORNER_SHOT_SECONDHALF)) {
            betGames.push(match)
        }

    }

    console.log(betGames.length)

}

export default betAnalysis