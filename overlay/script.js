const queryString = require('query-string');
const { setScreenSize, spawnScreenBamboo, setTitle, setTitleSize, setSocials, setSocialsSize, setSubtitle, setSubtitleSize, setTextSize, setTextHeight, setText } = require('./script/screen');
const { spawnPandaBamboo } = require('./script/panda');

document.addEventListener('DOMContentLoaded', () => {
    const parsed = queryString.parse(window.location.search);
    console.log(parsed);

    setScreenSize(parsed.screenSize || 85);
    spawnScreenBamboo();

    setTitle(parsed.title || 'Set with ?title');
    setTitleSize(parsed.subtitleSize || 8);

    setSocials([
        ['twitter.com/MattIPv4', 'fab fa-twitter'],
        ['github.com/MattIPv4', 'fab fa-github']
    ]);
    setSocialsSize(parsed.socialsSize || 3);

    setSubtitle(parsed.subtitle || 'Set with ?subtitle');
    setSubtitleSize(parsed.subtitleSize || 6);

    setTextHeight(parsed.textHeight || 'auto');
    setTextSize(parsed.textSize || 3);
    setText(Array.isArray(parsed.text) ? parsed.text : [parsed.text || 'Set with ?text']);

    spawnPandaBamboo();
});
