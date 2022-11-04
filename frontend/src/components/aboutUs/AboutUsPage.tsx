import React from 'react';

import { Avatar, Typography, IconButton, Card } from '@material-ui/core';

import EmailIcon from '@material-ui/icons/Email';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Mailto from '../common/mailto/Mailto';
import classes from './AboutUsPage.module.scss';
import beni from '../../assets/benjaminAvatar.png';
import beber from '../../assets/bertrandAvatar.png';

const EMAIL_TO = 'rexa.yvbro@gmail.com';

function AboutUsPage() {
    return (
        <div className={classes.aboutUsRoot}>
            <Card className={classes.aboutUsContainer}>
                <div className={classes.aboutUsHeader}>
                    <div className={classes.aboutUsAvatar}>
                        <Avatar
                            alt="Benjamin avatar"
                            src={beni}
                            className={classes.largeAvatar}
                        />
                        <IconButton
                            aria-label="linkedin button"
                            component="span"
                            onClick={() =>
                                window.open(
                                    'https://www.linkedin.com/in/benjamin-yvernault-5a014a64'
                                )
                            }
                            className={classes.aboutUsLinkedin}
                        >
                            <LinkedInIcon
                                fontSize="small"
                                className={classes.colorIconLinkedin}
                            />
                            <Typography
                                variant="overline"
                                className={classes.colorIconLinkedin}
                            >
                                Benjamin yvernault
                            </Typography>
                        </IconButton>
                    </div>
                    <div className={classes.aboutUsAvatar}>
                        <Avatar
                            alt="Bertrand avatar"
                            src={beber}
                            className={classes.largeAvatar}
                        />
                        <IconButton
                            aria-label="linkedin button"
                            component="span"
                            onClick={() =>
                                window.open(
                                    'https://www.linkedin.com/in/bertrand-yvernault-ba305892'
                                )
                            }
                            className={classes.aboutUsLinkedin}
                        >
                            <LinkedInIcon
                                fontSize="small"
                                className={classes.colorIconLinkedin}
                            />
                            <Typography
                                variant="overline"
                                className={classes.colorIconLinkedin}
                            >
                                {' '}
                                Bertrand yvernault
                            </Typography>
                        </IconButton>
                    </div>
                </div>
                <div className={classes.aboutUsDescription}>
                    <Typography variant="caption">
                        We are two brothers passionate about web development.
                    </Typography>
                    <div className={classes.aboutUsEmail}>
                        <Typography variant="caption">
                            You can contact us at this address if you have any
                            requests or questions:
                        </Typography>
                        <div className={classes.aboutUsEmailIcon}>
                            <EmailIcon
                                fontSize="small"
                                style={{ marginRight: '5px' }}
                            />
                            <Mailto email={EMAIL_TO}>
                                <Typography variant="caption">{EMAIL_TO}</Typography>
                            </Mailto>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default AboutUsPage;
