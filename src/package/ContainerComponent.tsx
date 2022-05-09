/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/videoprof-application
 */

import { classNames } from "@knownout/lib";
import React, { forwardRef, memo, Ref } from "react";

interface IContainerComponentProps
{
    fixed?: boolean;

    className?: string;

    children: any;
}

export default memo(forwardRef((props: IContainerComponentProps, ref: Ref<HTMLDivElement>) => {
    const className = classNames("container-component", props.className, { fixed: props.fixed });
    return <div className={ className } ref={ ref }>
        <div className="container-component-child">
            { props.children }
        </div>
    </div>;
}));
