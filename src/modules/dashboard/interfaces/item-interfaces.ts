import type { RouteLocationRaw } from "vue-router";

export interface ItemBasketInterface {
  label: string;
  value: number | string;
  color?: string | undefined;
  redirectTo?: RouteLocationRaw | null | undefined;
  hover?: string | undefined;
  showOnHover?: boolean
}
