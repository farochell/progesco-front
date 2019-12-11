export class Role {
  roleName:        string;
  roleDescription: string;

  construct() {
    this.roleName = "";
    this.roleDescription = "";
  }

  getRoleName() {
    return this.roleName;
  }

  getRoleDescription() {
    return this.roleDescription;
  }
}
