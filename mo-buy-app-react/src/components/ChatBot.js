import React, { Component } from "react";
import PropTypes from "prop-types";
import ChatBot from "react-simple-chatbot";
import validatorP from "validator";

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      gender: "",
      age: "",
      phone_number: ""
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { name, company, age, phone_number } = steps;

    this.setState({ name, company, age, phone_number });
  }

  render() {
    const { name, company, age, phone_number } = this.state;
    return (
      <div style={{ width: "100%" }}>
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{name.value}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{company.value}</td>
            </tr>
            <tr>
              <td>Age</td>
              <td>{age.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object
};

Review.defaultProps = {
  steps: undefined
};

class SimpleForm extends Component {
  render() {
    return (
      <ChatBot
        steps={[
          {
            id: "1",
            message:
              "Hello, welcome to our MoBuy online store! Please choose one of the opions: ",
            trigger: "2"
          },
          {
            id: "2",
            options: [
              {
                value: "Search cellphone",
                label: "Search cellphone",
                trigger: "3"
              },
              {
                value: "Questions about bills",
                label: "Questions about bills",
                trigger: "4"
              },
              { value: "Fix service", label: "Fix service", trigger: "4" }
            ]
          },
          {
            id: "3",
            message: "Please choose the company from the follows:",
            trigger: "company"
          },
          {
            id: "4",
            message: "What is your phone number? Enter only number characters",
            trigger: "phone_number"
          },
          {
            id: "phone_number",
            user: true,
            trigger: "finish-call-you-message",
            validator: value => {
              if (validatorP.isMobilePhone(value)) {
                if (value < 0) return "It is not a phone number";
                return true;
              } else return `${value}? Come on! Enter a phone number`;
            }
          },
          {
            id: "finish-call-you-message",
            message:
              "OK, our representative will call you soon! Have a good day",
            end: true
          },
          {
            id: "company",
            options: [
              { value: "Apple", label: "Apple", trigger: "5" },
              { value: "Samsung", label: "Samsung", trigger: "5" },
              { value: "Xiaomi", label: "Xiaomi", trigger: "5" },
              { value: "Huawei", label: "Xiaomi", trigger: "5" },
              { value: "LG", label: "LG", trigger: "5" }
            ]
          },
          {
            id: "5",
            message: "What is the max price ?",
            trigger: "price"
          },
          {
            id: "price",
            user: true,
            trigger: "7",
            validator: value => {
              if (validatorP.isNumber(value)) {
                if (value < 0) return "It is not a price number";
                return true;
              } else return `${value}? Come on! Enter a number`;
            }
          },
          {
            id: "7",
            message: "Great! Check out your summary",
            trigger: "review"
          },
          {
            id: "review",
            component: <Review />,
            asMessage: true,
            trigger: "update"
          },
          {
            id: "update",
            message: "Would you like to update some field?",
            trigger: "update-question"
          },
          {
            id: "update-question",
            options: [
              { value: "yes", label: "Yes", trigger: "update-yes" },
              { value: "no", label: "No", trigger: "end-message" }
            ]
          },
          {
            id: "update-yes",
            message: "What field would you like to update?",
            trigger: "update-fields"
          },
          {
            id: "update-fields",
            options: [
              { value: "name", label: "Name", trigger: "update-name" },
              { value: "gender", label: "Gender", trigger: "update-gender" },
              { value: "age", label: "Age", trigger: "update-age" }
            ]
          },
          {
            id: "update-name",
            update: "name",
            trigger: "7"
          },
          {
            id: "update-gender",
            update: "gender",
            trigger: "7"
          },
          {
            id: "update-age",
            update: "age",
            trigger: "7"
          },
          {
            id: "end-message",
            message: "Thanks! Your data was submitted successfully!",
            end: true
          }
        ]}
      />
    );
  }
}

export default SimpleForm;
