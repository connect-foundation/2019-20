// esSearch convert promise
export default async function (query, options) {
  return new Promise((resolve, reject) => {
    this.esSearch(query, options, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
