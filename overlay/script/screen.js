const { Bamboo } = require('pet-panda');

module.exports.setScreenSize = height => {
    const screen = document.getElementById('screen');
    screen.style.height = `${height}vh`;
    screen.style.minHeight = `${height}vh`;
    screen.style.width = `${height * (16/9)}vh`;
    screen.style.minWidth = `${height * (16/9)}vh`;
};

module.exports.spawnScreenBamboo = async () => {
    // Get the screen and target height
    const screen = document.getElementById('screen');
    const screenHeight = screen.getBoundingClientRect().height

    // Spawn the main shoot
    const bamboo = new Bamboo(80, 0, 0, { rotation: 0 });
    screen.appendChild(bamboo.element);
    while (bamboo.size < screenHeight) await bamboo.growSegment(0);

    // Do left offshoot
    const leftShoot = new Bamboo(80, 0, Math.min(3, bamboo.element.childElementCount + 1), { rotation: 0 });
    leftShoot.element.className += ' left';
    screen.appendChild(leftShoot.element);

    // Do right offshoot
    const rightShoot = new Bamboo(80, 0, Math.min(3, bamboo.element.childElementCount + 1), { rotation: 0 });
    rightShoot.element.className += ' right';
    screen.appendChild(rightShoot.element);
};
