import React from 'react';
import unorm from 'unorm';

function formatLink(string: string) {
    const formattedString = unorm
        .nfc(string)
        .replace(/[\u0300-\u036f]/g, '')
        .replace(' ', '-')
        .toLowerCase();
    console.log(formattedString);
    return formattedString;
}

export default formatLink;
