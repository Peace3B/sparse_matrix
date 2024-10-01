function measureTime(func, ...args) {
    const start = getCurrentTime();
    const result = func(...args);
    const end = getCurrentTime();
    console.log(`Execution time: ${end - start} ms`);
    return result;
  }
  
  function getCurrentTime() {
    const hrTime = process.hrtime();
    return hrTime[0] * 1000 + hrTime[1] / 1000000;
  }
  
  module.exports = measureTime;