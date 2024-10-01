const fs = require("fs");
const path = require("path");
const { readMatrixFromFile, writeMatrixToFile } = require("./utils/fileUtils");
const measureTime = require("./utils/timeTracker");
const handleError = require("./errorHandler/errorHandler");
const addMatrices = require("./operations/addMatrices");
const subtractMatrices = require("./operations/subtractMatrices");
const multiplyMatrices = require("./operations/multiplyMatrices");

function main() {
  const operation = process.argv[2];
  const matrixFile1 = process.argv[3];
  const matrixFile3 = process.argv[4];

  if (!operation || !matrixFile1 || !matrixFile3) {
    handleError(
      new Error("Usage: node main.js <operation> <matrixFile1> <matrixFile3>")
    );
    return;
  }

  const matrix1Path = path.resolve(matrixFile1);
  const matrix3Path = path.resolve(matrixFile3);

  if (!fs.existsSync(matrix1Path) || !fs.existsSync(matrix3Path)) {
    handleError(new Error("One or both matrix files do not exist."));
    return;
  }

  try {
    const matrix1 = readMatrixFromFile(matrix1Path);
    const matrix3 = readMatrixFromFile(matrix3Path);

    let result;
    switch (operation) {
      case "add":
        result = measureTime(() => addMatrices(matrix1, matrix3));
        break;
      case "subtract":
        result = measureTime(() => subtractMatrices(matrix1, matrix3));
        break;
      case "multiply":
        result = measureTime(() => multiplyMatrices(matrix1, matrix3));
        break;
      default:
        handleError(
          new Error(
            "Invalid operation. Supported operations are: add, subtract, multiply"
          )
        );
        return;
    }

    const resultsDir = path.resolve(__dirname, "results");
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir);
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const resultFileName = `${path.basename(
      matrixFile1,
      path.extname(matrixFile1)
    )}_${path.basename(
      matrixFile3,
      path.extname(matrixFile3)
    )}_result_${operation}_${timestamp}.txt`;
    const resultFilePath = path.resolve(resultsDir, resultFileName);
    writeMatrixToFile(result, resultFilePath);

    console.log(`Result written to ${resultFilePath}`);
  } catch (error) {
    handleError(error);
  }
}

main();