import betAnalysis from "./utils/bet.js"
import scrapeStats from "./utils/scraper.js"; 

const botCalling = async () => {
    const matches = await scrapeStats();

    betAnalysis(matches)
}

export default botCalling;