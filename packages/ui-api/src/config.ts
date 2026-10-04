import { InjectionToken } from '@angular/core';

export interface AfApiConfig {
  /** Base URL of the Core API with its version, e.g. `https://host/api/v1.0`. */
  readonly coreApiUrl: string;
}

/** Each app provides the URL of the Core API for its environment. */
export const AF_API_CONFIG = new InjectionToken<AfApiConfig>('AF_API_CONFIG');
