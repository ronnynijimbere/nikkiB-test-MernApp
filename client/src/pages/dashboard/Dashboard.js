import React from "react";
import { useHistory } from "react-router-dom";
//Styles Import
import "../../App.css";
import "./Dashboard.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//Icon Import
import { IconContext } from "react-icons";
import { FiPlus } from "react-icons/fi";
//Material UI
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
//Components Import
import TaskListContainer from "../../components/TaskListContainer/TaskListContainer.js";
import axios from "axios";

//STYLES
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

//FUNCTIONS
export default function Dashboard() {
  ////////////////////////UI FUNCTIONS///////////////////////
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  ////////////////////// USER FUNCTIONS////////////////////////
  const [user, setUser] = React.useState(null);
  const [username, setUsername] = React.useState("");
  const history = useHistory();

  //Get user data
  React.useEffect(() => {
    axios
      .get(`/api/dashboard`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
        setUsername(res.data.username);
      })
      .catch((err) => {
        // window.location.replace('/login'); // Comment back into code when finished
      });
  }, []);

  //Logout user
  const handleLogout = () => {
    axios
      .get(`/api/logout`, {
        withCredentials: true,
      })
      .then(() => history.push("/login"))
      .catch((err) => console.log(err));
  };

  ///////////////////////CRUD FUNCTIONS////////////////////////////

  function deepCopyTaskLists(taskLists) {
    const newTaskLists = [];
    taskLists.forEach((taskList) => {
      newTaskLists.push({
        ...taskList,
        listItems: taskList.listItems,
      });
    });
    return newTaskLists;
  }

  //ADD new task and UPDATE database
  function handleAddTaskListItem(taskData) {
    const newList = deepCopyTaskLists(user.taskLists);
    const targetTaskList = newList.find(
      (taskList) => taskList._id === taskData.taskListId
    );
    targetTaskList.listItems.push({
      task: taskData.task,
      priority: taskData.priority,
      notes: taskData.notes,
      completed: false,
    });
    const updateTaskList = {
      userId: user._id,
      taskLists: user.taskLists,
    };
    updateUser(updateTaskList);
  }

  //ADD new List and UPDATE database
  function handleAddTaskList() {
    const targetUser = user;
    targetUser.taskLists.push({
      listName: "New Task List",
      listItems: [
        {
          task: "Example Task",
          priority: 1,
          notes: "Extra information about the task",
          completed: false,
        },
      ],
    });
    const updateTaskList = {
      userId: user._id,
      taskLists: user.taskLists,
    };
    updateUser(updateTaskList);
  }

  //EDIT Task List
  function handleEditList({ taskListId, listName }) {
    const newTaskList = deepCopyTaskLists(user.taskLists);
    const targetTaskList = newTaskList.find(
      (taskList) => taskList._id === taskListId
    );
    targetTaskList.listName = listName;
    const updateTaskList = {
      userId: user._id,
      taskLists: newTaskList,
    };
    updateUser(updateTaskList);
  }

  //EDIT Task Item
  function handleEditTask({ taskListId, taskId, priority, task, notes }) {
    const newTaskList = deepCopyTaskLists(user.taskLists);
    const targetTaskList = newTaskList.find(
      (taskList) => taskList._id === taskListId
    );
    const targetListItem = targetTaskList.listItems.find(
      (listItem) => listItem._id === taskId
    );
    targetListItem.task = task;
    targetListItem.priority = priority;
    targetListItem.notes = notes;

    const updateTaskList = {
      userId: user._id,
      taskLists: newTaskList,
    };
    updateUser(updateTaskList);
  }

  //DELETE Task List
  function handleDeleteTaskList({ taskListId }) {
    const newTaskLists = user.taskLists.filter(
      (taskList) => taskListId !== taskList._id
    );

    const updateTaskList = {
      userId: user._id,
      taskLists: newTaskLists,
    };
    updateUser(updateTaskList);
  }

  //DELETE Task Item
  function handleDeleteTask({ taskListId, idList }) {
    const newList = deepCopyTaskLists(user.taskLists);
    const targetTaskList = newList.find(
      (taskList) => taskList._id === taskListId
    );
    targetTaskList.listItems = targetTaskList.listItems.filter(
      (listItem) => !idList.some((id) => id === listItem._id)
    );

    const updateTaskList = {
      userId: user._id,
      taskLists: newList,
    };
    updateUser(updateTaskList);
  }

  //Update User on DB
  function updateUser(updateItem) {
    axios({
      url: "/api/dashboard/update",
      method: "PUT",
      data: updateItem,
    })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }

  return user ? (
    <div className="parentWrapper">
      <div className={classes.root}>
        <CssBaseline />
        <Container className="menuWrapper">
          <Row>
            <Col>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
            </Col>
          </Row>
        </Container>

        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {["Account", "Settings", "Notifications"].map((
              text,
              index //
            ) => (
              <ListItem button key={text}>
                <Tooltip title="Not Scripted">
                  <ListItemText primary={text} />
                </Tooltip>
              </ListItem>
            ))}
          </List>
          <Divider />
          <div className="drawerBtn">
            <button className="orangeButton" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </Drawer>

        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <Container className="dashboardWrapper">
            <Row className="dashboardHeader">
              <Col>
                <h1>Hi, {username}</h1>
              </Col>
            </Row>
            <Row className="taskListWrapper">
              <TaskListContainer
                taskLists={user.taskLists}
                handleAddTask={handleAddTaskListItem}
                handleDeleteTask={handleDeleteTask}
                handleDeleteTaskList={handleDeleteTaskList}
                handleEditList={handleEditList}
                handleEditTask={handleEditTask}
              />

              <IconContext.Provider value={{ className: "plusIcon" }}>
                <Col className="addListCol">
                  <Tooltip title="Add new list">
                    <button onClick={handleAddTaskList}>
                      <FiPlus />
                    </button>
                  </Tooltip>
                </Col>
              </IconContext.Provider>
            </Row>
          </Container>
        </main>
      </div>
    </div>
  ) : null;
}
