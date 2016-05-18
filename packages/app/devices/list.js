Device.ListComponent = class ListComponent extends UIComponent {
  onCreated() {
    super.onCreated();

    this.currentEnvironmentUuid = new ComputedField(() => {
      return FlowRouter.getParam('uuid');
    });

    return this.subscribe('Device.listByEnvironment', this.currentEnvironmentUuid());
  }

  onRendered() {
    return super.onRendered();
  }

  devicesList() {
    return Device.documents.find(
      {'environment.uuid': this.currentEnvironmentUuid()});
  }

  events() {
    return super.events().concat(
      {'click .device': this.viewDevice});
  }

  viewDevice(event) {
    // Build path from the data-uuid attribute
    let params = { uuid: event.currentTarget.dataset.uuid };
    let path = FlowRouter.path('Device.display', params);
    return FlowRouter.go(path);
  }
};

Device.ListComponent.register('Device.ListComponent');
