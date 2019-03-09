// Main structure
export interface GoApiResponse {
  buses: BusStructure;
  lastUpdated: string;
  stations: StationStructure;
  totalUpdates: number;
  trains: TrainStructure;
}

// Error structure
export interface GoApiResponseFailure {
  headers: { normalizedNames: {}, lazyUpdate: any, headers: any };
  status: number;
  statusText: string;
  url: string;
  ok: boolean;
  name: string;
  message: string;
  error: { isTrusted: boolean };
}

// Buses
export interface BusStructure {
  status: string;
  totalUpdates: number;
  bus: Array<Bus>;
}

export interface Bus {
  notifications;
  status: string;
  totalUpdates: number;
}


// Stations
export interface StationStructure {
  station: Array<Station>;
  status: string;
  totalUpdates: number;
}

export interface Station {
  notifications: StationNotification;
  stationCode: string;
  stationName: string;
  status: string;
  totalUpdates: number;
}

export interface StationNotification {
  code: string;
  messageBody: string;
  messageSubject: string;
  name: string;
  postedDateTime: string;
  serviceMode: string;
  status: string;
  subCategory: string;
  tripNumbers;
}


// Trains
export interface TrainStructure {
  status: string;
  totalUpdates: number;
  train: Array<Train>;
}

export interface Train {
  corridorCode: string;
  corridorName: string;
  notifications: TrainNotificationStructure;
  saagNotifications;
  status: string;
  totalUpdates: number;
}

export interface TrainNotificationStructure {
  notification: Array<TrainNotification>;
}

export interface TrainNotification {
  SubCategory: string;
  Code: string;
  Name: string;
  MessageSubject: string;
  MessageBody: string;
  PostedDateTime: string;
  Status: string;
  ServiceMode: string;
  TripNumbers: Array<string>;
}

