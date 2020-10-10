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
    const leftExtra = Math.min(Math.random() * 3, extraJoints + 1);
    if (leftExtra) {
        const leftBamboo = document.createElement('div');
        leftBamboo.className = 'bamboo left';
        screen.appendChild(leftBamboo);

        for (let i = 0; i < leftExtra; i++) {
            leftBamboo.appendChild(getBambooJoint());
        }
    }

    // Do right offshoot
    const rightExtra = Math.min(Math.random() * 3, extraJoints + 1);
    if (rightExtra) {
        const rightBamboo = document.createElement('div');
        rightBamboo.className = 'bamboo right';
        screen.appendChild(rightBamboo);

        for (let i = 0; i < rightExtra; i++) {
            rightBamboo.appendChild(getBambooJoint());
        }
    }
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

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    setScreenSize(80);
    spawnScreenBamboo();
    setTitle(urlParams.get('title') || 'Set with ?title');
    setSocials([
        ['twitter.com/MattIPv4', 'fab fa-twitter'],
        ['github.com/MattIPv4', 'fab fa-github']
    ]);
});
