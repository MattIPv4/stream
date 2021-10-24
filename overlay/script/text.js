module.exports.setTitle = str => {
    const title = document.getElementById('title');
    title.textContent = str;
};

module.exports.setTitleSize = size => {
    const title = document.getElementById('title');
    title.style.fontSize = `${size}vh`;
};

module.exports.setSocials = data => {
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

module.exports.setSocialsSize = size => {
    const socials = document.getElementById('socials');
    socials.style.fontSize = `${size}vh`;
};

module.exports.setSocialsOffset = size => {
    const socials = document.getElementById('socials');
    socials.style.marginBottom = `${size}vh`;
};

module.exports.setSubtitle = str => {
    const subtitle = document.getElementById('subtitle');

    // If no subtitle, hide
    if (!str || !str.trim().length) {
        subtitle.style.display = 'none';
        return;
    }

    // Set and show subtitle
    subtitle.textContent = str;
    subtitle.style.display = undefined;
};

module.exports.setSubtitleSize = size => {
    const subtitle = document.getElementById('subtitle');
    subtitle.style.fontSize = `${size}vh`;
};

module.exports.setTextHeight = height => {
    const text = document.getElementById('text');
    text.style.height = `${height}vh`;
};

module.exports.setTextSize = size => {
    const text = document.getElementById('text');
    text.style.fontSize = `${size}vh`;
};

module.exports.setText = strings => {
    const text = document.getElementById('text');

    // Remove old
    const oldTexts = text.getElementsByTagName('p');
    for (const oldText of oldTexts) {
        text.removeChild(oldText);
    }

    // Add new
    for (const str of strings) {
        const newText = document.createElement('p');
        newText.textContent = str;
        text.appendChild(newText);
    }
};
