Con Spawn
==================
Conditionally spawn a process with a success and fail string to look
for on stdout.

```javascript
const conSpawn = require('con-spawn');
conSpawn('myAwesomeShellScript', 'it worked!', 'it failed')
  .then((proc) => {
    proc.kill('SIGTERM');
  }, (err) => {
    throw err;
  });
```
