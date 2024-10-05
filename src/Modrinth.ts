import MROptions, {getDefaultOptions} from "./interfaces/MROptions";
import {URL} from "url";
import {GetProjectRoute} from "./routes/projects/GetProjectRoute";
import {Project} from "./interfaces/project";
import {GetMultipleProjectsRoute} from "./routes/projects/GetMultipleProjectsRoute";
import CacheManager from "./CacheManager";

/**
 * The main class for the Modrinth API
 */
export default class Modrinth {
    private options: MROptions;
    private cacheManager: CacheManager;

    /**
     * Create a new Modrinth instance
     * @param options Options for the Modrinth instance
     */
    constructor(options: MROptions = {}) {
        this.options = {
            ...getDefaultOptions(),
            ...options
        }
        this.options.cache = {
            ...getDefaultOptions().cache,
            ...options.cache
        }
        this.cacheManager = new CacheManager(this.options.cache!!);
    }

    /**
     * Get the options for the Modrinth instance
     * @returns The options for the Modrinth instance
     */
    getOptions(): MROptions {
        return this.options;
    }

    /**
     * Get the base URL for the Modrinth API
     * @returns The base URL for the Modrinth API
     */
    getApiUrl(): URL {
        return new URL(`${this.options.baseUrl}/${this.options.apiVersion}`);
    }

    /**
     * Get the user agent for the Modrinth API
     * @param projectId The ID or slug of the project to get
     * @returns The project with the given ID or slug
     */
    getProject(projectId: string): Promise<Project> {
        return new GetProjectRoute(
            this.getApiUrl(),
            this.options.userAgent,
            this.cacheManager,
            projectId
        ).getData();
    }

    /**
     * Get multiple projects by their IDs
     * @param projectIds
     */
    getProjects(projectIds: string[]): Promise<Project[]> {
        return new GetMultipleProjectsRoute(
            this.getApiUrl(),
            this.options.userAgent,
            this.cacheManager,
            projectIds
        ).getData();
    }
}