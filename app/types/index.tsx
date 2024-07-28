export type RootStackParamList = {
  site_details: {
    id: string;
    Name: string;
    Description: string;
    OpeningHours: string;
    Latitude: number;
    Longitude: number;
  };
  index: undefined;
  signup_page: undefined;
  directory: undefined;
  events: undefined;
  map: undefined;
  qr_scanner: undefined;
  guided_tour: undefined;
  forum: undefined;
  event_details: {
    id: string;
    eventName: string;
    location: string;
    description: string;
    time: string;
  };  
  tourguide_directory: undefined;
  tourguide_details: {
    id: string;
    name: string;
    description: string;
    rate: string;
  }
};
