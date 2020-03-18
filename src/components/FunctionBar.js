import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Switch from "@material-ui/core/Switch";
import {FormControlLabel} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  colorSecondary: {
    backgroundColor: '#55153e',

  }

}));

export default function FunctionBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color={classes.colorSecondary}>
        <Toolbar>
          <FormControlLabel
            control={
              <Switch
                value={props.stream}
                onChange={props.toggleStream}
              />}
            label={"Stream"}
          />
          <Button type="primary" onClick={props.download}>Download</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}