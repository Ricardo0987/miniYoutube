import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { CONFIG } from "../../config";
import axios from "axios";
import Chip from "@material-ui/core/Chip";
import Badge from "@material-ui/core/Badge";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import Swal from "sweetalert2";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Spinner from "../misc/Spinner";
import { reactLocalStorage } from "reactjs-localstorage";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    minWidth: 275,
    margin: 10,
    padding: 5,
  },
  chips: {
    marginLeft: 2,
  },
  like: {
    marginTop: 22,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    margin: 4,
  },
  top: {
    fontSize: 30,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    margin: 4,
    padding: "10px",
    borderRadius: "20px",
    width: "95%",
  },
  titleMenu: {
    flexGrow: 1,
  },
});

export default function VideoList() {
  const classes = useStyles();

  const [videos, setVideos] = useState([]);
  const [videoSearch, setVideoSearch] = useState();
  const [pending, setPending] = useState(true);
  const [user, setuser] = useState();

  const getVideos = async () => {
    await axios.get(CONFIG.HOST + "/videos/").then((response) => {
      setVideos(response.data);
      setPending(false);
    });
  };
  const getUSers = async () => {
    await axios.get(CONFIG.HOST + "/users/");
  };

  useEffect(() => {
    getVideos();
    getUSers();
    if (reactLocalStorage.get("user") && reactLocalStorage.get("idUser")) {
      setuser({ userName: reactLocalStorage.get("user"), idUser: reactLocalStorage.get("idUser") });
    }
  }, []);

  useEffect(() => {
    newUser();
  });

  const newUser = () => {
    if (!reactLocalStorage.get("user")) {
      Swal.fire({
        title: "Identify",
        html: '<input id="swal-input1" class="swal2-input" placeholder="nickname"/>',
        focusConfirm: false,
        allowOutsideClick: false,
        preConfirm: () => {
          let name = document.getElementById("swal-input1").value;
          if (!name) {
            Swal.showValidationMessage("input missing");
          }

          return { userName: name };
        },
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(CONFIG.HOST + "/user/", result.value).then((response) => {
            const { userName, idUser } = response.data;
            reactLocalStorage.set("user", userName);
            reactLocalStorage.set("idUser", idUser);
            setuser({ userName: userName, idUser: idUser });
            getVideos();
          });
        }
      });
    }
  };
  const logOut = () => {
    reactLocalStorage.remove("user");
    reactLocalStorage.remove("idUser");
    setuser();
  };

  const addvideo = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Add video",
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="name of video"/>' +
        '<input id="swal-input2" class="swal2-input" placeholder="tags separate by comma"/>' +
        '<input id="swal-input3" type="file"  accept="video/*" placeholder="file"/>',
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const video = {
          name: document.getElementById("swal-input1").value,
          tags: document.getElementById("swal-input2").value,
          file: document.getElementById("swal-input3").files[0],
          idUser: user.idUser,
        };
        if (!video.name || !video.tags || !video.file) {
          Swal.showValidationMessage("input missing");
        } else {
          return video;
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setPending(true);
        let formData = new FormData();
        console.log(result.value.file);
        formData.append("file", result.value.file);
        formData.append("name", result.value.name);
        formData.append("tags", result.value.tags);
        formData.append("idUser", result.value.idUser);
        axios
          .post(CONFIG.HOST + "/video/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            getVideos();
            setPending(false);
          });
      }
    });
  };

  const toggleLike = async (video) => {
    await axios.post(CONFIG.HOST + "/like/", { idUser: user.idUser, idVideo: video._id }).then((response) => {
      getVideos();
    });
  };

  const handleChangeSearch = (e) => {
    const { value } = e.target;
    setVideoSearch(value);
    if (value.length === 0) {
      getVideos();
    }
  };

  const videoSearchAction = (e) => {
    setPending(true);

    axios.post(CONFIG.HOST + "/videos/search", { strSearch: videoSearch }).then((response) => {
      setVideos(response.data);
      setPending(false);
    });
  };

  return (
    <div>
      {pending && <Spinner />}
      <AppBar position="fixed">
        <Toolbar>
          <div className={classes.top}>
            <form noValidate autoComplete="off">
              <Button variant="contained" color="secondary" onClick={addvideo}>
                Add Video
              </Button>
            </form>
            <FormControl className={classes.search}>
              <Input
                placeholder="Search Video"
                onChange={handleChangeSearch}
                startAdornment={
                  <InputAdornment position="end">
                    <Button color="default" onClick={videoSearchAction}>
                      <SearchIcon />
                    </Button>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          {user && (
            <Button color="inherit" onClick={logOut}>
              <Avatar>{user.userName.substr(0, 2)}</Avatar>
              LogOut <ExitToAppIcon />
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <div className={classes.container}>
        {videos.map((video) => (
          <Card key={video.file} className={classes.card}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h2" variant="h6" className={classes.title}>
                  {video.name}
                </Typography>
                Tags:
                {video.tags.map((tag, index) => (
                  <Chip key={index} label={tag} color="primary" className={classes.chips} />
                ))}
                <Typography component="h2" variant="h6" className={classes.like}>
                  <Badge color="secondary" badgeContent={video.likes} showZero>
                    <ThumbUpAltIcon fontSize="large" onClick={() => toggleLike(video)} />
                  </Badge>
                </Typography>
              </CardContent>
            </div>
            <video width="320" height="240" controls>
              <source src={CONFIG.HOST + "/uploads/" + video.file} />
              Your browser does not support the video tag.
            </video>
          </Card>
        ))}
      </div>
    </div>
  );
}
