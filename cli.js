const { Octokit } = require("octokit");
module.exports.octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});
async function run() {
  const { data: readme } = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: "ofemmy",
      repo: "pdfkit",
      path: "README.md",
    }
  );
  const str = Buffer.from(readme.content, "base64").toString();
  const newMessage = str + ". I edited this file from the API.";
  const res = await octokit.request(
    "PUT /repos/{owner}/{repo}/contents/{path}",
    {
      owner: "ofemmy",
      repo: "pdfkit",
      path: "README.md",
      message: "Updated the README.md with new content from API",
      content: Buffer.from(newMessage, "utf-8").toString("base64"),
      sha: readme.sha,
    }
  );
  console.log(res.data);
}
//run();
