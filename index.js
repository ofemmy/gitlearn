const { octokit } = require("./cli");
async function app() {
  const { data } = await octokit.rest.issues.
  console.log(data);
}

app();
