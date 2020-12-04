const { spawn, spawnSync } = require("child_process");
const { readdirSync } = require("fs");
const { cp } = require("shelljs");

const year = process.argv[2];
const day = process.argv[3];
const days = readdirSync(`./src/${year}`).filter(
  (folder) => !["template", "utils"].includes(folder)
);

if (!days.includes(day) && day) {
  console.log(`Creating file structure for ${day}...`);
  cp("-r", "src/template", `src/${year}/${day}`);
}

if (!day) {
  days.forEach((day) => {
    console.log(day);
    console.log("------------------------------");
    spawnSync("ts-node", [`src/${year}/${day}/index.ts`], {
      stdio: "inherit",
      env: process.env,
      shell: true,
    });
    console.log("");
  });
} else {
  console.log(`Watching ----- src/${year}/${day}/index.ts ------`);
  spawn("nodemon", ["-x", "ts-node", `src/${year}/${day}/index.ts`], {
    stdio: "inherit",
    shell: true,
  });
}
