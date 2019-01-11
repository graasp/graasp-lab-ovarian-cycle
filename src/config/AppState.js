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
  MAX_LH,
} from './constants';

// all the COMMON_DOTS are the identical coordinates
// for all our hormones paths
// there are located into our ./constants.js file
export const AppState = {
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
    [372, 985],
    COMMON_DOTS_1,
    COMMON_DOTS_0,
    COMMON_DOTS_2,
    COMMON_DOTS_3,
    COMMON_DOTS_4,
    [381, COMMON_DOTS_11],
    [383, MAX_LH],
  ],
  // ending state for the progesterone dots
  // starting state for the oestrogene dots
  oestrogenePoints: [
    [375, COMMON_DOTS_12],
    COMMON_DOTS_1,
    COMMON_DOTS_0,
    COMMON_DOTS_2,
    COMMON_DOTS_3,
    COMMON_DOTS_4,
    [455, COMMON_DOTS_11],
    [452, MAX_LH],
  ],
  // ending state for the oestrogene dots
  // starting state for the lh dots
  lhPoints: [
    [444, MAX_LH],
    [436, COMMON_DOTS_11],
    COMMON_DOTS_5,
    COMMON_DOTS_6,
    COMMON_DOTS_7,
    COMMON_DOTS_8,
    COMMON_DOTS_9,
    [463, COMMON_DOTS_12],
    COMMON_DOTS_10,
  ],
  // ending state for the oestrogene dots
  // starting state for the fsh dots
  fshPoints: [
    [392, MAX_LH],
    [COMMON_DOTS_11, 442],
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
