/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** Update/upload image */
export interface UpdateImageRequest {
  /**
   * New image to upload
   * @format binary
   */
  image: File;
}

/** Update image with ID */
export interface UpdateImageWithIdRequest {
  /**
   * New image to upload
   * @format binary
   */
  image: File;
}

/** Create a new group */
export interface CreateGroupRequest {
  /** Group name */
  name: string;
  /** Group description */
  description?: string;
}

/** Update a group */
export interface UpdateGroupRequest {
  /** Group name */
  name?: string;
  /** Group description */
  description?: string;
}

/** Create new group event request */
export interface CreateGroupEventRequest {
  /** Event name */
  name: string;
  /** Event description */
  description?: string;
  /**
   * Event date
   * @format date-time
   */
  date: string;
  /** Group ID */
  groupId: string;
  /** Place ID */
  placeId: string;
}

/** Update group event request */
export interface UpdateGroupEventRequest {
  /** Event name */
  name?: string;
  /** Event description */
  description?: string;
  /**
   * Event date
   * @format date-time
   */
  date?: string;
  /** Place ID */
  placeId?: string;
}

/** Create a new place */
export interface CreatePlaceRequest {
  /** Place name */
  name: string;
  /** Place description */
  description?: string;
  /** Place image url */
  imageUrl?: string;
  /** Place position */
  position: Position;
}

/** Update a place */
export interface UpdatePlaceRequest {
  /** Place name */
  name?: string;
  /** Place description */
  description?: string;
  /** Place position */
  position?: Position;
}

/** Registration request for a new user */
export interface UserRegistrationRequest {
  /** User email */
  email: string;
  /** User password */
  password: string;
  /** User name */
  name: string;
}

/** Login request for a user */
export interface UserLoginRequest {
  /** User email */
  email: string;
  /** User password */
  password: string;
}

/** Update user data */
export interface UpdateUserRequest {
  /** User name */
  name: string;
  /** User bio */
  bio?: string;
}

/** Update user password data */
export interface UpdatePasswordRequest {
  /** User password */
  password: string;
}

/** Update user status data */
export interface UpdateUserStatusRequest {
  /** User status */
  status: string;
  /** Status color */
  color: string;
}

/** Add favorite place data */
export interface AddFavoritePlaceRequest {
  /** Place ID */
  placeId: string;
}

/** Invite user to group data */
export interface InviteUserToGroupRequest {
  /** Group ID */
  groupId: string;
}

/** Subscribe to user data */
export interface SubscribeGroupRequest {
  /** Group to subscribe to */
  groupId: string;
}

/** Unsubscribe from user data */
export interface UnsubscribeGroupRequest {
  /** Group to unsubscribe from */
  groupId: string;
}

/** Share position with group */
export interface SharePositionWithGroupRequest {
  /** Group to share position with */
  groupId: string;
}

/** Unshare position with group */
export interface UnsharePositionWithGroupRequest {
  /** Group to unshare position with */
  groupId: string;
}

/** Group with users and events */
export interface GroupExtended {
  /** Group ID */
  id: string;
  /** Group name */
  name: string;
  /** Group description */
  description: string;
  /** Group image URL */
  imageUrl: string;
  /** User ID of the creator */
  createdById: string;
  /** Group users with status */
  users?: UserWithStatus[];
  /** Group events */
  events?: GroupEvent[];
}

/** Group invite */
export interface GroupInviteExtended {
  /** Invite ID */
  id: string;
  /** Group ID */
  groupId: string;
  /** Invited user ID */
  invitedUserId: string;
  /** Invited by user ID */
  invitedById: string;
  /** Group */
  group?: Group;
}

/** User without sensitive data */
export interface SimpleUser {
  /** User ID */
  id: string;
  /** User name */
  name: string;
  /** User profile picture */
  profilePicture?: string;
}

/** User with status data */
export interface UserWithStatus {
  /** User ID */
  id: string;
  /** User name */
  name: string;
  /** User profile picture */
  profilePicture?: string;
  /** User bio */
  bio?: string;
  /** User last active date */
  lastActive?: string;
  /** User last position */
  lastPosition?: Position;
  /** User status */
  status: UserStatusSimple;
}

/** User status data */
export interface UserStatusSimple {
  /** User status */
  status: string;
  /** Status color */
  color: string;
}

/** User websocket config */
export interface PositionSharingConfig {
  /** Ids of groups the user is sharing their position with */
  sharingWith?: string[];
  /** Ids of groups the user is following */
  following?: string[];
}

/** User */
export interface User {
  /** User ID */
  id: string;
  /** User email */
  email: string;
  /** User name */
  name: string;
  /** User profile picture url */
  profilePicture: string;
  /** User bio */
  bio: string;
  /** User last position */
  position: Position;
}

