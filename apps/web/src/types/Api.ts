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

/** Update place image */
export interface UpdateImageRequest {
  /** Image URL */
  imageUrl?: string;
}

/** Add user to group */
export interface AddUserRequest {
  /** User ID */
  userId?: string;
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

/** Update user profile picture data */
export interface UpdateProfilePictureRequest {
  /** User profile picture */
  profilePicture: string;
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
  /** Group users */
  users?: User[];
  /** Group events */
  groupEvents?: GroupEvent[];
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

/** User without sensitive data */
export interface SimpleUser {
  /** User ID */
  id: string;
  /** User name */
  name: string;
  /** User profile picture */
  profilePicture?: string;
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

/** Error class */
export type Error = error;

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
  groups = {
    /**
     * No description
     *
     * @tags group
     * @name GroupsCreate
     * @summary Create a new group
     * @request POST:/groups
     * @secure
     */
    groupsCreate: (data: CreateGroupRequest, params: RequestParams = {}) =>
      this.request<Group, Error>({
        path: `/groups`,
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
     * @name GetGroups
     * @summary Get group by ID
     * @request GET:/groups/:id
     * @secure
     */
    getGroups: (id: string, params: RequestParams = {}) =>
      this.request<Group, Error>({
        path: `/groups/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags group
     * @name PutGroups
     * @summary Update a group
     * @request PUT:/groups/:id
     * @secure
     */
    putGroups: (id: string, data: UpdateGroupRequest, params: RequestParams = {}) =>
      this.request<Group, Error>({
        path: `/groups/${id}`,
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
     * @name DeleteGroups
     * @summary Delete a group
     * @request DELETE:/groups/:id
     * @secure
     */
    deleteGroups: (id: string, params: RequestParams = {}) =>
      this.request<string, Error>({
        path: `/groups/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags group
     * @name IdExtendedList
     * @summary Get group by ID with users and events
     * @request GET:/groups/:id/extended
     * @secure
     */
    idExtendedList: (id: string, params: RequestParams = {}) =>
      this.request<GroupExtended, Error>({
        path: `/groups/${id}/extended`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags group
     * @name IdImageUpdate
     * @summary Update group image
     * @request PUT:/groups/:id/image
     * @secure
     */
    idImageUpdate: (id: string, data: UpdateImageRequest, params: RequestParams = {}) =>
      this.request<Group, Error>({
        path: `/groups/${id}/image`,
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
     * @name IdUsersCreate
     * @summary Add user to group
     * @request POST:/groups/:id/users
     * @secure
     */
    idUsersCreate: (id: string, data: AddUserRequest, params: RequestParams = {}) =>
      this.request<Group, Error>({
        path: `/groups/${id}/users`,
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
     * @name IdUsersUserIdDelete
     * @summary Remove user from group
     * @request DELETE:/groups/:id/users/:userId
     * @secure
     */
    idUsersUserIdDelete: (id: string, userId: string, params: RequestParams = {}) =>
      this.request<Group, Error>({
        path: `/groups/${id}/users/${userId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags group
     * @name IdEventsHistoricalList
     * @summary Get group events history
     * @request GET:/groups/:id/events/historical
     * @secure
     */
    idEventsHistoricalList: (id: string, params: RequestParams = {}) =>
      this.request<any[], Error>({
        path: `/groups/${id}/events/historical`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  groupEvents = {
    /**
     * No description
     *
     * @tags group-events
     * @name GroupEventsCreate
     * @summary Create new group event
     * @request POST:/group-events
     * @secure
     */
    groupEventsCreate: (data: CreateGroupEventRequest, params: RequestParams = {}) =>
      this.request<GroupEvent, Error>({
        path: `/group-events`,
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
     * @name GetGroupEvents
     * @summary Get group event by ID
     * @request GET:/group-events/:id
     * @secure
     */
    getGroupEvents: (id: string, params: RequestParams = {}) =>
      this.request<GroupEvent, Error>({
        path: `/group-events/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags group-events
     * @name PutGroupEvents
     * @summary Update group event
     * @request PUT:/group-events/:id
     * @secure
     */
    putGroupEvents: (id: string, data: UpdateGroupEventRequest, params: RequestParams = {}) =>
      this.request<GroupEvent, Error>({
        path: `/group-events/${id}`,
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
     * @name DeleteGroupEvents
     * @summary Delete group event
     * @request DELETE:/group-events/:id
     * @secure
     */
    deleteGroupEvents: (id: string, params: RequestParams = {}) =>
      this.request<string, Error>({
        path: `/group-events/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags group-events
     * @name IdImageUpdate
     * @summary Update group event image
     * @request PUT:/group-events/:id/image
     * @secure
     */
    idImageUpdate: (id: string, data: UpdateImageRequest, params: RequestParams = {}) =>
      this.request<GroupEvent, Error>({
        path: `/group-events/${id}/image`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  places = {
    /**
     * No description
     *
     * @tags place
     * @name PlacesCreate
     * @summary Create a new place
     * @request POST:/places
     * @secure
     */
    placesCreate: (data: CreatePlaceRequest, params: RequestParams = {}) =>
      this.request<Place, Error>({
        path: `/places`,
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
     * @request GET:/places
     * @secure
     */
    placesList: (params: RequestParams = {}) =>
      this.request<Place[], Error>({
        path: `/places`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags place
     * @name PutPlaces
     * @summary Update a place
     * @request PUT:/places/:id
     * @secure
     */
    putPlaces: (id: string, data: UpdatePlaceRequest, params: RequestParams = {}) =>
      this.request<Place, Error>({
        path: `/places/${id}`,
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
     * @name DeletePlaces
     * @summary Delete a place
     * @request DELETE:/places/:id
     * @secure
     */
    deletePlaces: (id: string, params: RequestParams = {}) =>
      this.request<any, Error>({
        path: `/places/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags place
     * @name IdImageUpdate
     * @summary Update place image
     * @request PUT:/places/:id/image
     * @secure
     */
    idImageUpdate: (id: string, data: UpdateImageRequest, params: RequestParams = {}) =>
      this.request<Place, Error>({
        path: `/places/${id}/image`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags user
     * @name RegistrationCreate
     * @summary Create new user
     * @request POST:/users/registration
     */
    registrationCreate: (data: UserRegistrationRequest, params: RequestParams = {}) =>
      this.request<User, Error>({
        path: `/users/registration`,
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
     * @name LoginCreate
     * @summary Login user
     * @request POST:/users/login
     */
    loginCreate: (data: UserLoginRequest, params: RequestParams = {}) =>
      this.request<User, Error>({
        path: `/users/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags test
     * @name TestAuthorizationList
     * @summary Test authorization
     * @request GET:/users/test/authorization
     * @secure
     */
    testAuthorizationList: (params: RequestParams = {}) =>
      this.request<string, Error>({
        path: `/users/test/authorization`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name DeleteUsers
     * @summary Delete user
     * @request DELETE:/users/:id
     * @secure
     */
    deleteUsers: (id: string, params: RequestParams = {}) =>
      this.request<string, Error>({
        path: `/users/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name PutUsers
     * @summary Update user
     * @request PUT:/users/:id
     * @secure
     */
    putUsers: (id: string, data: UpdateUserRequest, params: RequestParams = {}) =>
      this.request<User, Error>({
        path: `/users/${id}`,
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
     * @name UsersList
     * @summary Get all users
     * @request GET:/users
     * @secure
     */
    usersList: (params: RequestParams = {}) =>
      this.request<SimpleUser[], Error>({
        path: `/users`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name IdPasswordUpdate
     * @summary Update user password
     * @request PUT:/users/:id/password
     * @secure
     */
    idPasswordUpdate: (id: string, data: UpdatePasswordRequest, params: RequestParams = {}) =>
      this.request<User, Error>({
        path: `/users/${id}/password`,
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
     * @name IdProfilePictureUpdate
     * @summary Update user profile picture
     * @request PUT:/users/:id/profilePicture
     * @secure
     */
    idProfilePictureUpdate: (id: string, data: UpdateProfilePictureRequest, params: RequestParams = {}) =>
      this.request<User, Error>({
        path: `/users/${id}/profilePicture`,
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
     * @name IdUserStatusCreate
     * @summary Update user status
     * @request POST:/users/:id/user-status
     * @secure
     */
    idUserStatusCreate: (id: string, data: UpdateUserStatusRequest, params: RequestParams = {}) =>
      this.request<User, Error>({
        path: `/users/${id}/user-status`,
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
     * @name IdUserStatusDelete
     * @summary Delete user status
     * @request DELETE:/users/:id/user-status
     * @secure
     */
    idUserStatusDelete: (id: string, params: RequestParams = {}) =>
      this.request<string, Error>({
        path: `/users/${id}/user-status`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name IdPlacesList
     * @summary Get all places created by user
     * @request GET:/users/:id/places
     * @secure
     */
    idPlacesList: (id: string, params: RequestParams = {}) =>
      this.request<Place[], Error>({
        path: `/users/${id}/places`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name IdPlacesFavoritesList
     * @summary Get all favorite places of user
     * @request GET:/users/:id/places/favorites
     * @secure
     */
    idPlacesFavoritesList: (id: string, params: RequestParams = {}) =>
      this.request<Place[], Error>({
        path: `/users/${id}/places/favorites`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name IdPlacesFavoritesCreate
     * @summary Add favorite place
     * @request POST:/users/:id/places/favorites
     * @secure
     */
    idPlacesFavoritesCreate: (id: string, data: AddFavoritePlaceRequest, params: RequestParams = {}) =>
      this.request<User, Error>({
        path: `/users/${id}/places/favorites`,
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
     * @name IdPlacesFavoritesPlaceIdDelete
     * @summary Remove favorite place
     * @request DELETE:/users/:id/places/favorites/:placeId
     * @secure
     */
    idPlacesFavoritesPlaceIdDelete: (id: string, placeId: string, params: RequestParams = {}) =>
      this.request<User, Error>({
        path: `/users/${id}/places/favorites/${placeId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name IdGroupsList
     * @summary Get all groups user is member of
     * @request GET:/users/:id/groups
     * @secure
     */
    idGroupsList: (id: string, params: RequestParams = {}) =>
      this.request<Group[], Error>({
        path: `/users/${id}/groups`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
