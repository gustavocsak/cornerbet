import * as cheerio from 'cheerio';
import axios from 'axios';
import matchFormat from './matchFormat.js';

const scrapeStats = async () => {

    const url = "https://www.totalcorner.com/match/today";

    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data)
        const gameRows = $(".tbody_match").find('tr')
        const games = [];   
        
        gameRows.each((index, element) => {

            const game = {
                minutes: "",
                home: "",
                away: "",
                score: "",
                attacks: "",
                shots: "",
                corners: ""
            }

            //Checks if game is currently active
            let status = $(element).children(".match_status").children("span").text();
            if(status){ 
                game.minutes = $(element).children(".match_status").children("span").text();
                game.home = $(element).children(".match_home").children("a").children("span").text();
                game.away = $(element).children(".match_away").children("a").children("span").text();
                game.score = $(element).children(".match_goal").text();
                game.corners = $(element).children(".match_corner").children("div").children(".span_match_corner").text();
                game.attacks = $(element).children(".match_attach").children(".match_dangerous_attacks_div").text();
                game.shots = $(element).children(".match_shoot").children(".match_shoot_div").text(); 
            } else if(isNaN(parseInt(status)) || parseInt(status) == 0) {
                return false; //breaks out of 'each' function
            }
            
            games.push(game);

        })

        const matches = matchFormat(games);
        return matches;
        
        
    } catch (error) {
        console.log(error);
    }

}   

export default scrapeStats;
