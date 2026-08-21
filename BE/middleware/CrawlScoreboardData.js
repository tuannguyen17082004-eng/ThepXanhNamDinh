const axios = require("axios");
const cheerio = require("cheerio");
const ScoreboardModel = require("../models/scoreboard");
const SeasonModel = require('../models/season');

module.exports.crawlScoreboardData = async (season) => {
  const scoreboard = [];

  const { data } = await axios.get(`https://vpf.vn/season/v-league-${season}`);

  const $ = cheerio.load(data);

  const rows = $("#jstable_1 tbody tr").toArray();

  for (const el of rows) {
    const position = $(el).find("td").eq(0).text().trim();
    const img = $(el).find("img").attr("src");
    const team = $(el).find("td").eq(1).text().trim();
    const match = $(el).find("td").eq(2).text().trim();
    const win = $(el).find("td").eq(3).text().trim();
    const draw = $(el).find("td").eq(4).text().trim();
    const loss = $(el).find("td").eq(5).text().trim();
    const goaldiff = $(el).find("td").eq(6).text().trim();
    const point = $(el).find("td").eq(9).text().trim();

    scoreboard.push({position, img, team, match, win, draw, loss, goaldiff, point});
  }

  const seasonCheck = await SeasonModel.findOne({ season: season });

  if (seasonCheck) {
    const scoreboardCheck = await ScoreboardModel.findOneAndUpdate(
      { season: seasonCheck._id },
      { season: seasonCheck._id, scoreboard },
      { upsert: true }
    );

    await SeasonModel.findByIdAndUpdate(seasonCheck._id, { scoreboard: scoreboardCheck._id });
  }
}
