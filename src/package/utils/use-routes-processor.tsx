/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/videoprof-application
 */

import React, { useLayoutEffect } from "react";
import PopupMessages from "@package/internal/popup-messages";
import { useRecoilState } from "recoil";
import { usePopupState } from "@knownout/interface/dist/components/Popup";
import { popupRecoilState } from "@package/internal/recoil-state";
import { useLocation } from "react-router-dom";

export default function useRoutesProcessor () {
    const location = useLocation();
    const setPopupState = usePopupState(...useRecoilState(popupRecoilState))[1];

    useLayoutEffect(() => {
        const componentsList = {
            "write-message": <PopupMessages.Message />
        } as any;

        const component = componentsList[location.pathname.split("/").filter(Boolean)[0]];
        if (!component) return;

        setPopupState({ content: component, display: true });
    }, [ location ]);
}
