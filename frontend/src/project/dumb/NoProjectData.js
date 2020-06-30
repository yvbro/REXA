import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import { Card, CardContent, Typography } from "@material-ui/core"
import InfoIcon from "@material-ui/icons/Info"

import variables from "../../constants/variables.scss"

const useStyles = makeStyles((theme) => ({
  section1: {
    margin: theme.spacing(3, 2),
  },
  card: {
    borderRadius: "16px"
  },
  alignItemsAndJustifyContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column",
  },
  iconDef: {
    fontSize: 80,
    color: "gray",
  }
}))

export const NoProjectData = () => {
  const classes = useStyles()

  return (
    <div className={classes.section1}>
      <Card variant="outlined" className={classes.card}>
        <CardContent className={classes.alignItemsAndJustifyContent}>
          <InfoIcon className={classes.iconDef} />
          <Typography variant="h5" component="h2">
            No project selected or no data found !
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}
