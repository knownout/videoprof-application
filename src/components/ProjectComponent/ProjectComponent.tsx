/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/videoprof-application
 */

import React, { memo } from "react";

import { TProject } from "@package/internal/shared-types";
import { useNavigate } from "react-router-dom";
import { classNames } from "@knownout/lib";

export default memo((props: TProject) => {
    const navigate = useNavigate();

    const className = classNames("project-component");
    const route = "/watch/" + props.type + "/" + props.content;

    return <button className={ className } onClick={ () => navigate(route) }>
        <div className="cover-image" style={ { backgroundImage: `url("${ props.image }")` } }>
            <div>Смотреть</div>
        </div>
        <div className="text-content flex flex-col flex-nw">
            <span className="light-gradient">{ props.name }</span>
            <span className="sub light-gradient">{ props.description }</span>
        </div>
    </button>;
});
