const { randomInt, promiseLoop, immediateDOM, promiseDelay } = require('./utils');
const { getBambooShoot, setShootRotation, addBambooJoint, resetBambooShoot } = require('./bamboo');

const shoots = [
    getBambooShoot(1, 3),
    getBambooShoot(0, 4),
    getBambooShoot(0, 2),
    getBambooShoot(1, 3),
    getBambooShoot(0, 2),
];
const pixelsPerSecond = 20;

const walkToShoot = (shoot) => new Promise((resolve) => {
    const panda = document.getElementById('panda');

    const shootLeft = shoot.getBoundingClientRect().left;
    const pandaLeft = panda.getBoundingClientRect().left;
    const pandaWidth = panda.getBoundingClientRect().width;
    const parentLeft = panda.parentElement.getBoundingClientRect().left;
    const oldLeft = pandaLeft - parentLeft;
    const newLeft = shootLeft - parentLeft - (pandaWidth / 2);
    const distance = Math.abs(oldLeft - newLeft);
    const time = distance / pixelsPerSecond;

    panda.style.transition = `left ${time}s linear`;
    panda.className = `walking ${newLeft < oldLeft ? 'left' : 'right'}`;
    immediateDOM(() => {
        panda.style.left = `${newLeft}px`;
    })
        .then(() => promiseDelay(time * 1000))
        .then(() => {
            panda.style.transition = '';
            panda.className = '';
            resolve();
        });
});

const doPandaEat = () => new Promise((resolve) => {
    // TODO: Used weighted random to prefer tallest shoot to destroy
    const shoot = shoots[randomInt(0, shoots.length - 1)];
    const panda = document.getElementById('panda');
    walkToShoot(shoot).then(() => {
        panda.className = 'eating';
        return resetBambooShoot(shoot);
    }).then(() => {
        panda.className = 'sitting';
        resolve();
    });
});

const doPandaWalk = () => new Promise((resolve) => {
    const shoot = shoots[randomInt(0, shoots.length - 1)];
    const panda = document.getElementById('panda');
    walkToShoot(shoot).then(() => {
        panda.className = 'sitting';
        resolve();
    });
});

const doPandaAction = () => {
    const rand = Math.random();

    // Walk
    if (rand < 0.5) {
        return doPandaWalk();
    }

    // Eat
    if (rand < 0.6) {
        return doPandaEat();
    }

    // Nothing
    const panda = document.getElementById('panda');
    panda.className = 'sitting';
    return Promise.resolve();
};

const doBambooGrowth = () => {
    const rand = Math.random();

    // Growth
    if (rand < 0.3) {
        // TODO: Used weighted random to prefer shortest shoot to grow
        // TODO: Only consider shoots that aren't being destroyed
        const shoot = shoots[randomInt(0, shoots.length - 1)];
        return addBambooJoint(shoot);
    }

    // Nothing
    return Promise.resolve();
}

const spawnPandaBamboo = module.exports.spawnPandaBamboo = () => {
    // Create the initial shoots
    const shootsDiv = document.getElementById('shoots');
    for (const shoot of shoots) {
        setShootRotation(shoot);
        shootsDiv.appendChild(shoot);
    }

    // Looping actions
    promiseLoop(doBambooGrowth, () => 5000);
    promiseLoop(doPandaAction, () => randomInt(3000, 7000));
};
