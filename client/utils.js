import Promise from 'bluebird';


/**
 * While loop promisified
 * 
 * @param  {Function} predicate function that returns boolean
 * @param  {Function} action block of action to complete
 * 
 * @return {Promise}
 */
export const promiseWhile = (predicate, action) => {
  let loop = () => {
    if (!predicate()) {
      return;
    }
    return Promise.resolve(action()).then(loop);
  };

  return Promise.resolve(true).then(loop);
};