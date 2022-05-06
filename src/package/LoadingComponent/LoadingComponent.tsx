/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/videoprof-application
 */

import React, { forwardRef, memo, Ref } from "react";
import "./LoadingComponent.scss";
import { classNames } from "@knownout/lib";
import { createPortal } from "react-dom";
import { atom, useRecoilState, useRecoilValue } from "recoil";

interface ILoadingComponentProps
{
    // Element for the portal
    parentElement?: Element;
}

interface ILoadingComponentState
{
    // Loading screen title
    title?: string;

    // Popup component display (shown) state
    display: boolean;
}

/** Set of active loadings */
export const loadingBus = new Set<string>();

/** Loading component state */
export const loadingComponentState = atom<ILoadingComponentState>({
    key: "loading-component-state",
    default: { display: false, title: "Загружаем данные" }
});

/**
 * A custom hook to provide start/stop download functions.
 * @return {{startLoading: (key: string, title?: string) => void, finishLoading: (key: string) => void}}
 */
export function useLoadingState () {
    const [ loadingState, setLoadingState ] = useRecoilState(loadingComponentState);

    /**
     * Start new loading with specific key and immediately change the title.
     *
     * @param {string} key loading key.
     * @param {string} title new loading screen title.
     */
    const startLoading = (key: string, title?: string) => {
        loadingBus.add(key);

        setLoadingState({
            display: loadingBus.size > 0,
            title: title || loadingState.title
        });
    };

    /**
     * Finish loading with a specific key, the title will not change.
     * @param {string} key loading key.
     */
    const finishLoading = (key: string) => {
        loadingBus.delete(key);

        if (loadingBus.size == 0) setLoadingState(Object.assign(
            {}, { display: false },
            loadingState)
        );
    };

    return { startLoading, finishLoading };
}

export default memo(forwardRef((props: ILoadingComponentProps, ref: Ref<HTMLDivElement>) => {
    const state = useRecoilValue(loadingComponentState);

    const loadingClassName = classNames("loading-component", { display: state.display });
    return createPortal(<div className={ loadingClassName } ref={ ref }>
        <div className="loading-content-wrapper">
            <div className="loading-progress" />
            { state.title && <span className="description">{ state.title }</span> }
        </div>
    </div>, props.parentElement || document.body);
}));