/** User status */
export interface UserStatus {
  /** Status ID */
  id: string;
  /** User ID */
  userId: string;
  /** User status */
  status: string;
  /** Status color */
  color: string;
}

/** Place */
export interface Place {
  /** Place ID */
  id: string;
  /** Place name */
  name: string;
  /** Place description */
  description: string;
  /** Place image url */
  imageUrl: string;
  /** User ID of the creator */
  createdBy: string;
  /** Place position */
  position: Position;
}

/** Group */
export interface Group {
  /** Group ID */
  id: string;
  /** Group name */
  name: string;
  /** Group description */
  description: string;
  /** Group image url */
  imageUrl: string;
}

/** Group event */
export interface GroupEvent {
  /** Event ID */
  id: string;
  /** Event name */
  name: string;
  /** Event description */
  description: string;
  /** Event image url */
  imageUrl: string;
  /** Group ID */
  groupId: string;
  /**
   * Event date
   * @format date-time
   */
  date: string;
  /** Place ID */
  placeId: string;
}

/** Group invite */
export interface GroupInvite {
  /** Invite ID */
  id: string;
  /** Group ID */
  groupId: string;
  /** Invited user ID */
  invitedUserId: string;
  /** Invited by user ID */
  invitedById: string;
}

/** Pagination query */
export interface PaginationQuery {
  /** Page number */
  page: number;
  /** Page size */
  pageSize: number;
}

/** Position */
export interface Position {
  /**
   * Latitude
   * @format double
   */
  latitude: number;
  /**
   * Longitude
   * @format double
   */
  longitude: number;
}

/** User login result */
export interface UserLoginResult {
  /** User token */
  token: string;
  /** User */
  user: User;
}

