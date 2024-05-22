// generated with @7nohe/openapi-react-query-codegen@1.0.6
import {
  useQuery,
  useSuspenseQuery,
  useMutation,
  UseQueryResult,
  UseQueryOptions,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { OrdersService, ProductsService, RecipientsService, OrdersData } from "../requests";
import {
  Customer,
  BillingAddress,
  CardPaymentMethod,
  GooglePayPaymentMethod,
  ApplePayPaymentMethod,
  OrderCreate,
  Order,
  Product,
  Recipient,
} from "../requests/models";
export type ProductsServiceGetProductsDefaultResponse = Awaited<ReturnType<typeof ProductsService.getProducts>>;
export type ProductsServiceGetProductsQueryResult<
  TData = ProductsServiceGetProductsDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useProductsServiceGetProductsKey = "ProductsServiceGetProducts";
export type RecipientsServiceGetRecipientsDefaultResponse = Awaited<ReturnType<typeof RecipientsService.getRecipients>>;
export type RecipientsServiceGetRecipientsQueryResult<
  TData = RecipientsServiceGetRecipientsDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useRecipientsServiceGetRecipientsKey = "RecipientsServiceGetRecipients";
export type OrdersServicePostOrdersMutationResult = Awaited<ReturnType<typeof OrdersService.postOrders>>;
