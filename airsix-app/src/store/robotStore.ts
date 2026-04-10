import { create } from 'zustand';
import { Robot } from '../types/models';

type RobotState = {
  robots: Robot[];
  addRobot: (robot: Robot) => void;
  updateRobotState: (id: string, isOnline: boolean) => void;
};

export const useRobotStore = create<RobotState>((set) => ({
  robots: [
    {
      id: 'DEMO-R-1',
      name: 'Sentinel Démo',
      description: 'Robot de surveillance intérieur.',
      battery: 71,
      isOnline: true,
      lastKnownPosition: { x: 2.4, y: 7.8 },
      model3DPreview: '🛰️'
    },
    {
      id: 'DEMO-R-2',
      name: 'Lynx Cargo',
      description: 'Robot logistique léger.',
      battery: 38,
      isOnline: false,
      lastKnownPosition: { x: 8.1, y: 1.2 },
      model3DPreview: '🚜'
    }
  ],
  addRobot: (robot) => set((state) => ({ robots: [robot, ...state.robots] })),
  updateRobotState: (id, isOnline) =>
    set((state) => ({
      robots: state.robots.map((robot) => (robot.id === id ? { ...robot, isOnline } : robot))
    }))
}));
