/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import { LoadingScreen, Popup } from "@knownout/interface";
import { useLoadingState } from "@knownout/interface/dist/components/LoadingScreen";

import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { TLoadableData } from "@package/internal/shared-types";
import { loadingScreenRecoilState, popupRecoilState } from "@package/internal/recoil-state";
import { minLoadingTime, usePageLocation, useRoutesProcessor, waitForImages } from "@package/utils";

import { ContactsComponent, ProjectsComponent, SectionTitleComponent, TitleComponent } from "./components";

import "./App.scss";


export default function App () {
    const recoilPopupState = useRecoilState(popupRecoilState);
    const recoilLoadingState = useRecoilState(loadingScreenRecoilState);

    const navigate = useNavigate();

    const [ content, setContent ] = useState<TLoadableData>();

    const { finishLoading } = useLoadingState(...recoilLoadingState);

    const refsList = {
        contacts: useRef<HTMLDivElement>(null),

        projects: useRef<HTMLDivElement>(null)
    };

    useRoutesProcessor();
    usePageLocation();

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


    const popupClickHandler = useCallback((_: any, root: boolean) => root && navigate("/"), []);

    return <Fragment>
        <div className="bg-gradient" />

        <Popup popupState={ recoilPopupState[0] } setPopupState={ recoilPopupState[1] } onClick={ popupClickHandler } />
        <LoadingScreen state={ recoilLoadingState[0] } />

        <TitleComponent refsList={ refsList } />

        <SectionTitleComponent ref={ refsList.projects }>Наши работы</SectionTitleComponent>

        { content && <ProjectsComponent projects={ content.projects } /> }

        <SectionTitleComponent ref={ refsList.contacts }>Контакты</SectionTitleComponent>

        { content && <ContactsComponent contacts={ content.contacts } /> }
    </Fragment>;
};
