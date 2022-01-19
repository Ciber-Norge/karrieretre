import * as React from "react";
import { createUseStyles } from "react-jss";
import { Role } from "./Role";
import { IRolle } from "../../rest/IRolle";

type RuleNames = "subjectAreaContainer" | "subjectAreaHeader";

interface Props {
  title?: string;
  color?: string;
  roles?: IRolle[];
}

const useStyles = createUseStyles<RuleNames, Props>({
  subjectAreaContainer: {
    backgroundColor: "#4389c2",
    padding: "30px",
    borderRadius: "50%",
    color: "#000000",
    position: "absolute",
    top: ({ title }) => getPositionByTitle(title).top,
    left: ({ title }) => getPositionByTitle(title).left,
  },
  subjectAreaHeader: {},
});

const getPositionByTitle = (title) => {
  switch (title) {
    case "Rådgivning": {
      return { top: 0, left: 0 };
    }
    case "Ledelse": {
      return { top: 100, left: 0 };
    }
    case "Utvikling": {
      return { top: 200, left: 0 };
    }
    case "Salg": {
      return { top: 300, left: 0 };
    }
    case "Digital Workspace": {
      return { top: 400, left: 0 };
    }
  }
};

export const SubjectArea = ({ title, color = "green", roles }: Props) => {
  const classes = useStyles({ title });
  return (
    <div className={classes.subjectAreaContainer}>
      <h2 className={classes.subjectAreaHeader}>{title}</h2>
      {roles.map((role, i) => (
        <Role key={role.Id} role={role} />
      ))}
    </div>
  );
};
