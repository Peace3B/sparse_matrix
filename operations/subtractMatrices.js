const CustomArray = require("../classes/CustomArray");

function subtractMatrices(matrix1, matrix2) {
  if (matrix1.rows !== matrix2.rows || matrix1.cols !== matrix2.cols) {
    throw new Error("Matrix dimensions do not match for subtraction");
  }

  const resultMat = new CustomArray(matrix1.rows, matrix1.cols);
  for (let i = 0; i < matrix1.rows; i++) {
    for (let j = 0; j < matrix1.cols; j++) {
      const value = matrix1.getElement(i, j) - matrix2.getElement(i, j);
      resultMat.setElement(i, j, value);
    }
  }

  return resultMat;
}

module.exports = subtractMatrices;