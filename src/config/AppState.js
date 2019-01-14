import {
  COMMON_DOTS_0,
  COMMON_DOTS_1,
  COMMON_DOTS_2,
  COMMON_DOTS_3,
  COMMON_DOTS_4,
  COMMON_DOTS_5,
  COMMON_DOTS_6,
  COMMON_DOTS_7,
  COMMON_DOTS_8,
  COMMON_DOTS_9,
  COMMON_DOTS_10,
  COMMON_DOTS_11,
  COMMON_DOTS_12,
  COMMON_DOTS_13,
  COMMON_DOTS_14,
  MAX,
} from './constants';

// all the COMMON_DOTS are the identical coordinates
// for all our hormones paths
// there are located into our ./constants.js file
export const AppState = {
  openModal: false,
  themeColor: '#2196F5',
  obserViewActive: true,
  postOvulation: false,
  preOvulation: false,
  ovulation: false,
  ovulationActive: false,
  postOvulationActive: false,
  preOvulationActive: false,
  isStarted: false,
  // we delay five seconds during the 13 and 14 days
  delay: 5,
  dayCount: 1, // we initialize the day counter to 1
  secreteLhFsh: false, // at the begening we do not secrete any hormones
  secreteProgest: false,
  secreteOestro: false,
  // starting state for the progesterone dots
  progesteronePoints: [
    [368, 850],
    COMMON_DOTS_1,
    COMMON_DOTS_0,
    COMMON_DOTS_2,
    COMMON_DOTS_3,
    COMMON_DOTS_4,
    [389, COMMON_DOTS_11],
    [384, COMMON_DOTS_13],
    [385, MAX],
  ],
  // ending state for the progesterone dots
  // starting state for the oestrogene dots
  oestrogenePoints: [
    [365, COMMON_DOTS_12],
    COMMON_DOTS_1,
    COMMON_DOTS_0,
    COMMON_DOTS_2,
    COMMON_DOTS_3,
    COMMON_DOTS_4,
    [390, COMMON_DOTS_11],
    [COMMON_DOTS_14, COMMON_DOTS_13],
    [COMMON_DOTS_14, MAX],
  ],
  // ending state for the oestrogene dots
  // starting state for the lh dots
  lhPoints: [
    [423, MAX],
    [419, COMMON_DOTS_13],
    [400, 325],
    [421, COMMON_DOTS_11],
    COMMON_DOTS_5,
    COMMON_DOTS_6,
    COMMON_DOTS_7,
    COMMON_DOTS_8,
    COMMON_DOTS_9,
    [453, COMMON_DOTS_12],
    COMMON_DOTS_10,
  ],
  // ending state for the oestrogene dots
  // starting state for the fsh dots
  fshPoints: [
    [392, MAX],
    [392, COMMON_DOTS_13],
    [410, 345],
    COMMON_DOTS_5,
    COMMON_DOTS_6,
    COMMON_DOTS_7,
    COMMON_DOTS_8,
    COMMON_DOTS_9,
    COMMON_DOTS_10,
  ],
  // ending state for the fsh dots
};

export default AppState;
