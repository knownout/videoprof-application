/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/videoprof-application
 */

import { MouseEvent, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function useLinkButtonHandler () {
    const navigate = useNavigate();

    return useCallback((target: HTMLElement, event: MouseEvent) => {
        event.preventDefault();
        const href = (target as HTMLAnchorElement).getAttribute("href")!;

        navigate(href);
    }, []);
}
