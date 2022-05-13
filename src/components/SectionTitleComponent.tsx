/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/videoprof-application
 */

import React, { forwardRef, memo, Ref } from "react";

export default memo(forwardRef((props: { children: string; }, ref: Ref<HTMLDivElement>) => {
    return <div className="section-title flex flex-row flex-cjc w100" ref={ ref }>
        <h3 className="light-gradient upc">{ props.children }</h3>
    </div>;
}));
