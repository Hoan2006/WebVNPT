import fs from "fs";
import newsData from "./data/newsData.js";

fs.writeFileSync(
  "news.json",
  JSON.stringify(newsData, null, 2),
  "utf8"
);

console.log("Done");