import * as React from "react";
import { SubjectArea } from "./SubjectArea";

export const SubjectAreas = ({ roles }) => {
  console.log(roles);
  const distinctClusters = roles
    .map((role) => role.Kluster)
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <div>
      {distinctClusters.map((cluster) => (
        <SubjectArea
          key={cluster}
          title={cluster}
          roles={roles.filter((role) => role.Kluster === cluster)}
        />
      ))}
    </div>
  );
};
