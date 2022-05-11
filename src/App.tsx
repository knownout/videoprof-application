/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import { LoadingScreen, Popup } from "@knownout/interface";
import { useLoadingState } from "@knownout/interface/dist/components/LoadingScreen";

import React, { Fragment, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import waitForImages from "@package/utils/wait-for-images";
import minLoadingTime from "@package/utils/min-loading-time";
import { loadingScreenRecoilStateAtom, popupRecoilStateAtom } from "@package/internal/recoil-state";
import { TLoadableData } from "@package/internal/shared-types";

import { ProjectsComponent, TitleComponent } from "./components";

import "./App.scss";

export default function App () {
    const popupRecoilState = useRecoilState(popupRecoilStateAtom);
    const loadingScreenRecoilState = useRecoilState(loadingScreenRecoilStateAtom);

    const [ content, setContent ] = useState<TLoadableData>();

    const { finishLoading } = useLoadingState(...loadingScreenRecoilState);

    useEffect(() => {
        const processStart = performance.now();

        fetch("/public/content.json").then(res => res.json()).then(async (res: TLoadableData) => {
            setContent(res);

            await waitForImages([
                ...res.projects.map(e => e.image),
                ...res.contacts.map(e => e.image)
            ]);

            await minLoadingTime(processStart);
            finishLoading("any");
        });
    }, []);

    return <Fragment>
        <Popup popupState={ popupRecoilState[0] } setPopupState={ popupRecoilState[1] } />
        <LoadingScreen state={ loadingScreenRecoilState[0] } />

        <div id="scroll-wrapper">
            <TitleComponent />
            { content && <ProjectsComponent projects={ content.projects } /> }
        </div>
    </Fragment>;
};
