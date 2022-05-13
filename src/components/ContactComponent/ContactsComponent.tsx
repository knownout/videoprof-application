/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/videoprof-application
 */

import React, { memo } from "react";

import ContainerComponent from "@package/ContainerComponent";
import { TContact } from "@package/internal/shared-types";
import { Button } from "@knownout/interface";

import ContactComponent from "./ContactComponent";
import "./ContactsComponent.scss";
import { useNavigate } from "react-router-dom";

export default memo((props: { contacts: TContact[] }) => {
    const navigate = useNavigate();

    return <ContainerComponent className="contacts-component flex flex-cjc">
        <span className="click-hint light-gradient">
            Нажмите на контакт, чтобы открыть его на Вашем устройстве
        </span>

        <div className="contacts-list flex flex-col">
            { props.contacts.map(contact => <ContactComponent contact={ contact } key={ contact.content + "-c" } />) }
        </div>

        <span className="click-hint light-gradient">
            Оставьте нам сообщение и мы перезвоним Вам для уточнения деталей в ближайшее время
        </span>

        <Button onClick={ () => navigate("/write-message") }>Напишите нам</Button>
    </ContainerComponent>;
});
