const randomInt = module.exports.randomInt = (min, max) => Math.floor(Math.random() * (max + 1 - min)) + min;

const promiseDelay = module.exports.promiseDelay = delay => new Promise((resolve) => setTimeout(resolve, delay));

const promiseLoop = module.exports.promiseLoop = (promise, getDelay) => {
    const run = () => {
        promise().then(() => promiseDelay(getDelay())).then(run);
    };
    run();
};

const immediateDOM = module.exports.immediateDOM = (callback) => new Promise((resolve) => {
    window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
            callback();
            resolve();
        });
    });
});
