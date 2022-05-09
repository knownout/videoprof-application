/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import { LoadingScreen, Popup } from "@knownout/interface";
import { ILoadingScreenState } from "@knownout/interface/dist/components/LoadingScreen";
import { IPopupState } from "@knownout/interface/dist/components/Popup";

import React, { Fragment } from "react";
import { atom, useRecoilState } from "recoil";

import "./App.scss";
import TitleComponent from "./components/TitleComponent/TitleComponent";

const popupRecoilStateAtom = atom<IPopupState>({
    key: "popup-component-state",
    default: { display: false }
});

const loadingScreenRecoilStateAtom = atom<ILoadingScreenState>({
    key: "loading-screen-component-state",
    default: { display: false }
});

export default function App () {
    const popupRecoilState = useRecoilState(popupRecoilStateAtom);
    const loadingScreenRecoilState = useRecoilState(loadingScreenRecoilStateAtom);

    return <Fragment>
        <Popup popupState={ popupRecoilState[0] } setPopupState={ popupRecoilState[1] } />
        <LoadingScreen state={ loadingScreenRecoilState[0] } />

        <div id="scroll-wrapper">
            <TitleComponent />
        </div>
    </Fragment>;
};
