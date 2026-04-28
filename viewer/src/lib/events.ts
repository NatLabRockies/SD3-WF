import { type FeederComponent } from "./feeder";
export interface ComponentSelectEvent extends MouseEvent {
  targetComponent?: FeederComponent;
};
