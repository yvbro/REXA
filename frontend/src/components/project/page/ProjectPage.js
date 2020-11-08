import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {Grid} from '@material-ui/core';

import {ProjectsDropDown} from '../smart/ProjectsDropDown';
import ProjectDetails from '../dumb/ProjectDetails';
import {fetchSettings} from '../../settings/redux/settingsDuck';
import classes from '../../common/common.module.scss';
import withLayout from "../../../helpers/hoc/withLayout";

export const ProjectPage = () => {
    const location = useLocation();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSettings());
    }, [dispatch]);

    return (
        <div className={classes.rootDiv}>
            <Grid container spacing={3}>
                <Grid item md={3} xs={12}>
                    <ProjectsDropDown projectSelected={location.project}/>
                </Grid>
            </Grid>
            <ProjectDetails/>
        </div>
    );
};

export default withLayout(ProjectPage);
