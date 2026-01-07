export interface LinkParamInterface {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
}

export interface LinksDataInterface {
  title: string;
  name: string;
  routeClass?: string[];
  icon?: string;
  caption?: string;
  children?: LinksDataInterface[];
  disabled?: boolean
  force?: boolean;
  tooltip?: string | undefined;
  LinkParams?: LinkParamInterface[]
}



export interface routeParamInterface {
  [x: string]: string | string[] | undefined;
}
export interface routeDataInterface {
  name: string;
  icon: string;
  title: string;
  params?: string[];
  queryParams?: string[];
  titleParam?: ((value?: routeParamInterface) => string);
  dontShow?: boolean;
}

