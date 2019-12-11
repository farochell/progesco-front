import { Role } from "./role";

export class User {
  usernameOrEmail:       string;
  password:       string;
  email:          string;
  magCode:        string;
  codeSocietaire: string;
  roles:          Role[];

  construct() {
    this.usernameOrEmail = "";
    this.password = "";
  }
  getUsername() {
    return this.usernameOrEmail;
  }

  getEmail() {
    return this.email;
  }

  getMagCode() {
    return this.magCode;
  }

  getCodeSocietaire() {
    return this.codeSocietaire;
  }
}
