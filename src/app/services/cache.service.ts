import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {
  cacheMap = new Map<any, any>(null);

  getFromCache(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    const cached = this.cacheMap.get(url);

    if (!cached) {
      return undefined;
    }

    return this.cacheMap.get(url).response;
  }

  addToCache(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = req.url;
    const entry = { url, response, addedTime: Date.now() };
    this.cacheMap.set(url, entry);
  }
}
