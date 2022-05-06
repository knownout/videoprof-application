/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import React, { Fragment } from "react";
import "./App.scss";
import { Button, Dropdown, DropdownItem, Input } from "@knownout/interface";
import { CakeIcon, SelectorIcon } from "@heroicons/react/outline";
import { LinkComponent, LoadingComponent, PopupComponent } from "@package";
import { usePopupState } from "@package/state";

export default function App () {
    const setPopupState = usePopupState()[1];

    return <Fragment>
        <PopupComponent />
        <LoadingComponent />

        <LinkComponent path="#"> Hello world</LinkComponent>
        <Button onClick={ () => {
            setPopupState({
                children: <div>Hello world</div>,
                display: true
            });
        } }>Hello world</Button>

        <Dropdown defaultTitle="Select something" icon={ <SelectorIcon /> }>
            <DropdownItem>Option first</DropdownItem>
            <DropdownItem>Second option</DropdownItem>
        </Dropdown>

        <Input placeholder="Hello world" icon={ <CakeIcon /> } />
    </Fragment>;
};
