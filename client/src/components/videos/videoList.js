import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { CONFIG } from "../../config";
import axios from "axios";
import Chip from "@material-ui/core/Chip";
import Menu from "../header/Menu";
import Badge from "@material-ui/core/Badge";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import Swal from "sweetalert2";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Spinner from "../misc/Spinner";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexWrap: "wrap",
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
    backgroundColor: "#b5b5b5",
    margin: 4,
    padding: "10px",
    borderRadius: "20px",
  },
});

export default function VideoList() {
  const classes = useStyles();

  const [videos, setVideos] = useState([]);
  const [pending, setPending] = useState(true);

  const [user, setuser] = useState("61631465a13ef518b1057995");

  const getVideos = async () => {
    await axios.get(CONFIG.HOST + "/videos/").then((response) => {
      setVideos(response.data);
      setPending(false);
    });
  };

  useEffect(() => {
    getVideos();
  }, []);

  const addvideo = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Add video",
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="name of video"/>' +
        '<input id="swal-input2" class="swal2-input" placeholder="tags of video"/>' +
        '<input id="swal-input3" class="swal2-input" placeholder="file"/>',
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        setPending(true);

        const video = {
          name: document.getElementById("swal-input1").value,
          tags: document.getElementById("swal-input2").value.split(","),
          file: document.getElementById("swal-input3").value,
          idUser: user,
        };

        return video;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(CONFIG.HOST + "/video/", result.value).then((response) => {
          console.log(response);
          getVideos();
        });
      }
    });
  };

  const toggleLike = async (video) => {
    setPending(true);
    await axios.post(CONFIG.HOST + "/like/", { idUser: user, idVideo: video._id }).then((response) => {
      getVideos();
    });
  };

  const handleChangeUser = (e) => {
    const { value } = e.target;
    setuser(value);
  };

  return (
    <div>
      {pending && <Spinner />}

      <div className={classes.top}>
        <form noValidate autoComplete="off">
          <Button variant="contained" color="secondary" onClick={addvideo}>
            Add Video
          </Button>
        </form>
        <TextField
          size="small"
          variant="filled"
          label="UserId"
          placeholder="idUser"
          name="idUser"
          value="61630453f19c950c42146836" //FIXME: quitar
          onChange={handleChangeUser}
        />
        <FormControl className={classes.search}>
          <InputLabel htmlFor="input-with-icon-adornment">Search Video</InputLabel>
          <Input
            startAdornment={
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      <div className={classes.container}>
        <Menu />
        {videos.map((video) => (
          <Card key={video.id} className={classes.card}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h2" variant="h6" className={classes.title}>
                  {video.name}
                </Typography>
                Tags:
                {video.tags.map((tag) => (
                  <Chip label={tag} color="primary" className={classes.chips} />
                ))}
                <Typography component="h2" variant="h6" className={classes.like}>
                  <Badge color="secondary" badgeContent={video.likes} showZero>
                    <ThumbUpAltIcon fontSize="large" onClick={() => toggleLike(video)} />
                  </Badge>
                </Typography>
              </CardContent>
            </div>
            <video width="320" height="240" controls>
              <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Card>
        ))}
      </div>
    </div>
  );
}
