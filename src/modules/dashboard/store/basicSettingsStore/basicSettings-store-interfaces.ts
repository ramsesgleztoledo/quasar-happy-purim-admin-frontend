import type { OrganizationSettingsInterface } from "../../interfaces/basic-settings.interfaces";
import type { NoneType } from "../../services/service-interfaces";


export interface BasicSettingsStateInterface {
  settings: OrganizationSettingsInterface | NoneType
  welcomePage: string
}
