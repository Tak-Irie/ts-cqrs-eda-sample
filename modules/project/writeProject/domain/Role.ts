class Role {
  constructor(readonly name: string) {}

  equals(role: Role) {
    return this.name === role.name;
  }
}

export default Role;
