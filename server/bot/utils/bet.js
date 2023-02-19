const betAnalysis = (matches) => {

    const START_MINUTES_FIRST = 38;
    const END_MINUTES_FIRST = 44;

    const START_MINUTES_SECOND = 83;
    const END_MINUTES_SECOND = 89;

    const MIN_ATTACKS_FIRST = START_MINUTES_FIRST - 5;
    const MIN_ATTACKS_SECOND = START_MINUTES_SECOND - 10;

    const betGames = [];

    const scoreList = [0, 1, -1]
   

    for(const match of matches) {

        let matchFirstHalf = (match.minutes > START_MINUTES_FIRST && match.minutes < END_MINUTES_FIRST);
        let matchSecondHalf = (match.minutes > START_MINUTES_SECOND && match.minutes < END_MINUTES_SECOND);

        if(!(matchFirstHalf || matchSecondHalf)) {
            continue;
        }


        let scoreDifference = match.home.goals - match.away.goals;

        if(!scoreList.includes(scoreDifference)) {
            continue;
        }

        const cornerShotHome = match.home.attacks + match.home.shots + match.home.corners;
        const cornerShotAway = match.away.attacks + match.away.shots + match.away.corners;

        betGames.push(match)

    }

    console.log(betGames.length)

}

export default betAnalysis