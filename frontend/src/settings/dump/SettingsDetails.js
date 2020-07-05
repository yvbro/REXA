import React, { useEffect,useState } from "react"

import {Grid, Card, Button, TextField, makeStyles} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux"

import { fetchSettings, updateSettings } from "../redux/settingsDuck"

const useStyles = makeStyles((theme) => ({
  root: {
      minHeight: '100vh',
  },
  card: {
      width: 400,
      height: 400,
      borderRadius: "16px",
  },
  form: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
  },
  text: {
      margin: theme.spacing(1),
      width: 350,
  },
  button: {
      width: 350,
      margin: theme.spacing(1),
  },
  header: {
    textAlign: "center",
  }
}));

export const SettingsDetails = () => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const { xnatUsername, xnatHost, loading } = useSelector((state) => ({
    xnatUsername: state.settings.xnatUser,
    xnatHost: state.settings.xnatHost,
    loading: state.settings.loading,
  }))
  const [username, setUsername] = useState(-1);
  const [host, setHost] = useState(-1);
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch])

  if (loading) {
    return <div>Loading...</div>
  }

  function handleSubmit(event){
    event.preventDefault();

  if(!password){
    setErrorPassword(true);
  }else{
    updateSettings(username === -1 ? xnatUsername : username, host === -1 ? xnatHost : host, password)
  }
  };

  return (
    <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            className={classes.root}
        >
            <Grid item xs={3}>
                <Card className={classes.card}>
                    <div className={classes.header}>
                        <h1>
                            <span>Settings</span>
                        </h1>
                    </div>
                    <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <TextField id="username-id"
                                   type="username"
                                   name="username"
                                   label="username"
                                   variant="outlined"
                                   defaultValue={xnatUsername}
                                   onChange={e => setUsername(e.target.value)}
                                   className={classes.text}/>
                        <TextField
                            id="host-id"
                            name="host"
                            label="host"
                            type="text"
                            variant="outlined"
                            defaultValue={xnatHost}
                            onChange={e => setHost(e.target.value)}
                            className={classes.text}
                        />                        
                        <TextField
                            id="filled-password-input"
                            name="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            error={errorPassword}
                            onChange={e => setPassword(e.target.value)}
                            className={classes.text}
                            helperText="password is required."
                        />
                        <Button
                            type="submit"
                            variant="outlined"
                            color="primary"
                            disabled={(host === -1 || host === xnatHost) && (username === -1 || username === xnatUsername) && !password}
                            className={classes.button}>
                            Save
                        </Button>
                    </form>
                </Card>
            </Grid>
        </Grid>
  )
}

export default SettingsDetails
