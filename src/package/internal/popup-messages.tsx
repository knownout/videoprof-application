/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/videoprof-application
 */

import React, { memo, useCallback, useMemo, useState } from "react";
import { usePopupState } from "@knownout/interface/dist/components/Popup";
import { useRecoilState } from "recoil";
import { loadingScreenRecoilState, popupRecoilState } from "@package/internal/recoil-state";
import useLinkButtonHandler from "@package/utils/use-link-button-handler";
import { Button, Dropdown, DropdownItem, Input } from "@knownout/interface";
import { useLoadingState } from "@knownout/interface/dist/components/LoadingScreen";
import { SelectorIcon } from "@heroicons/react/outline";
import { StorageController } from "@knownout/lib";
import useRecaptcha from "@package/utils/use-recaptcha";
import { minLoadingTime } from "@package/utils";

const storageController = new StorageController(localStorage);
const messageStatusList = [
    [
        "Сообщение отправлено",
        "Мы перезвоним Вам в ближайшее время в период с 10 часов утра до 7 часов вечера текущего или следующего дня"
    ], [
        "Сообщение не отправлено",
        "Произошла ошибка при отправке сообщения, повторите попытку позже или воспользуйтесь одним и наших" +
        " контактов для связи"
    ], [
        "Сообщение уже отправлено",
        "Сегодня Вы уже отправляли сообщение, пожалуйста, воздержитесь от отправки дублирующих сообщений"
    ]
];

const MessageSentComponent = memo((props: { status: number }) => {
    const setPopupState = usePopupState(...useRecoilState(popupRecoilState))[1];
    const hdlClick = useLinkButtonHandler(() => setPopupState({ display: false }));

    return <div className="message-sent flex flex-col">
        <div className="text-content flex flex-col">
            <span className="light-gradient">
                { messageStatusList[props.status][0] }
            </span>

            <span className="sub light-gradient">{ messageStatusList[props.status][1] }</span>
        </div>
        <div className="buttons flex flex-row flex-w">
            <Button href="/" onClick={ hdlClick }>Понятно</Button>
        </div>
    </div>;
});

const MessageComponent = memo(() => {
    const setPopupState = usePopupState(...useRecoilState(popupRecoilState))[1];
    const { startLoading, finishLoading } = useLoadingState(...useRecoilState(loadingScreenRecoilState));

    const hdlClick = useLinkButtonHandler(() => setPopupState({ display: false }));
    const lastMessageSentDate = useMemo(() => storageController.getItem<number>("lastMessageSent"),
        [ storageController ]);

    const [ projectType, setProjectType ] = useState<string>();
    const [ userName, setUserName ] = useState<string>();
    const [ phoneNumber, setPhoneNumber ] = useState<string>();

    const sendButtonClick = useCallback(() => {
        const processStart = performance.now();
        startLoading("message", "Отправляем сообщение");

        useRecaptcha().then(async token => {
            console.log(token);

            storageController.setItem("lastMessageSent", Date.now());
            await minLoadingTime(processStart);

            setPopupState({ content: <MessageSentComponent status={ 0 } /> });
            finishLoading("message");
        });
    }, [ projectType, userName, phoneNumber ]);

    if (lastMessageSentDate && lastMessageSentDate - Date.now() < 432 * 10 ** 5)
        return <MessageSentComponent status={ 2 } />;

    const buttonDisabled = !userName || !phoneNumber || !projectType;

    return <div className="write-message flex flex-col">
        <div className="text-content flex flex-col">
            <span className="light-gradient">Напишите нам</span>
            <span className="sub light-gradient">
                Оставьте нам сообщение и мы перезвоним Вам для уточнения деталей в ближайшее время
            </span>
            <span className="sub light-gradient">
                Данная форма защищена при помощи Google reCAPTCHA
            </span>
        </div>

        <div className="content-input flex flex-col">
            <Input placeholder="Ваше имя" filter={ [ [ /[^A-zА-яЁё .\-]/g, "" ] ] } onInput={ setUserName } />
            <Input placeholder="Номер телефона" filter={ [ [ /[^0-9]/g, "" ] ] } onInput={ setPhoneNumber } />
            <Dropdown defaultTitle="Что Вас интересует?" icon={ <SelectorIcon /> }
                      onSelectionChange={ selected => setProjectType(selected || undefined) }>
                <DropdownItem>Свадьбы и торжественные мероприятия</DropdownItem>
                <DropdownItem>Мероприятия в государственных и учебных учреждениях</DropdownItem>
                <DropdownItem>Семейные мероприятия</DropdownItem>
                <DropdownItem>Съемка клипа или короткометражного фильма</DropdownItem>
                <DropdownItem>Создание полнометражного фильма</DropdownItem>
                <DropdownItem>Ничего из этого</DropdownItem>
            </Dropdown>
        </div>

        <div className="buttons flex flex-row flex-w">
            <Button onClick={ sendButtonClick } disabled={ buttonDisabled }>Отправить</Button>
            <Button href="/" onClick={ hdlClick }>Отмена</Button>
        </div>
    </div>;
});

const PopupMessages = {
    Message: MessageComponent,
    MessageSent: MessageSentComponent
};

export default PopupMessages;
