const rwc = require('random-weighted-choice');
const { randomInt, immediateDOM, promiseDelay } = require('./utils');

const getBambooJoint = module.exports.getBambooJoint = () => {
    const joint = document.createElement('div');
    joint.className = 'joint';

    const hasLeaf = Math.random() < 0.2;
    if (!hasLeaf) return joint;

    const hasSecondLeaf = Math.random() < 0.3;
    const lightLeaf = Math.random() < 0.5;
    const leftLeaf = Math.random() < 0.5;
    const firstLeaf = document.createElement('div');
    firstLeaf.className = `leaf ${leftLeaf ? 'left' : 'right'}30${hasSecondLeaf || lightLeaf ? ' light' : ''}`;
    joint.appendChild(firstLeaf);

    if (hasSecondLeaf) {
        const sameSide = Math.random() < 0.8;
        const secondLeaf = document.createElement('div');
        secondLeaf.className = `leaf ${sameSide && leftLeaf ? 'left' : 'right'}60`;
        joint.appendChild(secondLeaf);
    }

    return joint;
};

const getBambooShoot = module.exports.getBambooShoot = (min, max) => {
    const bamboo = document.createElement('div');
    bamboo.className = 'bamboo';

    const size = randomInt(min, max);
    for (let i = 0; i < size; i++) {
        bamboo.appendChild(getBambooJoint());
    }

    return bamboo;
};

const addBambooJoint = module.exports.addBambooJoint = (shoot) => new Promise((resolve) => {
    const joint = getBambooJoint();
    joint.style.opacity = '0';
    joint.style.filter = 'brightness(5)';
    joint.style.transition = 'filter 1s linear, opacity .25s linear';
    shoot.insertBefore(joint, shoot.firstElementChild);
    immediateDOM(() => {
        joint.style.filter = '';
        joint.style.opacity = '';
    })
        .then(() => promiseDelay(1000))
        .then(() => {
            joint.style.transition = '';
            resolve();
        });
});

const setShootRotation = module.exports.setShootRotation = (shoot) => {
    const hasTilt = Math.random() < 0.5;
    const leftTilt = Math.random() < 0.5;
    shoot.style.transform = hasTilt ? `rotate(${leftTilt ? '-' : ''}${randomInt(0, 4)}deg` : '';
};

const resetBambooShoot = module.exports.resetBambooShoot = (shoot) => new Promise((resolve) => {
    shoot.style.transition = 'filter .25s linear, opacity 1s linear';
    immediateDOM(() => {
        shoot.style.opacity = '0';
        shoot.style.filter = 'brightness(5)';
    })
        .then(() => promiseDelay(1000))
        .then(() => {
            shoot.style.transition = '';
            shoot.style.filter = '';
            shoot.style.opacity = '';
            shoot.innerHTML = '';
            setShootRotation(shoot);
            addBambooJoint(shoot).then(resolve);
        });
});

const getBambooSize = module.exports.getBambooSize = (shoot) => shoot.getElementsByClassName('joint').length;

const getRandomBamboo = module.exports.getRandomBamboo = (shoots, shortest = false) => {
    const weighted = shoots.map((shoot, index) => ({
        weight: getBambooSize(shoot),
        id: index,
    }));
    return shoots[rwc(weighted, shortest ? 100 : 50)];
};
