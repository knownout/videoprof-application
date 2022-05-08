/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import { CakeIcon, SelectorIcon } from "@heroicons/react/outline";

import { Button, Dropdown, DropdownItem, Input, LoadingScreen, Popup } from "@knownout/interface";
import { ILoadingScreenState } from "@knownout/interface/dist/components/LoadingScreen";
import { IPopupState } from "@knownout/interface/dist/components/Popup";

import React, { Fragment } from "react";
import { atom, useRecoilState } from "recoil";

import "./App.scss";

const popupRecoilStateAtom = atom<IPopupState>({
    key: "popup-component-state",
    default: { display: false }
});

const loadingScreenRecoilStateAtom = atom<ILoadingScreenState>({
    key: "loading-screen-component-state",
    default: { display: false }
})

export default function App () {
    const popupRecoilState = useRecoilState(popupRecoilStateAtom);
    const loadingScreenRecoilState = useRecoilState(loadingScreenRecoilStateAtom);

    return <Fragment>
        <Popup popupState={ popupRecoilState[0] } setPopupState={ popupRecoilState[1] } />
        <LoadingScreen state={ loadingScreenRecoilState[0] } />

        <Button href="#">Hello world</Button>
        <Button>Hello world</Button>

        <Dropdown defaultTitle="Select something" icon={ <SelectorIcon /> }>
            <DropdownItem>Option first</DropdownItem>
            <DropdownItem>Second option</DropdownItem>
        </Dropdown>

        <Input placeholder="Hello world" icon={ <CakeIcon /> } />
    </Fragment>;
};
