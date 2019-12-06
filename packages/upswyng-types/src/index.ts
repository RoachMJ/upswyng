import React from "react";

export type TDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface TLegacyResource {
  address1: string;
  address2: string;
  approved: 0 | 1;
  category: string;
  charityname: string;
  city: string;
  closeschedule: TLegacyCloseSchedule[];
  description: string;
  kudos: number;
  lat: number;
  lng: number;
  phone: string;
  schedule: TLegacySchedule[];
  selectedAll: boolean;
  service: string;
  servicetype: string;
  showflag: boolean;
  state: string;
  updateshelter: string;
  useremail: string;
  userid: string;
  website: string;
  zip: string;
}

export interface TAddress {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
}

export interface TCategory {
  _id: string;
  color: string;
  createdAt: Date;
  lastModifiedAt: Date;
  name: string;
  stub: string;
  subcategories?: TSubcategory[];
}

export interface TSubcategory {
  _id: string;
  createdAt: Date;
  lastModifiedAt: Date;
  name: string;
  parentCategory: TCategory;
  resources?: TResource[]; // not returned unless specifically asked for
  stub: string;
}

export interface TResource {
  _id: string; // DO NOT normally reference this, use `id`
  address: TAddress;
  createdBy?: TUser; // id of the user who created this
  closeSchedule: TCloseSchedule[];
  createdAt: Date;
  deleted: boolean; // We leave entries in the DB so they don't get resynced from Strapped, but for all intents & purposes this resource doesn't exist.
  description: string;
  id: string; // this is NOT the ID auto-generated by Mongoose (_id), this is the canonical upswyng id for the resource
  kudos: number;
  lastModifiedAt: Date;
  lastModifiedBy?: TUser;
  latitude: number | null;
  legacyId?: string; // ID from strappd
  longitude: number | null;
  name: string;
  phone: string;
  schedule: TSchedule[];
  services: string[]; // maps from servicetype
  subcategories: TSubcategory[];
  website: string;
}

// Data needed to create a new resource; these fields will be automatically
// assigned upon creation
export type TNewResource = Omit<
  TResource,
  | "_id"
  | "createdAt"
  | "deleted"
  | "id"
  | "kudos"
  | "legacyId"
  | "lastModifiedAt"
>;

export interface TIconProps {
  color?: string;
}

export enum TStatusFetch {
  STATUS_NOT_FETCHED = "NOT_FETCHED",
  STATUS_FETCHING = "FETCHING",
  STATUS_FETCH_SUCCESS = "FETCH_SUCCESS",
  STATUS_FETCH_ERROR = "FETCH_ERROR",
}

interface TScheduleBase {
  _id?: string;
  day?: TDay;
  date?: string;
  period?: TSchedulePeriod;
  from?: string;
  to?: string;
}

export interface TSchedule extends TScheduleBase {
  scheduleType: TScheduleType;
}

export type TScheduleType = "Weekly" | "Monthly" | "Open 24/7" | "Date Range";
export type TCloseScheduleType = TScheduleType | "Permanently Closed";

export interface TCloseSchedule extends TScheduleBase {
  scheduleType: TCloseScheduleType;
}

interface TLegacyScheduleBase {
  day: TDay;
  date: string;
  period?: TSchedulePeriod;
  fromstring: string;
  tostring: string;
}

export interface TLegacySchedule extends TLegacyScheduleBase {
  type: TScheduleType;
}

interface TLegacyCloseSchedule extends TLegacyScheduleBase {
  type: TCloseScheduleType;
}

export type TSchedulePeriod =
  | "Last"
  | "First"
  | "Second"
  | "Third"
  | "Fourth"
  | "Fifth";

interface THomeButtonBase {
  color: string;
  icon: React.ComponentType<TIconProps>;
  text: string;
}
export interface THomeButtonAnchor extends THomeButtonBase {
  href: string;
}

export interface THomeButtonRouterLink extends THomeButtonBase {
  linkState: string;
}

export interface THotline {
  _id: string;
  // TODO: Add Schedule
  chatWebsite: string;
  createdAt: Date;
  description: string;
  lastModifiedAt: Date;
  name: string;
  phone: string;
  text: string; // ex: "Text to 838255",
  website: string;
}

export interface TUser {
  id: string; // database ObjectId converted to hex string
  name?: string;
  email: string;
  providers: ("facebook" | "google")[];
  isAdmin: boolean;
  isSuperAdmin: boolean;
}