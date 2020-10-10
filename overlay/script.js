const { setScreenSize, spawnScreenBamboo, setTitle, setSocials } = require('./script/screen');
const { spawnPandaBamboo } = require('./script/panda');

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
