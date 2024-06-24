const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

// Define paths
const pdfPath = path.join(__dirname, "resources/sample.pdf"); // Path to your PDF file
const outputHtmlPath = "./output/sample.html"; // Relative path within the project directory

// Ensure the output directory exists
const ensureOutputDirectoryExists = (outputPath) => {
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
};

// Ensure output directory exists
ensureOutputDirectoryExists(outputHtmlPath);

// Construct the Docker command with absolute paths for volume mounting
const command = `docker run --rm -v "${path.resolve(
  pdfPath
)}:/documents" -v "${path.resolve(
  outputHtmlPath
)}:/output" pdf2htmlex/pdf2htmlex:0.18.8.rc2-master-20200820-alpine-3.12.0-x86_64 --zoom 1.3 /documents/${path.basename(
  pdfPath
)} /output/${path.basename(outputHtmlPath)}`;

// Execute the command
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);
  console.log("HTML file has been created successfully!");
});
