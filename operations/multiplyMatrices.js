const CustomArray = require("../classes/CustomArray");

function multiplyMatrices(matrix1, matrix2) {
  if (matrix1.cols !== matrix2.rows) {
    throw new Error("Matrix dimensions do not match for multiplication");
  }

  const resultMat = new CustomArray(matrix1.rows, matrix2.cols);

  for (let i = 0; i < matrix1.rows; i++) {
    for (let k = 0; k < matrix1.cols; k++) {
      const value = matrix1.getElement(i, k);
      if (value !== 0) {
        for (let j = 0; j < resultMat.cols; j++) {
          const val =
            resultMat.getElement(i, j) + value * matrix2.getElement(k, j);
          resultMat.setElement(i, j, val);
        }
      }
    }
  }

  return resultMat;
}

module.exports = multiplyMatrices;