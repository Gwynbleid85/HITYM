export const $Customer = {
  description: "A customer type.",
  required: ["fullName", "phoneNumber", "email"],
  type: "object",
  properties: {
    fullName: {
      description: "Full name",
      type: "string",
    },
    phoneNumber: {
      description: "Phone number",
      type: "string",
    },
    email: {
      description: "E-mail address",
      type: "string",
    },
  },
} as const;

export const $BillingAddress = {
  description: "A billing address type.",
  required: ["address", "city", "stateOrProvince", "country", "zipCode"],
  type: "object",
  properties: {
    address: {
      description: "Address (street and house no.)",
      type: "string",
    },
    city: {
      description: "City",
      type: "string",
    },
    stateOrProvince: {
      description: "State or province",
      type: "string",
    },
    country: {
      description: "Country",
      type: "string",
    },
    zipCode: {
      description: "Zip code",
      type: "string",
    },
  },
} as const;

export const $CardPaymentMethod = {
  description: "A card payment method type.",
  required: ["kind", "cardNumber", "cardExpirationMonth", "cardExpirationYear", "cardCvv", "cardHolder"],
  type: "object",
  properties: {
    kind: {
      description: "Kind of payment.",
      type: "string",
      enum: ["Card"],
    },
    cardNumber: {
      description: "Card number",
      type: "string",
    },
    cardExpirationMonth: {
      description: "Card Expiration month",
      type: "string",
    },
    cardExpirationYear: {
      description: "Card Expiration year",
      type: "string",
    },
    cardCvv: {
      description: "Card Cvv",
      type: "string",
    },
    cardHolder: {
      description: "Card holder",
      type: "string",
    },
  },
} as const;

export const $GooglePayPaymentMethod = {
  description: "A google pay payment method type.",
  required: ["kind"],
  type: "object",
  properties: {
    kind: {
      description: "Kind of payment.",
      type: "string",
      enum: ["GooglePay"],
    },
  },
} as const;

export const $ApplePayPaymentMethod = {
  description: "An apple pay payment method type.",
  required: ["kind"],
  type: "object",
  properties: {
    kind: {
      description: "Kind of payment.",
      type: "string",
      enum: ["ApplePay"],
    },
  },
} as const;

export const $OrderCreate = {
  description: "An order create type.",
  required: ["customer", "paymentMethod", "billingAddress", "products"],
  type: "object",
  properties: {
    customer: {
      description: "Customer",
      $ref: "#/components/schemas/Customer",
    },
    paymentMethod: {
      description: "Payment method",
      oneOf: [
        {
          $ref: "#/components/schemas/CardPaymentMethod",
        },
        {
          $ref: "#/components/schemas/GooglePayPaymentMethod",
        },
        {
          $ref: "#/components/schemas/ApplePayPaymentMethod",
        },
      ],
    },
    billingAddress: {
      description: "Billing address",
      $ref: "#/components/schemas/BillingAddress",
    },
    products: {
      description: "Products to be ordered (at least one)",
      type: "array",
      items: {
        type: "number",
      },
    },
    giftRecipient: {
      description: "E-mail address of the customer to gift to (optional)",
      type: "string",
    },
  },
} as const;

export const $Order = {
  description: "An order type.",
  required: ["id", "customer", "billingAddress", "products"],
  type: "object",
  properties: {
    id: {
      description: "ID of the order",
      type: "number",
    },
    customer: {
      description: "Customer",
      $ref: "#/components/schemas/Customer",
    },
    billingAddress: {
      description: "Billing address",
      $ref: "#/components/schemas/BillingAddress",
    },
    products: {
      description: "Products to be ordered",
      type: "array",
      items: {
        type: "number",
      },
    },
    giftRecipient: {
      description: "E-mail address of the customer to gift to",
      type: "string",
    },
  },
} as const;

export const $Product = {
  description: "A product type.",
  required: ["id", "title", "price"],
  type: "object",
  properties: {
    id: {
      description: "ID",
      type: "number",
    },
    title: {
      description: "Title",
      type: "string",
    },
    price: {
      description: "Price in dollars",
      type: "number",
    },
    discountedPrice: {
      description: "Discounted price in dollars (in case of discount)",
      type: "number",
    },
  },
} as const;

export const $Recipient = {
  description: "A recipient type.",
  required: ["id", "email", "nickname"],
  type: "object",
  properties: {
    id: {
      description: "ID",
      type: "number",
    },
    email: {
      description: "E-mail address of the recipient",
      type: "string",
    },
    nickname: {
      description: "Nickname of the recipient",
      type: "string",
    },
  },
} as const;
