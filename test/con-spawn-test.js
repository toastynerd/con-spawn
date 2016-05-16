const cspawn = require('../');
const cp = require('child_process');
const assert = require('assert');

describe('con spawn', function() {
  it('should spawn and read a success string', function(done) {
    cspawn(__dirname + '/test_one', [], 'the spawn worked!')
      .then((proc) => {
        assert(proc instanceof cp.ChildProcess, 'was not a child process');
        done();
      });
  });

  it('should spawn and read a fail', function(done) {
    cspawn(__dirname + '/test_two', [], 'the spawn worked', 'here is the fail')
      .then((process) => {
        throw new Error('it worked!');
      }, (err) => {
        assert(err instanceof Error, 'was not an error');
        assert(err.message === 'Process failed on string: here is the fail');
        done();
      });
  });
});
