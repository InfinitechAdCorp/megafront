// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";

import townshipVideoData from "@/app/redux/slice/whatsNewVideos";
import propertyData from "@/app/redux/slice/propertyData";
import officeData from "@/app/redux/slice/officeData";
import closedDealsData from "@/app/redux/slice/closedDealsData";
import eventsData from "@/app/redux/slice/eventsData";
import meetingsData from "@/app/redux/slice/meetingData";
import ongoingInfrastructureData from "@/app/redux/slice/ongoingInfrastructureData";
import realEstateNewsData from "@/app/redux/slice/realestateNewsData";
import realEstateTipsData from "@/app/redux/slice/realestateTipsData";
import seminarsData from "@/app/redux/slice/seminarsData";
import careerData from "@/app/redux/slice/careerData";
import dashboardData from "@/app/redux/slice/dashboardData";
import locationData from "@/app/redux/slice/locationData";
import testimonialData from "@/app/redux/slice/testimonialData";
import agentData from "@/app/redux/slice/agentData";
import clientpropertyData from "@/app/redux/slice/clientpropertyData";

import clientappointmentData from "@/app/redux/slice/clientappointmentData";

const store = configureStore({
  reducer: {
    officeData: officeData,
    townshipVideo: townshipVideoData,
    propertyData: propertyData,
    closedDealsData: closedDealsData,
    eventsData: eventsData,
    meetingsData: meetingsData,
    ongoingInfrastructureData: ongoingInfrastructureData,
    realEstateNewsData: realEstateNewsData,
    realEstateTipsData: realEstateTipsData,
    seminarsData: seminarsData,
    careerData: careerData,
    dashboardData: dashboardData,
    locationData: locationData,
    testimonialData: testimonialData,
    agentData: agentData,
    clientappointmentData: clientappointmentData,
    clientpropertyData: clientpropertyData,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
