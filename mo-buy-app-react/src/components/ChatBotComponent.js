import React from "react";
import { Widget, addResponseMessage, addLinkSnippet } from "react-chat-widget";
//import "react-chat-widget/lib/styles.css";

class FloatingActionButtons extends React.Component {
  constructor() {
    super();
    this.state = {
      messageNum: 0,
      option: 0,
      companies: ["Apple", "Samsung", "Xiaomi", "Huawei", "LG"],
      products: [],
      tmpLst: [],
    };
  }
  async componentDidMount() {
    try {
      const resp = await fetch("/GetAllProductItem");
      if (!resp.ok) {
        // noinspection ExceptionCaughtLocallyJS
        throw Error(resp.statusText);
      }
      const products = await resp.json();
      this.setState({ products: products, messageNum: 1 });
    } catch (err) {
      console.log(err);
    }
    addResponseMessage(
      "Welcome to out MoBuy online store!please reply the number of the wanted option:\\n(1) Search phone\\n(2) Question about your bills \\n(3) Fixes service\\n(4) Something else"
    );
  }

  handleNewUserMessage = (newMessage) => {
    const { messageNum, option, companies, products, tmpLst } = this.state;
    switch (messageNum.toString()) {
      case "0": {
        addResponseMessage(
          "Welcome to out MoBuy online store!please reply the number of the wanted option:\\n(1) Search phone\\n(2) Question about your bills \\n(3) Fixes service\\n(4) Something else"
        );
        this.setState({ messageNum: 1 });
        break;
      }
      case "1": {
        var numbers = /^[0-9]+$/;
        if (
          !newMessage.match(numbers) ||
          parseInt(newMessage) < 1 ||
          parseInt(newMessage) > 4
        ) {
          addResponseMessage(`Come On ${newMessage}? type valid option`);
          break;
        } else {
          switch (parseInt(newMessage)) {
            case 1: {
              addResponseMessage("Which company you want?");
              this.setState({ messageNum: messageNum + 1, option: 1 });
              break;
            }
            case 2:
            case 3:
            case 4: {
              addResponseMessage("What is your phone number?");
              this.setState({ messageNum: messageNum + 1, option: 2 });
              break;
            }
          }
          break;
        }
      }
      case "2": {
        if (option === 1) {
          if (
            companies.findIndex(
              (item) => newMessage.toLowerCase() === item.toLowerCase()
            ) === -1
          ) {
            addResponseMessage(
              "Sorry, we do not have cellphones of this company. Try other company "
            );
            break;
          } else {
            let tmp = products.filter((item) => {
              return item.company.toLowerCase() === newMessage.toLowerCase();
            });
            console.log(tmp);
            this.setState({ tmpLst: tmp });
            addResponseMessage("What the high price you agree to pay?");
            this.setState({ messageNum: messageNum + 1 });
            break;
          }
        } else {
          var phoneno = /^\d{10}$/;
          if (newMessage.match(phoneno)) {
            addResponseMessage(
              "OK, out representative will call you soon. Have a good day!"
            );
            this.setState({ messageNum: 1 });
            addResponseMessage(
              "Welcome to out MoBuy online store!please reply the number of the wanted option:\\n(1) Search phone\\n(2) Question about your bills \\n(3) Fixes service\\n(4) Something else"
            );
            break;
          } else {
            addResponseMessage(
              `Come On ${newMessage}? type valid phone number`
            );
            break;
          }
        }
      }
      case "3": {
        var numbers = /^[0-9]+$/;
        if (!newMessage.match(numbers)) {
          addResponseMessage(`Come On {newMessage}? type valid price`);
          break;
        } else {
          let tmp = tmpLst.filter((item) => {
            return parseInt(item.price) <= parseInt(newMessage);
          });
          if (tmp[0].name === undefined)
            addResponseMessage(
              "Sorry, we do not have the phone you search for"
            );
          else {
            addLinkSnippet({
              title: tmp[0].name,
              link: "http://localhost:8080/ViewProductItem/" + tmp[0]._id + "/",
              target: "_blank",
            });
          }

          this.setState({ messageNum: 1 });
          addResponseMessage(
            "Welcome to out MoBuy online store!please reply the number of the wanted option:\\n(1) Search phone\\n(2) Question about your bills \\n(3) Fixes service\\n(4) Something else"
          );
          break;
        }
      }
    }
  };

  render() {
    return (
      <div className="App">
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          profileAvatar={"url(https://source.unsplash.com/random)"}
          title="MoBuy Chat"
          subtitle=""
        />
      </div>
    );
  }
}

export default FloatingActionButtons;
