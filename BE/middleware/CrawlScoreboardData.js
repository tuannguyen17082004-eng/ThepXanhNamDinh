const axios = require("axios");
const cheerio = require("cheerio");
const ScoreboardModel = require("../models/scoreboard");

module.exports.crawlScoreboardData = async () => {

  const { data } = await axios.get("https://vpf.vn/season/v-league-2026");

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
  const goaldiff = $(el).find("td").eq(7).text().trim();
  const point = $(el).find("td").eq(11).text().trim();

  await ScoreboardModel.updateOne(
   { position },
   {$set: { position, img, team, match, win, draw, loss, goaldiff, point }},
   { upsert: true }
  )

 }
}
