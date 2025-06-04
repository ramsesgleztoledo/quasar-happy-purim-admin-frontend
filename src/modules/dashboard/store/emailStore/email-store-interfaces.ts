import type { CampaignDetailsInterface, CampaignInterface, } from "../../interfaces/email-interfaces";


export interface emailStateInterface {
  campaigns: CampaignInterface[];
  selectedCampaign?: CampaignDetailsInterface | undefined | null;
}
