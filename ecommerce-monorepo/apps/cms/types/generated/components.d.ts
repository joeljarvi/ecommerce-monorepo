import type { Schema, Struct } from '@strapi/strapi';

export interface SharedOrderItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_order_items';
  info: {
    displayName: 'Order Item';
  };
  attributes: {
    price: Schema.Attribute.Decimal;
    product_id: Schema.Attribute.BigInteger;
    product_name: Schema.Attribute.String;
    quantity: Schema.Attribute.Integer;
    subtotal: Schema.Attribute.Decimal;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.order-item': SharedOrderItem;
    }
  }
}
