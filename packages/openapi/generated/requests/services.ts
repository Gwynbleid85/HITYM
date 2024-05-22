import type { CancelablePromise } from "./core/CancelablePromise";
import { OpenAPI } from "./core/OpenAPI";
import { request as __request } from "./core/request";
import type { Order, OrderCreate, Product, Recipient } from "./models";

export type OrdersData = {
  PostOrders: {
    /**
     * Order to be created.
     */
    requestBody: OrderCreate;
  };
};

export class OrdersService {
  /**
   * Create order.
   * @returns Order Created order
   * @throws ApiError
   */
  public static postOrders(data: OrdersData["PostOrders"]): CancelablePromise<Order> {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: "POST",
      url: "/orders",
      body: requestBody,
      mediaType: "application/json",
    });
  }
}

export class ProductsService {
  /**
   * Get products.
   * @returns Product Success response
   * @throws ApiError
   */
  public static getProducts(): CancelablePromise<Array<Product>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/products",
    });
  }
}

export class RecipientsService {
  /**
   * Get recipients.
   * @returns Recipient Success response
   * @throws ApiError
   */
  public static getRecipients(): CancelablePromise<Array<Recipient>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/recipients",
    });
  }
}
