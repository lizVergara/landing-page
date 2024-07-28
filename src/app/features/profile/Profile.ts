import { Location } from "../location/Location";
export interface Profile {
  name: string;
  lastName: string;
  documentType: string;
  document: string;
  email: string;
  phoneNumber: string;
  sameBillingInfo: boolean;
  location: Location | null;
}
