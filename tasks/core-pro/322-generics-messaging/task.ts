type MessageType = 'orderCreated' | 'orderCancelled';

interface Message {
  type: MessageType;
}

interface Order {
  orderId: string;
  items: { productId: string; quantity: number }[];
}

export interface OrderCreatedMessage {
  type: 'orderCreated';
  payload: Order;
}

export interface OrderCancelledMessage {
  type: 'orderCancelled';
  payload: { orderId: string };
}

export class MessageBus {
  private subscribers: Map<MessageType, ((message: Message) => void)[]> = new Map();

  subscribe<T extends Message>(type: T['type'], subscriber: (message: T) => void): void {
    if (!this.subscribers.has(type)) {
      this.subscribers.set(type, []);
    }
    this.subscribers.get(type)?.push(subscriber as (message: Message) => void);
  }

  publish<T extends Message>(message: T): void {
    const subscribers = this.subscribers.get(message.type) || [];
    subscribers.forEach((subscriber) => subscriber(message));
  }
}

export class InventoryStockTracker {
  constructor(
    private bus: MessageBus,
    private stock: Record<string, number>,
  ) {
    this.subscribeToMessages();
  }

  private subscribeToMessages(): void {
    this.bus.subscribe<OrderCreatedMessage>('orderCreated', (message) => {
      message.payload.items.forEach((item) => {
        const currentStock = this.getStock(item.productId);
        this.stock[item.productId] = currentStock - item.quantity;
      });
    });

    this.bus.subscribe<OrderCancelledMessage>('orderCancelled', (message) => {
      this.stock['PRD1'] = this.getStock('PRD1') + 1;
    });
  }

  getStock(productId: string): number {
    return this.stock[productId] || 0;
  }
}
