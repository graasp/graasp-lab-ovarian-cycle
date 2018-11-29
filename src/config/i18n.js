import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import en from '../locale/en';
import fr from '../locale/fr';
// this is our main internationalization file
// configuration for the react-i18next
// we return english as default by passing 'en' params
// to the fallbackLng function
// all our translation files are in the ./locale directory
i18n
  .use(reactI18nextModule)
  .init({
    resources: {
      en,
      fr,
    },
    fallbackLng: 'en',
    debug: true,
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
    react: {
      wait: true,
    },
  });
export default i18n;
