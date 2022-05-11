/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/videoprof-application
 */

import { limitNumber } from "@knownout/lib";

export default function minLoadingTime (processStart: number, minLoadingTime: number = 1000): Promise<void> {
    const loadingTime = limitNumber(
        minLoadingTime - (performance.now() - processStart),
        null, 0
    );

    return new Promise(resolve => setTimeout(resolve, loadingTime));
}
