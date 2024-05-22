// generated with @7nohe/openapi-react-query-codegen@1.0.6
import * as Common from "./common";
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
export const useProductsServiceGetProducts = <
  TData = Common.ProductsServiceGetProductsDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">
) =>
  useQuery<TData, TError>({
    queryKey: [Common.useProductsServiceGetProductsKey, ...(queryKey ?? [])],
    queryFn: () => ProductsService.getProducts() as TData,
    ...options,
  });
export const useRecipientsServiceGetRecipients = <
  TData = Common.RecipientsServiceGetRecipientsDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">
) =>
  useQuery<TData, TError>({
    queryKey: [Common.useRecipientsServiceGetRecipientsKey, ...(queryKey ?? [])],
    queryFn: () => RecipientsService.getRecipients() as TData,
    ...options,
  });
export const useOrdersServicePostOrders = <
  TData = Common.OrdersServicePostOrdersMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: OrderCreate;
      },
      TContext
    >,
    "mutationFn"
  >
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: OrderCreate;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) => OrdersService.postOrders({ requestBody }) as unknown as Promise<TData>,
    ...options,
  });
