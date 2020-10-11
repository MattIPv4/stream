const queryString = require('query-string');
const { setScreenSize, spawnScreenBamboo, setTitle, setSocials, setSubtitle, setTextSize, setTextHeight, setText } = require('./script/screen');
const { spawnPandaBamboo } = require('./script/panda');

document.addEventListener('DOMContentLoaded', () => {
    const parsed = queryString.parse(window.location.search);
    console.log(parsed);

    setScreenSize(parsed.screenSize || 85);
    spawnScreenBamboo();

    setTitle(parsed.title || 'Set with ?title');
    setSocials([
        ['twitter.com/MattIPv4', 'fab fa-twitter'],
        ['github.com/MattIPv4', 'fab fa-github']
    ]);

    setSubtitle(parsed.subtitle || 'Set with ?subtitle');
    setTextHeight(parsed.textHeight || 'auto');
    setTextSize(parsed.textSize || 3);
    setText(Array.isArray(parsed.text) ? parsed.text : [parsed.text || 'Set with ?text']);

    spawnPandaBamboo();
});
