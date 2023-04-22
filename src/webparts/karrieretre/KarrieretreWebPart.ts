import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import "./colors.module.scss";
import * as strings from 'KarrieretreWebPartStrings';
import {Karrieretre} from "./components/Karrieretre";
import "./index.css"

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
        cssOptions: this.properties.cssOptions.split(",").map(v=>v.trim())
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
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('tableTitle', {
                  label: "Navn på tabell"
                }),
                PropertyPaneTextField('cssOptions', {
                  label: "Css alternativer",
                }),
                PropertyPaneTextField('avdelinger', {
                  label: "Innstillinger",
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
