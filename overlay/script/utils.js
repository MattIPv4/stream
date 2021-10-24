module.exports.randomInt = (min, max) => Math.floor(Math.random() * (max + 1 - min)) + min;

const promiseDelay = delay => new Promise((resolve) => setTimeout(resolve, delay));
module.exports.promiseDelay = promiseDelay;

module.exports.promiseLoop = (promise, getDelay) => {
    const run = () => {
        promise().then(() => promiseDelay(getDelay())).then(run);
    };
    run();
};

module.exports.immediateDOM = callback => new Promise((resolve) => {
    window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
            callback();
            resolve();
        });
    });
});
