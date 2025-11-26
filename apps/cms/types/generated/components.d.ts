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

export interface SectionsCtaBanner extends Struct.ComponentSchema {
  collectionName: 'components_sections_cta_banners';
  info: {
    description: 'Call-to-action banner section';
    displayName: 'CTA Banner';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    ctas: Schema.Attribute.Component<'button.ct-as', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 2;
        },
        number
      >;
    style: Schema.Attribute.Enumeration<
      ['simple', 'gradient', 'image-background']
    > &
      Schema.Attribute.DefaultTo<'simple'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsFeaturesGrid extends Struct.ComponentSchema {
  collectionName: 'components_sections_features_grids';
  info: {
    description: 'Grid layout for features or benefits';
    displayName: 'Features Grid';
  };
  attributes: {
    backgroundColor: Schema.Attribute.Enumeration<
      ['white', 'gray', 'primary', 'dark']
    > &
      Schema.Attribute.DefaultTo<'white'>;
    columns: Schema.Attribute.Enumeration<['2', '3', '4']> &
      Schema.Attribute.DefaultTo<'3'>;
    features: Schema.Attribute.Component<'shared.feature-item', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 12;
          min: 1;
        },
        number
      >;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    description: 'Main hero section with title, subtitle, image and CTAs';
    displayName: 'Hero';
  };
  attributes: {
    ctas: Schema.Attribute.Component<'button.ct-as', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 2;
        },
        number
      >;
    image: Schema.Attribute.Media<'images'>;
    layout: Schema.Attribute.Enumeration<
      ['centered', 'left-aligned', 'image-right', 'image-left']
    > &
      Schema.Attribute.DefaultTo<'centered'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsStickyFeatures extends Struct.ComponentSchema {
  collectionName: 'components_sections_sticky_features';
  info: {
    description: 'Features with sticky scrolling effect';
    displayName: 'Sticky Features';
  };
  attributes: {
    features: Schema.Attribute.Component<'shared.feature-item', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 6;
          min: 1;
        },
        number
      >;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_sections_testimonials';
  info: {
    description: 'Customer testimonials section';
    displayName: 'Testimonials';
  };
  attributes: {
    layout: Schema.Attribute.Enumeration<['grid', 'carousel', 'single']> &
      Schema.Attribute.DefaultTo<'grid'>;
    subtitle: Schema.Attribute.Text;
    testimonials: Schema.Attribute.Component<'shared.testimonial-item', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      >;
    title: Schema.Attribute.String;
  };
}

export interface SectionsTwoColumns extends Struct.ComponentSchema {
  collectionName: 'components_sections_two_columns';
  info: {
    description: 'Two column layout with text and media';
    displayName: 'Two Columns';
  };
  attributes: {
    backgroundColor: Schema.Attribute.Enumeration<
      ['white', 'gray', 'primary', 'dark']
    > &
      Schema.Attribute.DefaultTo<'white'>;
    content: Schema.Attribute.RichText;
    cta: Schema.Attribute.Component<'button.ct-as', false>;
    media: Schema.Attribute.Media<'images' | 'videos'>;
    mediaPosition: Schema.Attribute.Enumeration<['left', 'right']> &
      Schema.Attribute.DefaultTo<'right'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_feature_items';
  info: {
    description: 'Individual feature with icon, title and description';
    displayName: 'Feature Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.Component<'button.ct-as', false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'SEO metadata for pages';
    displayName: 'SEO';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'index, follow'>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface SharedTestimonialItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_testimonial_items';
  info: {
    description: 'Individual testimonial with quote and author';
    displayName: 'Testimonial Item';
  };
  attributes: {
    authorCompany: Schema.Attribute.String;
    authorImage: Schema.Attribute.Media<'images'>;
    authorName: Schema.Attribute.String & Schema.Attribute.Required;
    authorTitle: Schema.Attribute.String;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
    rating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'button.ct-as': ButtonCtAs;
      'sections.cta-banner': SectionsCtaBanner;
      'sections.features-grid': SectionsFeaturesGrid;
      'sections.hero': SectionsHero;
      'sections.sticky-features': SectionsStickyFeatures;
      'sections.testimonials': SectionsTestimonials;
      'sections.two-columns': SectionsTwoColumns;
      'shared.feature-item': SharedFeatureItem;
      'shared.seo': SharedSeo;
      'shared.testimonial-item': SharedTestimonialItem;
    }
  }
}
