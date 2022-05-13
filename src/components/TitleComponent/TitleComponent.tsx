/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/videoprof-application
 */

import { Button } from "@knownout/interface";
import ContainerComponent from "@package/ContainerComponent";
import useLinkButtonHandler from "@package/utils/use-link-button-handler";

import React, { memo, RefObject } from "react";
import "./TitleComponent.scss";
import { useNavigate } from "react-router-dom";

interface ITitleComponentProps
{
    refsList: { [key: string]: RefObject<HTMLDivElement> };
}

export default memo((props: ITitleComponentProps) => {
    const navigate = useNavigate();
    const hdlClick = useLinkButtonHandler(props.refsList);

    return <ContainerComponent fixed className="title-component">
        <img src="/public/bg-w-logo.svg" alt="" className="bg-image" />
        <a className="fuori-group flex flex-row flex-cai" href="https://fuori.org" target="_blank">
            <img src="/public/fuori-group.svg" alt="Fuori Group Logotype" />
            <div className="text-content">
                <span className="light-gradient sub">Проект</span>
                <span className="light-gradient">Fuori Group</span>
            </div>
        </a>
        <div className="title-content flex flex-col flex-nw">
            <h1 className="upc">VideoProf</h1>
            <h2>
                Профессиональная фото/видео съемка<br />
                в Приднестровье и Молдове
            </h2>
        </div>
        <div className="buttons flex flex-row flex-w">
            <Button onClick={ () => navigate("/write-message") }>Напишите нам</Button>
            <Button href="/projects" onClick={ hdlClick }>Наши работы</Button>
            <Button href="/contacts" onClick={ hdlClick }>Контакты</Button>
        </div>
    </ContainerComponent>;
});
