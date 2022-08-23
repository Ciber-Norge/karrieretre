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

export interface IKarrieretreWebPartProps {
  description: string;
}

export default class KarrieretreWebPart extends BaseClientSideWebPart<IKarrieretreWebPartProps> {

  public render(): void {
    const element = React.createElement(
      Karrieretre,
      {
        description: this.properties.description,
        spHttpClient: this.context.spHttpClient,
        absoluteUrl: this.context.pageContext.web.absoluteUrl
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
