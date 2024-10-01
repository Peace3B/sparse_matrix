const fs = require("fs");
const CustomArray = require("../classes/CustomArray");

function readMatrixFromFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n").filter((line) => line.trim() !== "");

  if (lines.length < 2) {
    throw new Error("Input file has wrong format");
  }

  const numRows = parseInt(lines[0].split("=")[1]);
  const numCols = parseInt(lines[1].split("=")[1]);

  if (isNaN(numRows) || isNaN(numCols)) {
    throw new Error("Input file has wrong format");
  }

  const matrix = new CustomArray(numRows, numCols);
  for (let i = 2; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (!line.startsWith("(") || !line.endsWith(")")) {
      throw new Error("Input file has wrong format");
    }

    const [row, col, value] = line
      .slice(1, -1)
      .split(",")
      .map((str) => str.trim());
    const rowNum = parseInt(row);
    const colNum = parseInt(col);
    const valNum = parseInt(value);

    if (isNaN(rowNum) || isNaN(colNum) || isNaN(valNum)) {
      throw new Error("Input file has wrong format");
    }

    matrix.setElement(rowNum, colNum, valNum);
  }

  return matrix;
}

function writeMatrixToFile(matrix, filePath) {
  const lines = [];
  lines.push(`rows=${matrix.rows}`);
  lines.push(`cols=${matrix.cols}`);

  for (let i = 0; i < matrix.rows; i++) {
    for (let j = 0; j < matrix.cols; j++) {
      const value = matrix.getElement(i, j);
      if (value !== 0) {
        lines.push(`(${i},${j},${value})`);
      }
    }
  }

  fs.writeFileSync(filePath, lines.join("\n"), "utf-8");
}

module.exports = { readMatrixFromFile, writeMatrixToFile };