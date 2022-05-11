/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/videoprof-application
 */

import { atom } from "recoil";
import { IPopupState } from "@knownout/interface/dist/components/Popup";
import { ILoadingScreenState } from "@knownout/interface/dist/components/LoadingScreen";

export const popupRecoilStateAtom = atom<IPopupState>({
    key: "popup-component-state",
    default: { display: false }
});

export const loadingScreenRecoilStateAtom = atom<ILoadingScreenState>({
    key: "loading-screen-component-state",
    default: { display: true, title: "Загружаем данные" }
});
