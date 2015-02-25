class Injector{
  constructor(){
    this.dependencies = {};
  }

  register(name, instance){
    this.dependencies[name] = instance;
  }

  get(arr){
    var self = this;
    return arr.map(function (value) {
      return self.dependencies[value];
    })
  }
}

export default new Injector;
