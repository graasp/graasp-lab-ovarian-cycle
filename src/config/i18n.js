import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import en from '../locale/en';
import fr from '../locale/fr';

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
