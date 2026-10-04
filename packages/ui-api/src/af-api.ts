import { InjectionToken, inject } from '@angular/core';
import { BaseHttpService } from '@at/ui-http';
import type { Observable } from 'rxjs';
import { AF_API_CONFIG } from './config.ts';

/** Base of the Core API clients: `baseUrl` is the configured Core API URL plus the resource path. */
export abstract class AfApi extends BaseHttpService {
  protected readonly baseUrl: string;

  protected constructor(resource: string) {
    super();
    this.baseUrl = `${inject(AF_API_CONFIG).coreApiUrl.replace(/\/$/, '')}/${resource}`;
  }
}

/** The five calls most parameter resources share. */
export abstract class CrudApi<Dto, Request> extends AfApi {
  getAll(): Observable<Dto[]> {
    return this.get<Dto[]>('');
  }

  getById(id: string): Observable<Dto> {
    return this.get<Dto>(id);
  }

  create(request: Request): Observable<Dto> {
    return this.post<Request, Dto>('', request);
  }

  update(id: string, request: Request): Observable<Dto> {
    return this.put<Request, Dto>(id, request);
  }

  remove(id: string): Observable<void> {
    return this.delete<void>(id, { allowEmpty: true });
  }
}

/**
 * Token that creates the client on first use, in the injection context (so it can `inject()`).
 * Use `inject(LOAN_API)`. Provide a different value in a test to replace it.
 */
export function apiToken<T>(name: string, create: () => T): InjectionToken<T> {
  return new InjectionToken<T>(name, { providedIn: 'root', factory: create });
}
