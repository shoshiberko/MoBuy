import React from "react";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import ReactDOM from "react-dom";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import $ from "jquery";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
  },
}));

let listComments = [
  {
    name: "Matt",
    avatar: "https://react.semantic-ui.com/images/avatar/small/matt.jpg",
    time: "20.07.2020, 10:30",
    text: "How artistic!",
    rating: "5",
  },
  {
    name: "Elliot Fu",
    avatar: "https://react.semantic-ui.com/images/avatar/small/elliot.jpg",
    time: "20.01.2020, 17:28",
    text: "This has been very useful for my research. Thanks as well!",
    rating: "2.5",
  },
  {
    name: "Jenny Hess",
    avatar: "https://react.semantic-ui.com/images/avatar/small/jenny.jpg",
    time: "01.08.2020, 23:00",
    text: "Elliot you are always so right :)",
    rating: "0.5",
  },
];

const OurCommants = ({ list }) => {
  const classes = useStyles();
  return (
    <div>
      {list !== undefined &&
        list.map((item) => (
          <Paper elevation={3}>
            <Comment>
              {item.avatar.length === 1 ? (
                <Avatar>{item.avatar}</Avatar>
              ) : (
                <Avatar src={item.avatar} />
              )}
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
          </Paper>
        ))}
    </div>
  );
};

function CommentExampleComment({ product }) {
  //state = { name: "", textArea: "", rating: 0 };

  /*async componentDidMount() {
    try {
      const resp = await fetch("/GetProductItem?Id=" + this.params.productId);
      if (!resp.ok) {
        // noinspection ExceptionCaughtLocallyJS
        throw Error(resp.statusText);
      }
      const product = await resp.json();
      this.setState({ CommentsList: product.commentsList });
    } catch (err) {
      console.log(err);
    }
  }*/
  const [rating, SetRating] = React.useState(0);
  const [commentText, SetCommentText] = React.useState("");
  const [commentsList, SetCommentsList] = React.useState(product.commentsList);
  const handleChange = (e, { name, value }) => {
    SetCommentText(value);
  };
  const handleChangeRating = (e, value) => {
    SetRating(value);
  };

  const forceUpdateHandler = () => {
    alert(product._id);
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
    alert(product.name);
    let comment = {
      emailAddress: sessionStorage.getItem("userEmail"), //name+image
      time: time,
      text: commentText,
      rating: rating,
    };

    var data = {
      productId: product._id,
      comment: comment,
    };
    $.ajax({
      type: "POST",
      url: "/AddCommentToProduct",
      data: data,
    })
      .done(function(data) {
        SetCommentsList(commentsList.concat([data]));
      })
      .fail(function(jqXhr) {});
    SetCommentText("");
    SetRating(0);
  };
  return (
    <Comment.Group id="commentsList">
      <Header as="h3" dividing>
        Comments
      </Header>
      <OurCommants list={commentsList} />
      <Form reply>
        <Form.Field>
          <Rating
            name="rating"
            value={rating}
            precision={0.5}
            onChange={handleChangeRating}
          />
        </Form.Field>
        <Form.TextArea
          placeholder="You have a comment?"
          name="commentText"
          value={commentText}
          onChange={handleChange}
        />
        <Button
          content="Add Comment"
          labelPosition="left"
          icon="edit"
          onClick={forceUpdateHandler}
          primary
        />
      </Form>
    </Comment.Group>
  );
}

export default CommentExampleComment;
