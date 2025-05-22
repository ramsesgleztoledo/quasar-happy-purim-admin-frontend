import { api } from "src/boot/axios";
import type { EmailStatInterface } from "src/interfaces";



export const getEmailStatsByOrganizationId = async (organizationId: number): Promise<EmailStatInterface[]> => {

  console.log(organizationId
  );

  return (await api.get('/saludo',
  )).data
};