/** Error class */
export interface Error {
  /** Error name */
  name: string;
  /** Error message */
  message: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title HIMYM API
 * @version 1.0.0
 * @license MIT
 *
 * Add your description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags group
     * @name GroupsCreate
     * @summary Create a new group
     * @request POST:/api/groups
     * @secure
     */
    groupsCreate: (data: CreateGroupRequest, params: RequestParams = {}) =>
      this.request<Group, Error>({
        path: `/api/groups`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags group
     * @name GroupsDetail
     * @summary Get group by ID
     * @request GET:/api/groups/{id}
     * @secure
     */
    groupsDetail: (id: string, params: RequestParams = {}) =>
      this.request<Group, Error>({
        path: `/api/groups/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags group
     * @name GroupsUpdate
     * @summary Update a group
     * @request PUT:/api/groups/{id}
     * @secure
     */
    groupsUpdate: (id: string, data: UpdateGroupRequest, params: RequestParams = {}) =>
      this.request<Group, Error>({
        path: `/api/groups/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags group
     * @name GroupsDelete
     * @summary Delete a group
     * @request DELETE:/api/groups/{id}
     * @secure
     */
    groupsDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/api/groups/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags group
     * @name GroupsExtendedDetail
     * @summary Get group by ID with users and events
     * @request GET:/api/groups/{id}/extended
     * @secure
     */
    groupsExtendedDetail: (id: string, params: RequestParams = {}) =>
      this.request<GroupExtended, Error>({
        path: `/api/groups/${id}/extended`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags group
     * @name GroupsImageUpdate
     * @summary Update group image
     * @request PUT:/api/groups/{id}/image
     * @secure
     */
    groupsImageUpdate: (id: string, data: UpdateImageWithIdRequest, params: RequestParams = {}) =>
      this.request<Group, Error>({
        path: `/api/groups/${id}/image`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags group
     * @name GroupsUsersDelete
     * @summary Remove user from group
     * @request DELETE:/api/groups/{id}/users/{userId}
     * @secure
     */
    groupsUsersDelete: (id: string, userId: string, params: RequestParams = {}) =>
      this.request<Group, Error>({
        path: `/api/groups/${id}/users/${userId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags group
     * @name GroupsEventsHistoricalDetail
     * @summary Get group events history
     * @request GET:/api/groups/{id}/events/historical
     * @secure
     */
    groupsEventsHistoricalDetail: (id: string, params: RequestParams = {}) =>
      this.request<GroupEvent[], Error>({
        path: `/api/groups/${id}/events/historical`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags group-events
     * @name GroupEventsCreate
     * @summary Create new group event
     * @request POST:/api/group-events
     * @secure
     */
    groupEventsCreate: (data: CreateGroupEventRequest, params: RequestParams = {}) =>
      this.request<GroupEvent, Error>({
        path: `/api/group-events`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags group-events
     * @name GroupEventsDetail
     * @summary Get group event by ID
     * @request GET:/api/group-events/{id}
     * @secure
     */
    groupEventsDetail: (id: string, params: RequestParams = {}) =>
      this.request<GroupEvent, Error>({
        path: `/api/group-events/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags group-events
     * @name GroupEventsUpdate
     * @summary Update group event
     * @request PUT:/api/group-events/{id}
     * @secure
     */
    groupEventsUpdate: (id: string, data: UpdateGroupEventRequest, params: RequestParams = {}) =>
      this.request<GroupEvent, Error>({
        path: `/api/group-events/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags group-events
     * @name GroupEventsDelete
     * @summary Delete group event
     * @request DELETE:/api/group-events/{id}
     * @secure
     */
    groupEventsDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/api/group-events/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags group-events
     * @name GroupEventsImageUpdate
     * @summary Update group event image
     * @request PUT:/api/group-events/{id}/image
     * @secure
     */
    groupEventsImageUpdate: (id: string, data: UpdateImageWithIdRequest, params: RequestParams = {}) =>
      this.request<GroupEvent, Error>({
        path: `/api/group-events/${id}/image`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags place
     * @name PlacesCreate
     * @summary Create a new place
     * @request POST:/api/places
     * @secure
     */
    placesCreate: (data: CreatePlaceRequest, params: RequestParams = {}) =>
      this.request<Place, Error>({
        path: `/api/places`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags place
     * @name PlacesList
     * @summary Get all places
     * @request GET:/api/places
     * @secure
     */
    placesList: (params: RequestParams = {}) =>
      this.request<Place[], Error>({
        path: `/api/places`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags place
     * @name PlacesUpdate
     * @summary Update a place
     * @request PUT:/api/places/{id}
     * @secure
     */
    placesUpdate: (id: string, data: UpdatePlaceRequest, params: RequestParams = {}) =>
      this.request<Place, Error>({
        path: `/api/places/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags place
     * @name PlacesDelete
     * @summary Delete a place
     * @request DELETE:/api/places/{id}
     * @secure
     */
    placesDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/api/places/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags place
     * @name PlacesImageUpdate
     * @summary Update place image
     * @request PUT:/api/places/{id}/image
     * @secure
     */
    placesImageUpdate: (id: string, data: UpdateImageWithIdRequest, params: RequestParams = {}) =>
      this.request<Place, Error>({
        path: `/api/places/${id}/image`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserRegistrationCreate
     * @summary Create new user
     * @request POST:/api/user/registration
     */
    userRegistrationCreate: (data: UserRegistrationRequest, params: RequestParams = {}) =>
      this.request<User, Error>({
        path: `/api/user/registration`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserLoginCreate
     * @summary Login user
     * @request POST:/api/user/login
     */
    userLoginCreate: (data: UserLoginRequest, params: RequestParams = {}) =>
      this.request<UserLoginResult, Error>({
        path: `/api/user/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserList
     * @summary Get user data
     * @request GET:/api/user
     * @secure
     */
    userList: (params: RequestParams = {}) =>
      this.request<User, Error>({
        path: `/api/user`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserDelete
     * @summary Delete user
     * @request DELETE:/api/user
     * @secure
     */
    userDelete: (params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/api/user`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserUpdate
     * @summary Update user
     * @request PUT:/api/user
     * @secure
     */
    userUpdate: (data: UpdateUserRequest, params: RequestParams = {}) =>
      this.request<User, Error>({
        path: `/api/user`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags test
     * @name UserTestAuthorizationList
     * @summary Test authorization
     * @request GET:/api/user/test/authorization
     * @secure
     */
    userTestAuthorizationList: (params: RequestParams = {}) =>
      this.request<string, Error>({
        path: `/api/user/test/authorization`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserPasswordUpdate
     * @summary Update user password
     * @request PUT:/api/user/password
     * @secure
     */
    userPasswordUpdate: (data: UpdatePasswordRequest, params: RequestParams = {}) =>
      this.request<User, Error>({
        path: `/api/user/password`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserProfilePictureUpdate
     * @summary Update user profile picture
     * @request PUT:/api/user/profilePicture
     * @secure
     */
    userProfilePictureUpdate: (data: UpdateImageRequest, params: RequestParams = {}) =>
      this.request<User, Error>({
        path: `/api/user/profilePicture`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserUserStatusCreate
     * @summary Update user status
     * @request POST:/api/user/user-status
     * @secure
     */
    userUserStatusCreate: (data: UpdateUserStatusRequest, params: RequestParams = {}) =>
      this.request<UserStatus, Error>({
        path: `/api/user/user-status`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserUserStatusDelete
     * @summary Delete user status
     * @request DELETE:/api/user/user-status
     * @secure
     */
    userUserStatusDelete: (params: RequestParams = {}) =>
      this.request<string, Error>({
        path: `/api/user/user-status`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserPlacesList
     * @summary Get all places created by user
     * @request GET:/api/user/places
     * @secure
     */
    userPlacesList: (params: RequestParams = {}) =>
      this.request<Place[], Error>({
        path: `/api/user/places`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserPlacesFavoritesList
     * @summary Get all favorite places of user
     * @request GET:/api/user/places/favorites
     * @secure
     */
    userPlacesFavoritesList: (params: RequestParams = {}) =>
      this.request<Place[], Error>({
        path: `/api/user/places/favorites`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserPlacesFavoritesCreate
     * @summary Add favorite place
     * @request POST:/api/user/places/favorites
     * @secure
     */
    userPlacesFavoritesCreate: (data: AddFavoritePlaceRequest, params: RequestParams = {}) =>
      this.request<User, Error>({
        path: `/api/user/places/favorites`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserPlacesFavoritesDelete
     * @summary Remove favorite place
     * @request DELETE:/api/user/places/favorites/{placeId}
     * @secure
     */
    userPlacesFavoritesDelete: (placeId: string, params: RequestParams = {}) =>
      this.request<User, Error>({
        path: `/api/user/places/favorites/${placeId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserGroupsList
     * @summary Get all groups user is member of
     * @request GET:/api/user/groups
     * @secure
     */
    userGroupsList: (params: RequestParams = {}) =>
      this.request<Group[], Error>({
        path: `/api/user/groups`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags group-invite
     * @name UserGroupsInvitesList
     * @summary Get user invites
     * @request GET:/api/user/groups/invites
     * @secure
     */
    userGroupsInvitesList: (params: RequestParams = {}) =>
      this.request<GroupInviteExtended[], Error>({
        path: `/api/user/groups/invites`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags group-invite
     * @name UserGroupsInvitesAcceptCreate
     * @summary Accept group invite
     * @request POST:/api/user/groups/invites/{id}/accept
     * @secure
     */
    userGroupsInvitesAcceptCreate: (id: string, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/api/user/groups/invites/${id}/accept`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags group-invite
     * @name UserGroupsInvitesDelete
     * @summary Decline group invite
     * @request DELETE:/api/user/groups/invites/{id}
     * @secure
     */
    userGroupsInvitesDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/api/user/groups/invites/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags position-sharing
     * @name UserPositionSharingSubscriptionsCreate
     * @summary Subscribe to group positions
     * @request POST:/api/user/position-sharing/subscriptions
     * @secure
     */
    userPositionSharingSubscriptionsCreate: (data: SubscribeGroupRequest, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/api/user/position-sharing/subscriptions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags position-sharing
     * @name UserPositionSharingSubscriptionsDelete
     * @summary Unsubscribe from group positions
     * @request DELETE:/api/user/position-sharing/subscriptions
     * @secure
     */
    userPositionSharingSubscriptionsDelete: (data: UnsubscribeGroupRequest, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/api/user/position-sharing/subscriptions`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags position-sharing
     * @name UserPositionSharingShareWithGroupsCreate
     * @summary Share position with group
     * @request POST:/api/user/position-sharing/share-with/groups
     * @secure
     */
    userPositionSharingShareWithGroupsCreate: (data: SharePositionWithGroupRequest, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/api/user/position-sharing/share-with/groups`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags position-sharing
     * @name UserPositionSharingShareWithGroupsDelete
     * @summary Unshare position with group
     * @request DELETE:/api/user/position-sharing/share-with/groups
     * @secure
     */
    userPositionSharingShareWithGroupsDelete: (data: UnsharePositionWithGroupRequest, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/api/user/position-sharing/share-with/groups`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags position-sharing
     * @name UserPositionSharingConfigList
     * @summary Get position sharing config
     * @request GET:/api/user/position-sharing/config
     * @secure
     */
    userPositionSharingConfigList: (params: RequestParams = {}) =>
      this.request<PositionSharingConfig, Error>({
        path: `/api/user/position-sharing/config`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersList
     * @summary Get all users
     * @request GET:/api/users
     * @secure
     */
    usersList: (params: RequestParams = {}) =>
      this.request<SimpleUser[], Error>({
        path: `/api/users`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersUserStatusDetail
     * @summary Get user-status by user
     * @request GET:/api/users/{id}/user-status
     * @secure
     */
    usersUserStatusDetail: (id: string, params: RequestParams = {}) =>
      this.request<UserStatus, Error>({
        path: `/api/users/${id}/user-status`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags group-invite
     * @name UsersGroupsInvitesCreate
     * @summary Invite user to group
     * @request POST:/api/users/{id}/groups/invites
     * @secure
     */
    usersGroupsInvitesCreate: (id: string, data: InviteUserToGroupRequest, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/api/users/${id}/groups/invites`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
}
