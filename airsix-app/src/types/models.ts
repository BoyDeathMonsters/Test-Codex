export type User = {
  id: string;
  email: string;
  displayName: string;
};

export type Robot = {
  id: string;
  name: string;
  description?: string;
  battery: number;
  isOnline: boolean;
  lastKnownPosition: { x: number; y: number };
  model3DPreview: string;
};

export type BluetoothDevice = {
  id: string;
  name: string;
  signal: number;
};
