class Injector {
  constructor() {
    this.dependencies = new Map();
    window.injector = this;
  }

  register(id, instance) {
    if (!this.dependencies.has(id)) {
      return this.dependencies.set(id, instance);
    }
  }

  get(id) {
    if (this.dependencies.has(id)) {
      return this.dependencies.get(id);
    }
  }
}

export default new Injector();
