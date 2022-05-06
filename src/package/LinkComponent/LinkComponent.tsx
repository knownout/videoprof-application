/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/videoprof-application
 */

import React, { forwardRef, memo, Ref } from "react";
import "./LinkComponent.scss";

interface ILinkComponentProps
{
    // Link target
    target?: "_blank" | "_parent" | "_self" | "_top";

    // Link href
    path: string;

    // Link text content
    children: string;
}

/**
 * Component for rendering button-like links
 *
 * @constructor
 * @internal
 */
export default memo(forwardRef((props: ILinkComponentProps, ref: Ref<HTMLAnchorElement>) => {
    const { children, path, ...rest } = props;

    return <button className="link-component">
        <a { ...rest } ref={ ref } href={ path }>{ children }</a>
    </button>;
}));
