const setScreenSize = (height) => {
    const screen = document.getElementById('screen');
    screen.style.height = `${height}vh`;
    screen.style.width = `${height * (16/9)}vh`;
};

const getBambooJoint = () => {
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

const randomInt = (min, max) => Math.floor(Math.random() * (max + 1 - min)) + min;

const getBambooShoot = (min, max) => {
    const bamboo = document.createElement('div');
    bamboo.className = 'bamboo';

    const size = randomInt(min, max);
    for (let i = 0; i < size; i++) {
        bamboo.appendChild(getBambooJoint());
    }

    return bamboo;
};

const spawnScreenBamboo = () => {
    // Spawn an initial single joint
    const screen = document.getElementById('screen');
    const bamboo = document.createElement('div');
    bamboo.className = 'bamboo';
    const joint = getBambooJoint();
    bamboo.appendChild(joint);
    screen.appendChild(bamboo);

    // Get some sizes
    const screenHeight = screen.getBoundingClientRect().height
    const jointHeight = joint.getBoundingClientRect().height;

    // Add required joints
    const extraJoints = Math.floor(screenHeight/jointHeight);
    for (let i = 0; i < extraJoints; i++) {
        bamboo.appendChild(getBambooJoint());
    }

    // Do left offshoot
    const leftShoot = getBambooShoot(0, Math.min(3, extraJoints + 1));
    leftShoot.className += ' left';
    screen.appendChild(leftShoot);

    // Do right offshoot
    const rightShoot = getBambooShoot(0, Math.min(3, extraJoints + 1));
    rightShoot.className += ' right';
    screen.appendChild(rightShoot);
};

const setTitle = (str) => {
    const title = document.getElementById('title');
    title.textContent = str;
};

const setSocials = (data) => {
    const socials = document.getElementById('socials');
    socials.innerHTML = '';

    for (const socialData of data) {
        const social = document.createElement('div');
        const icon = document.createElement('i');
        icon.className = socialData[1];
        const text = document.createElement('span');
        text.textContent = socialData[0];
        social.appendChild(icon);
        social.appendChild(text);
        socials.appendChild(social);
    }
};

const addBambooJoint = (shoot) => {
    const joint = getBambooJoint();
    joint.style.opacity = '0';
    joint.style.filter = 'brightness(5)';
    joint.style.transition = 'filter 1s linear, opacity .25s linear';
    shoot.insertBefore(joint, shoot.firstElementChild);
    setTimeout(() => {
        joint.style.filter = '';
        joint.style.opacity = '';
        setTimeout(() => {
            joint.style.transition = '';
        }, 1000);
    }, 100);
};

const setShootRotation = (shoot) => {
    const hasTilt = Math.random() < 0.5;
    const leftTilt = Math.random() < 0.5;
    shoot.style.transform = hasTilt ? `rotate(${leftTilt ? '-' : ''}${randomInt(0, 4)}deg` : '';
};

const resetBambooShoot = (shoot) => {
    shoot.style.transition = 'filter .25s linear, opacity 1s linear';
    setTimeout(() => {
        shoot.style.opacity = '0';
        shoot.style.filter = 'brightness(5)';
        setTimeout(() => {
            shoot.style.transition = '';
            shoot.style.filter = '';
            shoot.style.opacity = '';
            shoot.innerHTML = '';
            setShootRotation(shoot);
        }, 1000);
    }, 100);
};

const spawnPandaBamboo = () => {
    // Create the initial shoots
    const shootsDiv = document.getElementById('shoots');
    const shoots = [
        getBambooShoot(1, 2),
        getBambooShoot(0, 2),
        getBambooShoot(0, 1),
        getBambooShoot(1, 2),
        getBambooShoot(0, 1),
    ];
    for (const shoot of shoots) {
        setShootRotation(shoot);
        shootsDiv.appendChild(shoot);
    }

    // Random growth/destruction
    setInterval(() => {
        const shoot = shoots[randomInt(0, shoots.length - 1)];

        // TODO: Used weighted random to prefer shortest shoot to grow
        const doGrowth = Math.random() < 0.3;
        if (doGrowth) {
            addBambooJoint(shoot);
            return;
        }

        // TODO: Used weighted random to prefer tallest shoot to destroy
        const doDestroy = Math.random() < 0.1;
        if (doDestroy) {
            resetBambooShoot(shoot);
            return;
        }
    }, 5 * 1000);
};

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    setScreenSize(80);
    spawnScreenBamboo();
    setTitle(urlParams.get('title') || 'Set with ?title');
    setSocials([
        ['twitter.com/MattIPv4', 'fab fa-twitter'],
        ['github.com/MattIPv4', 'fab fa-github']
    ]);
    spawnPandaBamboo();
});
