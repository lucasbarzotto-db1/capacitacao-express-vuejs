import { Address } from "./Address.entity";
import { Contact } from "./Contact.entity";
import { PersonalData } from "./PersonalData.entity";

export class FormData {
  constructor(
    public personalData: PersonalData,
    public address: Address,
    public contact: Contact
  ) {}
}
