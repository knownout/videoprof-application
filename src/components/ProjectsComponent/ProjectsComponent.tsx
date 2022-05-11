/*
* Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
* Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
* https://github.com/re-knownout/videoprof-application
*/

import React, { memo } from "react";

import ContainerComponent from "@package/ContainerComponent";
import { TProject } from "@package/internal/shared-types";

import { ProjectComponent } from "../index";
import "./ProjectsComponent.scss";

interface IProjectsComponentProps
{
    projects: TProject[];
}

export default memo((props: IProjectsComponentProps) => {
    return <ContainerComponent className="projects-component">
        { props.projects.map(project => <ProjectComponent { ...project } />) }
    </ContainerComponent>;
});
