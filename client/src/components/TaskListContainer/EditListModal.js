import React from "react";
import "./TaskList.css";
//Material UI
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { orange, blueGrey } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: orange[200],
    },
    secondary: {
      main: blueGrey[400],
    },
  },
});

export default function EditListModal({
  open,
  onClose,
  taskListId,
  taskListName,
  handleEditList,
}) {
  //Update Refs
  const nameField = React.useRef();
  const onHandleEditList = () => {
    handleEditList({
      taskListId: taskListId,
      listName: nameField.current.value,
    });
    onClose();
  };

  return (
    <div>
      <div>
        <ThemeProvider theme={theme}>
          <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog">Edit Task List</DialogTitle>
            <DialogContent>
              <div>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Task List Name"
                  type="text"
                  variant="outlined"
                  fullWidth
                  defaultValue={taskListName}
                  inputRef={nameField}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="secondary" variant="text">
                Cancel
              </Button>
              <Button
                onClick={onHandleEditList}
                color="secondary"
                variant="text"
              >
                Update
              </Button>
            </DialogActions>
          </Dialog>
        </ThemeProvider>
      </div>
    </div>
  );
}
