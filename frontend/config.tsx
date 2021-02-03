import getConfig from "next/config";

const publicRuntimeConfig = getConfig();

publicRuntimeConfig.PRODUCTION = false;

export const API = publicRuntimeConfig.PRODUCTION
  ? "https://keepyourdistance.com"
  : "http://localhost:8000";
export const APP_NAME = publicRuntimeConfig.APP_NAME;
