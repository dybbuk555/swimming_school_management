/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 PRO React TS Base Styles
import colors from 'src/mui/assets/theme/base/colors';
import borders from 'src/mui/assets/theme/base/borders';
import boxShadows from 'src/mui/assets/theme/base/boxShadows';

// Material Dashboard 2 PRO React TS Helper Functions
import pxToRem from 'src/mui/assets/theme/functions/pxToRem';
import linearGradient from 'src/mui/assets/theme/functions/linearGradient';

const { transparent, gradients } = colors;
const { borderRadius } = borders;
const { colored } = boxShadows;

// types
type Types = any;

const stepper: Types = {
  styleOverrides: {
    root: {
      // background: linearGradient(
      //   gradients.info.main,
      //   gradients.info.state,
      // ),
      padding: `${pxToRem(19.2)} 0 ${pxToRem(12.8)}`,
      borderRadius: borderRadius.lg,
      // boxShadow: colored.info,

      '&.MuiPaper-root': {
        backgroundColor: transparent.main,
      },
    },
  },
};

export default stepper;
