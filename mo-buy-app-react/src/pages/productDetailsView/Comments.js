import React from "react";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import ReactDOM from "react-dom";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > * + *": {
      marginTop: theme.spacing(1)
    }
  }
}));

let listComments = [
  {
    name: "Matt",
    avatar: "https://react.semantic-ui.com/images/avatar/small/matt.jpg",
    time: "20.07.2020, 10:30",
    text: "How artistic!",
    rating: "5"
  },
  {
    name: "Elliot Fu",
    avatar: "https://react.semantic-ui.com/images/avatar/small/elliot.jpg",
    time: "20.01.2020, 17:28",
    text: "This has been very useful for my research. Thanks as well!",
    rating: "2.5"
  },
  {
    name: "Jenny Hess",
    avatar: "https://react.semantic-ui.com/images/avatar/small/jenny.jpg",
    time: "01.08.2020, 23:00",
    text: "Elliot you are always so right :)",
    rating: "0.5"
  }
];

const OurCommants = () => {
  const classes = useStyles();
  let i = 0;
  return (
    <div>
      {listComments.map(item => (
        <Comment>
          <Comment.Avatar src={item.avatar} />
          <Comment.Content>
            <Comment.Author as="a">{item.name}</Comment.Author>
            <Comment.Metadata>
              <div>{item.time}</div>
              <div className={classes.root}>
                {" "}
                <Rating
                  name="half-rating"
                  defaultValue={item.rating}
                  precision={0.5}
                  readOnly
                />
              </div>
            </Comment.Metadata>
            <Comment.Text>{item.text}</Comment.Text>
          </Comment.Content>
        </Comment>
      ))}
    </div>
  );
};

class CommentExampleComment extends React.Component {
  //state = { name: "", textArea: "", rating: 0 };
  constructor() {
    super();
    this.state = { name: "", textArea: "", rating: 0 };
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeRating = this.handleChangeRating.bind(this);
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };
  handleChangeRating = (e, value) => {
    this.setState({ rating: value });
  };

  forceUpdateHandler() {
    const { name, textArea, rating } = this.state;
    let nowDate = new Date();
    let day = nowDate.getDate();
    if (day < 10) day = "0" + day;
    let month = nowDate.getMonth() + 1;
    if (month < 10) month = "0" + month;
    let hour = nowDate.getHours();
    if (hour < 10) hour = "0" + hour;
    let minutes = nowDate.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;
    let time =
      day +
      "." +
      month +
      "." +
      nowDate.getFullYear() +
      ", " +
      hour +
      ":" +
      minutes;
    if (!name) {
      const str =
        "https://onlinelearninginsights.files.wordpress.com/2012/06/facebook-avatar.png";
      listComments.push({
        name: "Anonymous",
        avatar: str,
        time: time,
        text: textArea,
        rating: rating
      });
    } else {
      const str =
        "https://react.semantic-ui.com/images/avatar/small/" +
        name.split(" ")[0].toLowerCase() +
        ".jpg";
      listComments.push({
        name: name,
        avatar: str,
        time: time,
        text: textArea,
        rating: rating
      });
    }
    this.forceUpdate();
    this.setState({ name: "", textArea: "", rating: 0 });
  }
  render() {
    const { name, textArea, rating } = this.state;
    return (
      <Comment.Group id="commentsList">
        <Header as="h3" dividing>
          Comments
        </Header>
        <OurCommants />
        <Form reply>
          <Form.Field>
            <Form.Input
              type="text"
              placeholder="Who are you?"
              name="name"
              value={name}
              onChange={this.handleChange}
            ></Form.Input>
            <Rating
              name="rating"
              value={rating}
              precision={0.5}
              onChange={this.handleChangeRating}
            />
          </Form.Field>
          <Form.TextArea
            placeholder="You have a comment?"
            name="textArea"
            value={textArea}
            onChange={this.handleChange}
          />
          <Button
            content="Add Comment"
            labelPosition="left"
            icon="edit"
            onClick={this.forceUpdateHandler}
            primary
          />
        </Form>
      </Comment.Group>
    );
  }
}

export default CommentExampleComment;
