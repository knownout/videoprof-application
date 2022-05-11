/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/videoprof-application
 */

export default function waitForImages (imagesList: string[]) {
    const promisesList = imagesList.map(image => new Promise(resolve => {
        const element = document.createElement("img");
        element.src = image;

        element.onload = element.onerror = element.onabort = resolve;
    }));

    return Promise.all(promisesList);
}
