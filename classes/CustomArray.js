class CustomArray {
    constructor(numRows, numCols) {
      this.rows = numRows;
      this.cols = numCols;
      this.matrixVal = Array(numRows * numCols).fill(0); // Initialize with zeros
    }
  
    setElement(currRow, currCol, value) {
      if (currRow < 0 || currCol < 0 || currRow >= this.rows || currCol >= this.cols) {
        return -1;
      } else {
        const pos = (currRow * this.cols) + currCol;
        this.matrixVal[pos] = value;
        return 1;
      }
    }
  
    getElement(currRow, currCol) {
      if (currRow < 0 || currCol < 0 || currRow >= this.rows || currCol >= this.cols) {
        return -1;
      } else {
        const pos = (currRow * this.cols) + currCol;
        return this.matrixVal[pos];
      }
    }
  }
  
  module.exports = CustomArray;