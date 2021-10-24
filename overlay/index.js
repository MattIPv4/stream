require('./style.scss');

const queryString = require('query-string');
const { setScreenSize/*, spawnScreenBamboo*/ } = require('./script/screen');
const { setTitle, setTitleSize, setSocials, setSocialsSize, setSocialsOffset, setSubtitle, setSubtitleSize, setTextSize, setTextHeight, setText } = require('./script/text');
// const { spawnPandaBamboo } = require('./script/panda');

const selectType = (type) => {
    const template = document.getElementById(`overlay-${type}`);
    template.parentElement.appendChild(document.importNode(template.content, true));
    template.parentElement.classList.add(`overlay-${type}`);

    const templates = document.getElementsByTagName('template');
    for (const elm of templates) {
        elm.parentElement.removeChild(elm);
    }
};

const setTransparent = (set) => {
    if (set) {
        document.documentElement.classList.add('transparent');
    } else {
        document.documentElement.classList.remove('transparent');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', () => document.body.requestFullscreen());

    const parsed = queryString.parse(window.location.search);
    console.log(parsed);

    // Select the template type
    const type = parsed.type || 'main';
    selectType(type);

    // Transparent overlay
    setTransparent((parsed.transparent || false) === 'true');

    // Title for both
    setTitle(parsed.title || 'Set with ?title');
    setTitleSize(parsed.titleSize || 8);

    // Subtitle for both
    setSubtitle(parsed.subtitle || 'Set with ?subtitle');
    setSubtitleSize(parsed.subtitleSize || 6);

    // Socials for both
    setSocials([
        ['twitter.com/MattIPv4', 'fab fa-twitter'],
        ['github.com/MattIPv4', 'fab fa-github']
    ]);
    setSocialsSize(parsed.socialsSize || 3);

    // Title overlay only
    if (type === 'title') {
        // Socials bottom offset
        setSocialsOffset(parsed.socialsOffset || 18);

        // Cute panda
        // spawnPandaBamboo(10);
    }

    // Main overlay only
    if (type === 'main') {
        // Screen
        setScreenSize(parsed.screenSize || 85);
        // spawnScreenBamboo();

        // Text
        setTextHeight(parsed.textHeight || 'auto');
        setTextSize(parsed.textSize || 3);
        setText(Array.isArray(parsed.text) ? parsed.text : [parsed.text || 'Set with ?text']);

        // Cute panda
        // spawnPandaBamboo(5);
    }
});
