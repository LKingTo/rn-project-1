import React from 'react';
import {routeConfigs} from '../routes/routeConfigs';
import EventBus from '../services/eventBus';

/**
 * Screen基础组件
 */
export default class Screen extends React.Component {
  static routeConfigs = routeConfigs; // 每个screen都保存路由字典为静态属性

  constructor(props) {
    super(props);
    this._events = {};
  }

  $on(event, listener) {
    const eventId = EventBus.on(event, listener);
    this._events[eventId] = event;
  }

  $emit(event, ...data) {
    EventBus.emit(event, ...data);
  }

  $off(event) {
    if (event) {
      EventBus.off(event);
    } else {
      Object.keys(this._events).forEach(eventId => {
        const eventName = this._events[eventId];
        EventBus.off(eventName, eventId);
      });
    }
  }

  navigate(route, param) {
    this.props.navigation.navigate(route, param);
  }

  getParam(property) {
    return this.props.navigation.getParam(property);
  }

  setParam(property, value) {
    this.props.navigation.setParams({[property]: value});
  }

  goBack() {
    this.props.navigation.goBack();
  }
}
