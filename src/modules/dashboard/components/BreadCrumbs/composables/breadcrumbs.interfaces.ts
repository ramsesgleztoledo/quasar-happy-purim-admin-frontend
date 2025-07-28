export interface LinksDataInterface {
  title: string;
  name: string;
  routeClass?: string[];
  icon?: string;
  caption?: string;
  children?: LinksDataInterface[];
  disabled?: boolean;
}



export interface routeParamInterface {
  [x: string]: string | string[] | undefined;
}
export interface routeDataInterface {
  name: string;
  icon: string;
  title: string;
  params?: string[];
  titleParam?: ((value?: routeParamInterface) => string);
  dontShow?: boolean;
}
