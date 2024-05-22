/**
 * A customer type.
 */
export type Customer = {
  /**
   * Full name
   */
  fullName: string;
  /**
   * Phone number
   */
  phoneNumber: string;
  /**
   * E-mail address
   */
  email: string;
};

/**
 * A billing address type.
 */
export type BillingAddress = {
  /**
   * Address (street and house no.)
   */
  address: string;
  /**
   * City
   */
  city: string;
  /**
   * State or province
   */
  stateOrProvince: string;
  /**
   * Country
   */
  country: string;
  /**
   * Zip code
   */
  zipCode: string;
};

/**
 * A card payment method type.
 */
export type CardPaymentMethod = {
  /**
   * Kind of payment.
   */
  kind: "Card";
  /**
   * Card number
   */
  cardNumber: string;
  /**
   * Card Expiration month
   */
  cardExpirationMonth: string;
  /**
   * Card Expiration year
   */
  cardExpirationYear: string;
  /**
   * Card Cvv
   */
  cardCvv: string;
  /**
   * Card holder
   */
  cardHolder: string;
};

/**
 * A google pay payment method type.
 */
export type GooglePayPaymentMethod = {
  /**
   * Kind of payment.
   */
  kind: "GooglePay";
};

/**
 * An apple pay payment method type.
 */
export type ApplePayPaymentMethod = {
  /**
   * Kind of payment.
   */
  kind: "ApplePay";
};

/**
 * An order create type.
 */
export type OrderCreate = {
  /**
   * Customer
   */
  customer: Customer;
  /**
   * Payment method
   */
  paymentMethod: CardPaymentMethod | GooglePayPaymentMethod | ApplePayPaymentMethod;
  /**
   * Billing address
   */
  billingAddress: BillingAddress;
  /**
   * Products to be ordered (at least one)
   */
  products: Array<number>;
  /**
   * E-mail address of the customer to gift to (optional)
   */
  giftRecipient?: string;
};

/**
 * An order type.
 */
export type Order = {
  /**
   * ID of the order
   */
  id: number;
  /**
   * Customer
   */
  customer: Customer;
  /**
   * Billing address
   */
  billingAddress: BillingAddress;
  /**
   * Products to be ordered
   */
  products: Array<number>;
  /**
   * E-mail address of the customer to gift to
   */
  giftRecipient?: string;
};

/**
 * A product type.
 */
export type Product = {
  /**
   * ID
   */
  id: number;
  /**
   * Title
   */
  title: string;
  /**
   * Price in dollars
   */
  price: number;
  /**
   * Discounted price in dollars (in case of discount)
   */
  discountedPrice?: number;
};

/**
 * A recipient type.
 */
export type Recipient = {
  /**
   * ID
   */
  id: number;
  /**
   * E-mail address of the recipient
   */
  email: string;
  /**
   * Nickname of the recipient
   */
  nickname: string;
};
