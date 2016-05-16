Con Spawn
==================
Conditionally spawn a process with a success and fail string to look
for on stdout.

```javascript
const conSpawn = require('con-spawn');
conSpawn('myAwesomeShellScript', [], 'it worked!', 'it failed')
  .then((proc) => {
    proc.kill('SIGTERM');
  }, (err) => {
    throw err;
  });
```
conSpawn(command[,args][,success condition][,fail condition][,options])
  * command <String> the command to run
  * args <Array> array of arguments to command
  * success condition <String> string that signifies success
  * fail condition <String> string that signifies failure
  * options <Object>
    * timeout <Number> time to wait for a failure or success
