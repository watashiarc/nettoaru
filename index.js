const spawnSync = require('child_process').spawnSync;
const exec = require('child_process').exec;

let ping = () => {
    return new Promise((resolve, reject) => {
        let ping = spawnSync('ping', ['toka.io']);
        let nettoGaAru = ping.stdout.toString().indexOf('could not find') < 0;       
        console.log(ping.stdout.toString());
        resolve(nettoGaAru);
    });
};

let playMusic = () => {
    exec('"C:\\Program Files\\iTunes\\iTunes.exe" "X:\\music\\Utaite\\GigaP - No title-\\01 - -Opening-.mp3"', (err, stdout, stderr) => {
        //if (err)
           //console.log(err);
        //else
            //console.log(stdout);
    });
}

let waitTimeInMs = 1000;
let timedFunction = (promise) => {
    console.log(`Waiting ${waitTimeInMs}ms...`);
    let promiseLoop = () => {
        promise().then((breakCondition) => {
            if (breakCondition) {
                console.log('DONE!');
                playMusic();
            }
            else
                timedFunction(promise); 
        });
    };
    setTimeout(promiseLoop, waitTimeInMs);
};

timedFunction(ping);
