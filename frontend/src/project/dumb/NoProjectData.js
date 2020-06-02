import React from "react";

import style from './project.module.scss'

export const NoProjectData = () =>
    <div className={style.noDataDiv}>
        <i className="fa fa-info-circle" style={{fontSize: "3em"}}/>
        <p>
            No project selected or no data found !
        </p>
    </div>;
