import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import "./colors.module.scss";
import {Karrieretre} from "./components/Karrieretre";
import "./index.css"
import {PageContext, SPPermission} from "@microsoft/sp-page-context";

export interface IKarrieretreWebPartProps {
  avdelinger: string;
  tableTitle: string
  cssOptions: string
}

export default class KarrieretreWebPart extends BaseClientSideWebPart<IKarrieretreWebPartProps> {
  public render(): void {
    const element = React.createElement(
      Karrieretre,
      {
        avdelingerString: this.properties.avdelinger,
        tableTitle: this.properties.tableTitle,
        spHttpClient: this.context.spHttpClient,
        absoluteUrl: this.context.pageContext.web.absoluteUrl,
        cssOptions: this.properties.cssOptions.split(",").map(v=>v.trim()),
        hasEditPermission: checkEditorPermission(this.context.pageContext)
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Sharepoint app som viser informasjon om roller"
          },
          groups: [
            {
              groupFields: [
                PropertyPaneTextField('tableTitle', {
                  label: "Navn på tabell",
                  description: "Tabellen som løsningen henter roller fra.",
                }),
                PropertyPaneTextField('cssOptions', {
                  label: "Css alternativer",
                }),
                PropertyPaneTextField('avdelinger', {
                  label: "Lim inn innstillinger",
                  description: "Etter du er ferdig med redigering kan du trykke 'Avslutt redigering og kopier'.",
                  multiline: true
                }),

              ]
            }
          ]
        }
      ]
    };
  }
}

function checkEditorPermission(pageContext: PageContext){
  //Editor group can add item on list/library via addListItems permission
  const permission = new SPPermission(pageContext.web.permissions.value);
  const isMemberPermission = permission.hasPermission(SPPermission.addListItems);
  return isMemberPermission;
}
