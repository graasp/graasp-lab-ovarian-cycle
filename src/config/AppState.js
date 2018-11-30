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
  MAX_LH,
} from './constants';

// all the COMMON_DOTS are the identical coordinates
// for all our hormones paths
// there are located into our ./constants.js file
export const AppState = {
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
    COMMON_DOTS_0,
    COMMON_DOTS_1,
    COMMON_DOTS_2,
    COMMON_DOTS_3,
    COMMON_DOTS_4,
    [382, 400],
    [383, 260],
  ],
  // ending state for the progesterone dots
  // starting state for the oestrogene dots
  oestrogenePoints: [
    [375, MAX_LH],
    COMMON_DOTS_0,
    COMMON_DOTS_1,
    COMMON_DOTS_2,
    COMMON_DOTS_3,
    COMMON_DOTS_4,
    [470, 400],
    [472, 260],
  ],
  // ending state for the oestrogene dots
  // starting state for the lh dots
  lhPoints: [
    [458, 260],
    [448, 400],
    COMMON_DOTS_5,
    COMMON_DOTS_6,
    COMMON_DOTS_7,
    COMMON_DOTS_8,
    COMMON_DOTS_9,
    COMMON_DOTS_10,
    [485, 1070],
    [482, MAX_LH],
  ],
  // ending state for the oestrogene dots
  // starting state for the fsh dots
  fshPoints: [
    [394, 260],
    [404, 400],
    COMMON_DOTS_5,
    COMMON_DOTS_6,
    COMMON_DOTS_7,
    COMMON_DOTS_8,
    COMMON_DOTS_9,
    COMMON_DOTS_10,
    [375, MAX_LH],
  ],
  // ending state for the fsh dots
};

export default AppState;
