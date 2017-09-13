import { TrackingState } from './tracking-state';

export interface ITrackable {
    trackingState: TrackingState;
    modifiedProperties: Set<string>;
}
