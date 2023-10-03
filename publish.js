const { execSync } = require("child_process");
const fs = require("fs");

function runCommand(command) {
  execSync(command, { stdio: "inherit" });
}

// Read package.json
const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));

// Extract version
const version = packageJson.version;

console.log(`Publishing version: ${version}`);

// Create a git tag
runCommand(`git tag v${version}`);

// Push the git tag to the repository
runCommand(`git push origin v${version}`);

// Publish the extension to VS Code marketplace using vsce
runCommand(
  "vsce publish --baseContentUrl https://github.com/markhughes/vscode-lingo-director/blob/main/"
);
