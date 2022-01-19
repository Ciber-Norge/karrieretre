import * as React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  role: {},
});

export const Role = ({ role }) => {
  const classes = useStyles();
  return <div className={classes.role}>{role.title}</div>;
};
