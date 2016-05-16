'use strict';
const cp = require('child_process');

module.exports = exports = function(process, args, success, fail, opts) {
  opts = opts || {};
  opts.timeout = opts.timeout || 3000;
  return new Promise((resolve, reject) => {
    let foundString = false;
    let timeout = setTimeout(() => {
      reject(new Error('timeout of ' + opts.timeout + ' exceeded'));
    }, opts.timeout);
    let proc = cp.spawn(process, args);
    proc.stdout.on('data', (data) => {
      if (data.toString().indexOf(success) != -1) {
        clearTimeout(timeout);
        foundString = true;
        resolve(proc);
      }
      if (data.toString().indexOf(fail) != -1) {
        clearTimeout(timeout);
        proc.kill('SIGTERM');
        foundString = true;
        reject(new Error('Process failed on string: ' + fail));
      }
    });

    proc.on('error', (error) => {
      clearTimeout(timeout);
      reject(new Error('Process failed with error: ' + error));
    });

    proc.on('exit', (code) => {
      clearTimeout(timeout);
      if (!foundString) reject(new Error('Process failed with error: ' + code));
    });

    proc.on('close', (code) => {
      clearTimeout(timeout);
      if (!foundString) reject(new Error('Process failed with code: ' + code));
    });

    proc.on('disconnect', (msg) => {
      clearTimeout(timeout);
      if (!foundString) reject(new Error('Process failed with error: ' + msg));
    });
  });
};
