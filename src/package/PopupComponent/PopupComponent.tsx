/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/videoprof-application
 */

import React, { forwardRef, memo, Ref, useCallback } from "react";
import "./PopupComponent.scss";
import { createPortal } from "react-dom";
import { atom, useRecoilState } from "recoil";
import { classNames } from "@knownout/lib";

interface IPopupComponentProps
{
    // Element for the portal
    parentElement?: Element;
}

interface IPopupComponentState
{
    // Popup component display (shown) state
    display: boolean;

    // Popup component content
    children?: JSX.Element;
}

/** Popup component state */
export const popupComponentState = atom<IPopupComponentState>({
    key: "popup-component-state",
    default: { display: false }
});

/**
 * A custom hook to facilitate popup state changes
 *
 * @return {[IPopupComponentState, (state: Partial<IPopupComponentState>) => void]}
 */
export function usePopupState () {
    const [ popupState, setPopupState ] = useRecoilState(popupComponentState);

    const setState = (state: Partial<IPopupComponentState>) => setPopupState(popupState => {
        return Object.assign({}, popupState, state);
    });

    return [ popupState, setState ] as [ typeof popupState, typeof setState ];
}

/**
 * React component for rendering popup element through portal
 *
 * @constructor
 * @internal
 */
export default memo(forwardRef((props: IPopupComponentProps, ref: Ref<HTMLDivElement>) => {
    // TODO maybe I should put useMemo here?
    const [ state, setState ] = usePopupState();

    const popupClassName = classNames("popup-component", { display: state.display });

    // Component underlay click event handler
    const clickEventHandler = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;
        if (!target.classList.contains("popup-component")) return;

        setState({ display: false });
    }, [ setState ]);

    return createPortal(<div className={ popupClassName } onClick={ clickEventHandler } ref={ ref }>
        <div className="popup-content-wrapper">
            { state.children }
        </div>
    </div>, props.parentElement || document.body);
}));
