/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/videoprof-application
 */

import { useRecoilValue } from "recoil";
import { pageLocationState } from "@package/internal/recoil-state";
import { useEffect } from "react";

export default function usePageLocation () {
    const pageLocation = useRecoilValue(pageLocationState);

    useEffect(() => {
        document.body.scrollTo({
            behavior: "smooth",
            top: pageLocation + document.body.scrollTop
        });
    }, [ pageLocation ]);
}
