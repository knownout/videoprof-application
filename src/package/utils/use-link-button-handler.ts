/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/videoprof-application
 */

import { MouseEvent, RefObject, useCallback } from "react";
import { useRecoilState } from "recoil";
import { pageLocationState } from "@package/internal/recoil-state";
import { useNavigate } from "react-router-dom";
import { cleanString } from "@knownout/lib";

type THandlerRefsList = { [key: string]: RefObject<HTMLDivElement> };
type THandlerArgument = THandlerRefsList | (() => void);

export default function useLinkButtonHandler (arg?: THandlerArgument) {
    const setPageLocation = useRecoilState(pageLocationState)[1];
    const navigate = useNavigate();

    return useCallback((target: HTMLElement, event: MouseEvent) => {
        event.preventDefault();
        const href = (target as HTMLAnchorElement).getAttribute("href")!;

        if (typeof arg === "object") {
            const ref = (arg as THandlerRefsList)[cleanString(href, /\//g)];
            if (!ref || !ref.current) return;

            setPageLocation(ref.current.getBoundingClientRect().top);
        } else {
            arg && arg();
            navigate(href);
        }
    }, [ arg, setPageLocation ]);
}
