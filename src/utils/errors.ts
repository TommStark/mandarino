import type { AxiosError } from 'axios';
import { HTTP_STATUS } from '../constants/http';

export const normalizeApiError = (error: unknown): string => {
  const err = error as AxiosError<{ error?: string; message?: string }>;
  const status = err.response?.status;

  if (status === HTTP_STATUS.TOO_MANY_REQUESTS)
    return 'Límite de peticiones alcanzado. Intentá de nuevo en unos segundos.';
  if (
    status === HTTP_STATUS.SERVICE_UNAVAILABLE ||
    status === HTTP_STATUS.GATEWAY_TIMEOUT
  )
    return 'Servicio temporalmente no disponible. Reintentá más tarde.';
  if (status === HTTP_STATUS.NOT_FOUND) return 'Recurso no encontrado.';
  if (status === HTTP_STATUS.UNAUTHORIZED)
    return 'Sesión expirada o no autorizada.';
  return err.response?.data?.message || err.message || 'Error inesperado';
};
