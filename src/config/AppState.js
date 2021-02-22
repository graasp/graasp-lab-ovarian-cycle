import {
  COMMON_DOTS_11,
  COMMON_DOTS_13,
} from './constants';

// all the COMMON_DOTS are the identical coordinates
// for all our hormones paths
// there are located into our ./constants.js file
export const AppState = {
  anchorEl: null,
  anchorElPituitary: null,
  anchorElHeart: null,
  anchorElOvary: null,
  showBrainTitle: false,
  open: false,
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
  delay: 2,
  dayCount: 0, // we initialize the day counter to 1
  // secreteLhFsh: false, // at the begening we do not secrete any hormones
  secreteLh: false,
  secreteFsh: false,
  secreteProgest: false,
  secreteOestro: false,
  // starting state for the progesterone dots
  progesteronePoints: [
    [420, 3000],
    [460, 2700],
    [550, 2300],
    [550, 1820],
    [550, 1220],
    [550, 700],
    [550, COMMON_DOTS_11],
    [500, 0],
  ],
  progesteronePoints2: [
    [420, 3000],
    [460, 2700],
    [550, 2300],
    [550, 1820],
    [550, 1220],
    [550, 700],
    [550, COMMON_DOTS_11],
    [450, 460],
    [350, 450],
    [230, 550],
    [110, 800],
    [35, 1050],
    // [500, 0],
  ],
  // ending state for the progesterone dots
  // starting state for the oestrogene dots
  oestrogenePoints: [
    [420, 3000],
    [460, 2700],
    [550, 2300],
    [550, 1800],
    [550, 1200],
    [550, 700],
    [720, 490],
    [720, COMMON_DOTS_13],
    [720, 0],
  ],
  oestrogenePoints2: [
    [420, 3000],
    [460, 2700],
    [550, 2300],
    [550, 1800],
    [550, 1200],
    [550, 700],
    [720, 490],
    [850, 450],
    [980, 505],
    [1150, 800],
    [1220, 1000],
    // [720, COMMON_DOTS_13],
    // [720, 0],
  ],
  // ending state for the oestrogene dots
  // starting state for the lh dots
  lhPoints: [
    [680, 0],
    [680, COMMON_DOTS_13],
    [665, 570],
    [600, 750],
    [665, 1200],
    [650, 1600],
    [630, 2200],
    [630, 2400],
    [760, 2700],
    [820, 3000],
  ],
  lhPoints2: [
    [680, 0],
    [680, COMMON_DOTS_13],
    [665, 570],
    // [870, 450],
    // [990, 525],
    // [1170, 850],
    // [1220, 1000],
  ],
  // ending state for the oestrogene dots
  // starting state for the fsh dots
  fshPoints: [
    [500, 0],
    [520, COMMON_DOTS_13],
    [570, 570],
    [600, 750],
    [665, 1250],
    [650, 1650],
    [630, 2200],
    [630, 2450],
    [760, 2750],
    [820, 3000],
  ],
  fshPoints2: [
    [500, 0],
    [520, COMMON_DOTS_13],
    [570, 570],
    [450, 460],
    [365, 440],
    [250, 500],
    [90, 850],
    [35, 1000],
  ],
  // ending state for the fsh dots
};

export default AppState;
