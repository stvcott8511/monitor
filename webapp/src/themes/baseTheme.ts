import { Theme } from '@material-ui/core/styles';

export interface BaseTheme extends Theme {
  status: {
    info: string;
    low: string;
    medium: string;
    high: string;
  };
}