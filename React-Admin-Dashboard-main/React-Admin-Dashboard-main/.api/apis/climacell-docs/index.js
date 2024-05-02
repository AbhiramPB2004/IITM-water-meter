import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';
class SDK {
    constructor() {
        this.spec = Oas.init(definition);
        this.core = new APICore(this.spec, 'climacell-docs/unknown (api/6.1.1)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config) {
        this.core.setConfig(config);
    }
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    auth(...values) {
        this.core.setAuth(...values);
        return this;
    }
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    server(url, variables = {}) {
        this.core.setServer(url, variables);
    }
    /**
     * List Alerts
     *
     */
    getAlerts(metadata) {
        return this.core.fetch('/alerts', 'get', metadata);
    }
    /**
     * Create an Alert
     *
     */
    postAlerts(body, metadata) {
        return this.core.fetch('/alerts', 'post', body, metadata);
    }
    /**
     * Retrieve an Alert
     *
     */
    getAlertsId(metadata) {
        return this.core.fetch('/alerts/{alertId}', 'get', metadata);
    }
    putAlertsId(body, metadata) {
        return this.core.fetch('/alerts/{alertId}', 'put', body, metadata);
    }
    /**
     * Delete an Alert
     *
     */
    deleteAlertsId(metadata) {
        return this.core.fetch('/alerts/{alertId}', 'delete', metadata);
    }
    /**
     * List Insights
     *
     */
    getInsights(metadata) {
        return this.core.fetch('/insights', 'get', metadata);
    }
    /**
     * Create an Insight
     *
     */
    postInsights(body, metadata) {
        return this.core.fetch('/insights', 'post', body, metadata);
    }
    /**
     * Retrieve an Insight
     *
     */
    getInsightsId(metadata) {
        return this.core.fetch('/insights/{insightId}', 'get', metadata);
    }
    putInsightsId(body, metadata) {
        return this.core.fetch('/insights/{insightId}', 'put', body, metadata);
    }
    /**
     * Delete an Insight
     *
     */
    deleteInsightsId(metadata) {
        return this.core.fetch('/insights/{insightId}', 'delete', metadata);
    }
    /**
     * Retrieve a Location
     *
     */
    getLocationsId(metadata) {
        return this.core.fetch('/locations/{locationId}', 'get', metadata);
    }
    /**
     * Delete a Location
     *
     */
    deleteLocationsId(metadata) {
        return this.core.fetch('/locations/{locationId}', 'delete', metadata);
    }
    putLocationId(body, metadata) {
        return this.core.fetch('/locations/{locationId}', 'put', body, metadata);
    }
    /**
     * Create a Location
     *
     */
    postLocations(body, metadata) {
        return this.core.fetch('/locations', 'post', body, metadata);
    }
    /**
     * List Locations
     *
     */
    getLocations(metadata) {
        return this.core.fetch('/locations', 'get', metadata);
    }
    /**
     * Activate an Alert
     *
     */
    postAlertsIdActivate(metadata) {
        return this.core.fetch('/alerts/{alertId}/activate', 'post', metadata);
    }
    /**
     * Unlink Locations
     *
     */
    postAlertsIdLocationsUnlink(body, metadata) {
        return this.core.fetch('/alerts/{alertId}/locations/unlink', 'post', body, metadata);
    }
    /**
     * Linked Locations
     *
     */
    postAlertsIdLocations(metadata) {
        return this.core.fetch('/alerts/{alertId}/locations', 'get', metadata);
    }
    /**
     * Deactivate an Alert
     *
     */
    postAlertsIdDeactivate(metadata) {
        return this.core.fetch('/alerts/{alertId}/deactivate', 'post', metadata);
    }
    /**
     * Link Locations
     *
     */
    postAlertsIdLocationsLink(body, metadata) {
        return this.core.fetch('/alerts/{alertId}/locations/link', 'post', body, metadata);
    }
    /**
     * Retrieve Events (Basic)
     *
     */
    getEvents(metadata) {
        return this.core.fetch('/events', 'get', metadata);
    }
    /**
     * Retrieve Events (Advanced)
     *
     */
    postEvents(body, metadata) {
        return this.core.fetch('/events', 'post', body, metadata);
    }
    /**
     * Remove Location Tags
     *
     * @throws FetchError<400, types.RemoveLocationTagsResponse400> 400
     */
    removeLocationTags(body, metadata) {
        return this.core.fetch('/locations/tags/remove', 'post', body, metadata);
    }
    /**
     * List Notifications
     *
     */
    listNotificationsGet(metadata) {
        return this.core.fetch('/notifications', 'get', metadata);
    }
    /**
     * Remove Insight Tags
     *
     * @throws FetchError<400, types.RemoveInsightTagsResponse400> 400
     */
    removeInsightTags(body, metadata) {
        return this.core.fetch('/insights/tags/remove', 'post', body, metadata);
    }
    /**
     * Add Insight Tags
     *
     * @throws FetchError<400, types.AddInsightTagsResponse400> 400
     */
    addInsightTags(body, metadata) {
        return this.core.fetch('/insights/tags/add', 'post', body, metadata);
    }
    /**
     * Add Location Tags
     *
     * @throws FetchError<400, types.AddLocationTagsResponse400> 400
     */
    addLocationTags(body, metadata) {
        return this.core.fetch('/locations/tags/add', 'post', body, metadata);
    }
    /**
     * On-Demand Events
     *
     * @throws FetchError<400, types.EventsTimelineResponse400> 400
     */
    eventsTimeline(body) {
        return this.core.fetch('/events-timeline', 'post', body);
    }
}
const createSDK = (() => { return new SDK(); })();
export default createSDK;
