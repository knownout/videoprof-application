/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/videoprof-application
 */

export type TProject = {
    name: string;

    description: string;

    image: string;

    content: string;

    type: string;
}

export type TContact = {
    type: string;

    content: string;

    link: string;

    image: string;
}

export type TLoadableData = {
    projects: TProject[],

    contacts: TContact[]
}
