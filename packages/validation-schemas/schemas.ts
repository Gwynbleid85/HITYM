import { z } from "zod";

/**
 * Order schema
 */
export const orderSchema = z.object({
  customer: z.object({
    fullName: z.string(),
    phoneNumber: z.string(),
    email: z.string().email(),
  }),
  paymentMethod: z.union([
    z.object({
      kind: z.literal("Card"),
      cardNumber: z.string(),
      cardExpirationMonth: z.string(),
      cardExpirationYear: z.string(),
      cardCvv: z.string(),
      cardHolder: z.string(),
    }),
    z.object({
      kind: z.literal("GooglePay"),
    }),
    z.object({
      kind: z.literal("ApplePay"),
    }),
  ]),
  billingAddress: z.object({
    address: z.string(),
    city: z.string(),
    stateOrProvince: z.string(),
    country: z.string(),
    zipCode: z.string(),
  }),
  products: z.array(z.number()),
  giftRecipient: z.string().optional(),
});

export const createOrderRequestSchema = z.object({
  body: orderSchema,
});
