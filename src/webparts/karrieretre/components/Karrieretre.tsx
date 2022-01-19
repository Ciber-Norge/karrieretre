import * as React from "react";
import { SPHttpClient } from "@microsoft/sp-http";
import { ThreeIcon } from "./Icons/ThreeIcon";
import { useRolleTabell } from "../rest/useRolleTabell";
import { RollerList } from "./roller-list/RollerList";
import { SubjectAreas } from "./SubjectArea/SubjectAreas";

type KarrieretreProps = {
  description: string;
  spHttpClient: SPHttpClient;
  absoluteUrl: string;
};

export const Karrieretre = ({
  description,
  spHttpClient,
  absoluteUrl,
}: KarrieretreProps) => {
  const { roller, state } = useRolleTabell({ spHttpClient, absoluteUrl });

  if (state === "loading") {
    return <span>Henter roller...</span>;
  }
  if (state === "error") {
    return <span>Det oppstod en feil ved henting av roller!</span>;
  }

  return (
    <>
      <ThreeIcon />
      <SubjectAreas roles={roller} />
      {description}
      <RollerList roller={roller} />
    </>
  );
};
