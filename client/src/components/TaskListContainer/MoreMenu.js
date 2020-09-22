import React from "react";
//Material UI
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
//Component Import
import EditListModal from "./EditListModal";

export default function MoreMenu({
  handleDeleteTaskList,
  handleEditList,
  taskListId,
  taskListName,
}) {
  //Menu Open/Close Handle
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Edit Modal Open/Close handle
  const [openEditModal, setOpenEditModal] = React.useState(false);

  const handleModalOpen = () => {
    setOpenEditModal(true);
  };

  const handleModalClose = () => {
    setOpenEditModal(false);
  };

  //Delete Task List handle
  const onHandleDeleteTaskList = () => {
    handleDeleteTaskList({
      taskListId: taskListId,
    });
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleModalOpen}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit List" />
        </MenuItem>
        <MenuItem onClick={onHandleDeleteTaskList}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete list" />
        </MenuItem>
      </Menu>
      <EditListModal
        taskListId={taskListId}
        taskListName={taskListName}
        open={openEditModal}
        onClose={handleModalClose}
        handleEditList={handleEditList}
      />
    </div>
  );
}
