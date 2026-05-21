import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  ('');
  if (!req.url.includes('/auth/login')) {
    const token = localStorage.getItem('BoxAdapta');
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next(req);
  }

  return next(req);
};
