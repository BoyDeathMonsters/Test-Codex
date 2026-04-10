import { BluetoothDevice, Robot } from '../types/models';

const availableDevices: BluetoothDevice[] = [
  { id: 'RBT-ALPHA-01', name: 'Rover Alpha', signal: -42 },
  { id: 'RBT-SIX-19', name: 'AirSix Scout', signal: -56 },
  { id: 'RBT-MULE-07', name: 'Mule Recon', signal: -61 }
];

export const bluetoothService = {
  async scan(): Promise<BluetoothDevice[]> {
    await new Promise((r) => setTimeout(r, 800));
    return availableDevices;
  },

  async pairDevice(device: BluetoothDevice, customName: string, description: string): Promise<Robot> {
    await new Promise((r) => setTimeout(r, 600));
    return {
      id: device.id,
      name: customName || device.name,
      description,
      battery: Math.floor(Math.random() * 45) + 55,
      isOnline: true,
      lastKnownPosition: { x: Number((Math.random() * 10).toFixed(1)), y: Number((Math.random() * 10).toFixed(1)) },
      model3DPreview: '🤖'
    };
  }
};
