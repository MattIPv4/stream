const { getBambooJoint, getBambooShoot } = require('./bamboo');

const setScreenSize = module.exports.setScreenSize = (height) => {
    const screen = document.getElementById('screen');
    screen.style.height = `${height}vh`;
    screen.style.minHeight = `${height}vh`;
    screen.style.width = `${height * (16/9)}vh`;
    screen.style.minWidth = `${height * (16/9)}vh`;
};

const spawnScreenBamboo = module.exports.spawnScreenBamboo = () => {
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

const setTitle = module.exports.setTitle = (str) => {
    const title = document.getElementById('title');
    title.textContent = str;
};

const setSocials = module.exports.setSocials = (data) => {
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

const setSubtitle = module.exports.setSubtitle = (str) => {
    const subtitle = document.getElementById('subtitle');
    subtitle.textContent = str;
};

const setTextHeight = module.exports.setTextHeight = (height) => {
    const text = document.getElementById('text');
    text.style.height = `${height}vh`;
};

const setTextSize = module.exports.setTextSize = (size) => {
    const text = document.getElementById('text');
    text.style.fontSize = `${size}vh`;
};

const setText = module.exports.setText = (strs) => {
    const text = document.getElementById('text');

    // Remove old
    const oldTexts = text.getElementsByTagName('p');
    for (const oldText of oldTexts) {
        text.removeChild(oldText);
    }

    // Add new
    for (const str of strs) {
        const newText = document.createElement('p');
        newText.textContent = str;
        text.appendChild(newText);
    }
};
