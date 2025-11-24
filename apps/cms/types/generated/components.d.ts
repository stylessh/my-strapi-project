import type { Schema, Struct } from '@strapi/strapi';

export interface ButtonCtAs extends Struct.ComponentSchema {
  collectionName: 'components_button_ct_as';
  info: {
    displayName: 'CTAs';
  };
  attributes: {
    href: Schema.Attribute.String;
    text: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['primary', 'secondary']>;
  };
}

export interface PagesMarketingPage extends Struct.ComponentSchema {
  collectionName: 'components_pages_marketing_pages';
  info: {
    displayName: 'Marketing Page';
  };
  attributes: {
    DefaultHero: Schema.Attribute.Component<'sections.hero', false>;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    CtaGroup: Schema.Attribute.Component<'button.ct-as', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 2;
        },
        number
      >;
    Subtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'button.ct-as': ButtonCtAs;
      'pages.marketing-page': PagesMarketingPage;
      'sections.hero': SectionsHero;
    }
  }
}
