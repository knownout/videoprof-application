/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/videoprof-application
 */

import React, { memo } from "react";
import { TContact } from "@package/internal/shared-types";
import { classNames } from "@knownout/lib";

export default memo((props: { contact: TContact }) => {
    const className = classNames("contact-component flex", { "no-image": !props.contact.image });
    return <a className={ className } href={ props.contact.link }>
        { props.contact.image &&
            <div className="cover-image" style={ { backgroundImage: `url("${ props.contact.image }")` } } /> }

        <div className="text-content flex flex-col">
            <span className="sub">{ props.contact.type }</span>
            <span>{ props.contact.content }</span>
        </div>
    </a>;
});
