import React from 'react';

import { Avatar, Typography, IconButton, Card } from '@material-ui/core';
import beni from '../../../assets/benjaminAvatar.jpeg';
import beber from '../../../assets/bertrandAvatar.png';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';

import classes from './AboutUsPage.module.scss';

const AboutUsPage = () => {
    
    return (
        <div className={classes.aboutUsRoot}>
            <Card className={classes.aboutUsContainer}>
                <div className={classes.aboutUsHeader}>
                    <div  className={classes.aboutUsAvatar}>
                    <Avatar alt="Benjamin avatar" src={beni} />
                    <div className={classes.aboutUsLinkedin}>
                        <IconButton color="primary" aria-label="linkedin button" component="span" onClick={() => window.open('https://www.linkedin.com/in/benjamin-yvernault-5a014a64')} >
                            <LinkedInIcon fontSize="small" />
                            <Typography variant="overline">Benjamin yvernault</Typography>
                        </IconButton>                    
                        </div>
                    </div>
                    <div  className={classes.aboutUsAvatar}>
                        <Avatar alt="Bertrand avatar" src={beber} />
                        <IconButton color="primary" aria-label="linkedin button" component="span" onClick={() => window.open('https://www.linkedin.com/in/bertrand-yvernault-ba305892')} className={classes.aboutUsLinkedin}>
                            <LinkedInIcon fontSize="small" />
                            <Typography variant="overline"> Bertrand yvernault</Typography>
                        </IconButton>       
                    </div>
                </div>
                <div className={classes.aboutUsDescription}>
                    <Typography variant="caption">We are two brothers passionate about web development.</Typography>
                    <div className={classes.aboutUsEmail}>
                        <Typography variant="caption">You can contact us at this adress :</Typography>
                        <div className={classes.aboutUsEmailIcon}>
                            <EmailIcon fontSize="small" />
                            <Typography variant="caption" style={{ marginLeft : '5px' }}>rexa.devellopers@gmail.com</Typography>
                        </div>
                    </div>
                </div>
           </Card>
        </div>
    );
};

export default AboutUsPage;
