const production = false;

const liveHost = 'https://www.baitportal.com/api/app/Level';
const liveFiles = '';
const MusementApplicationValue = 'baitportal-fqzafpr94k';

const testHost = 'https://www.baitportal.com/public/api/common';
const testFiles = 'https://www.baitportal.com/public/storage/';

const musementAPIV = '3.4.0';

export class Config {
  static MusementApplicationValue = MusementApplicationValue;
  static appName = 'Baitportal';
  static musementAPIVERSION = '3.4.0';
  static musementClientID =
    '119_4webybh4kccg8gws88gsw08gg8ggc0w4g8gcwg0s440sw0ssco';
  static musementSecret = '5cz0rnosaq0444gccgo4ggw8o0cgkkswowo4kcs00cccw8o84k';
  static AppHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  static musementAPIHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-musement-application': MusementApplicationValue,
    'x-musement-version': musementAPIV,
    'x-musement-currency': localStorage.getItem('curr') ?? 'USD',
  };
  static Languages = [
    {code: 'en', title: 'English'},
    {code: 'es', title: 'Spanish'},
    {code: 'fr', title: 'French'},
    {code: 'it', title: 'Italian'},
    {code: 'nl', title: 'Netherlands (Dutch)'},
    {code: 'pl', title: 'Polish'},
    {code: 'pt', title: 'Portuguese'},
    {code: 'ru', title: 'Russian '},
  ];
  static default_language = {code: 'en', title: 'English'};
  static baseUrl = production ? liveHost : testHost;
  static url = production ? liveFiles : testFiles;
  // static musementAPI = 'https://api.musement.com/api/v3';
  static musementAPI = 'https://fe-apiproxy.musement.com';
  // static musementSandboxAPI = 'https://sandbox.musement.com/api/v3';
  static baitportalAPI = 'https://baitportal.adm-devs.com/api';
  static getActivities = this.baseUrl + '/get_activities';
  static getTours = this.baseUrl + '/get_offers_by_location';
  static getCities = this.baseUrl + '/get_location';

  static userCurrency = {
    id: '0',
    title: 'USD Dollar',
    sign: '$',
    currency: 'USD',
  };
}

export default Config;
