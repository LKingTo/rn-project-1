import {uuid} from '../utils/idUtils';

const UUID_LENGTH = 8;

/**
 * 简陋版 EventBus
 */
export default class EventBus {
  static listeners = {};

  static on(event, listener) {
    const id = uuid(UUID_LENGTH);
    if (!this.listeners[event]) {
      this.listeners[event] = {};
    }
    this.listeners[event][id] = listener;
    return id;
  }

  static emit(event, ...data) {
    const listeners = this.listeners[event] || {};
    Object.keys(listeners).forEach(eventId => {
      const listener = listeners[eventId];
      listener(...data);
    });
  }

  static off(event, id) {
    if (id) {
      delete (this.listeners[event] || {})[id];
    } else {
      delete this.listeners[event];
    }
  }
}
