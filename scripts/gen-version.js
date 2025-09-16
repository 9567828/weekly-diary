import fs from "fs";
import path from "path";

const version = process.env.VERCEL_GIT_COMMIT_SHA || Date.now().toString();

const filePath = path.join(__dirname, "../public/version.json");

fs.writeFileSync(filePath, JSON.stringify({ version }, null, 2));
console.log("version.json 생성: ", version);
