const { randomInt, promiseLoop, immediateDOM, promiseDelay } = require('./utils');
const { getBambooShoot, setShootRotation, addBambooJoint, resetBambooShoot, getRandomBamboo } = require('./bamboo');

const shoots = [];
const pixelsPerSecond = 20;
let pandaHunger = 0;

const walkToPosition = (newLeft) => new Promise((resolve) => {
    const panda = document.getElementById('panda');

    const pandaLeft = panda.getBoundingClientRect().left;
    const parentLeft = panda.parentElement.getBoundingClientRect().left;
    const oldLeft = pandaLeft - parentLeft;

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

const walkToShoot = (shoot) => {
    const panda = document.getElementById('panda');

    const shootLeft = shoot.getBoundingClientRect().left;
    const pandaWidth = panda.getBoundingClientRect().width;
    const parentLeft = panda.parentElement.getBoundingClientRect().left;

    const newLeft = shootLeft - parentLeft - (pandaWidth / 2);
    return walkToPosition(newLeft);
};

const doPandaEat = () => new Promise((resolve) => {
    const shoot = getRandomBamboo(shoots);
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
    // Walk anywhere in shoot container
    const shoots = document.getElementById('shoots');
    const panda = document.getElementById('panda');
    const shootsLeft = shoots.getBoundingClientRect().left;
    const shootsWidth = shoots.getBoundingClientRect().width;
    const pandaWidth = panda.getBoundingClientRect().width;
    const parentLeft = panda.parentElement.getBoundingClientRect().left;

    const newLeft = randomInt(shootsLeft + pandaWidth, shootsLeft + shootsWidth - pandaWidth) - parentLeft;
    walkToPosition(newLeft).then(() => {
        panda.className = 'sitting';
        resolve();
    });
});

const doPandaAction = () => {
    pandaHunger++;
    const rand = Math.random();

    // Eat (5% + 0.75% per hunger)
    const eat = 0.05 + (pandaHunger * 0.0075);
    console.log('hunger:', pandaHunger, 'eat:', eat);
    if (rand < eat) {
        console.log('eat');
        pandaHunger = 0;
        return doPandaEat();
    }

    // Walk (50%)
    if (rand < eat + 0.5) {
        console.log('walk');
        return doPandaWalk();
    }

    // Nothing
    console.log('sit');
    const panda = document.getElementById('panda');
    panda.className = 'sitting';
    return Promise.resolve();
};

const doBambooGrowth = () => {
    const rand = Math.random();

    // Growth (0 - 0.3: 30%)
    if (rand < 0.3) {
        // TODO: Only consider shoots that aren't being destroyed
        const shoot = getRandomBamboo(shoots, true);
        return addBambooJoint(shoot);
    }

    // Nothing (0.3 - 1: 70%)
    return Promise.resolve();
}

const spawnPandaBamboo = module.exports.spawnPandaBamboo = (shootCount) => {
    // Create the initial shoots
    const shootsDiv = document.getElementById('shoots');
    for (let i = 0; i < shootCount; i++) {
        const shoot = getBambooShoot(1, 3);
        shoots.push(shoot);
        setShootRotation(shoot);
        shootsDiv.appendChild(shoot);
    }

    // Looping actions
    promiseLoop(doBambooGrowth, () => shootCount * 1000);
    promiseLoop(doPandaAction, () => randomInt((shootCount * 3/5) * 1000, (shootCount * 7/5) * 1000));
};
