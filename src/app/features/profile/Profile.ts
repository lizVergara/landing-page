import { Location } from "../location/Location";
export interface Profile {
  name: string;
  lastName: string;
  documentType: string;
  document: string | null;
  email: string;
  phoneNumber: string;
  sameBillingInfo: boolean;
  location: Location | null;
  // images: File[];
}
