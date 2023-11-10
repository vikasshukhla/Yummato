import { createChatBotMessage } from "react-chatbot-kit";
import CuisineOptions from "./component/CuisineOptions";
import CuisineLink from "./component/CuisineLink";

const config = {
  initialMessages: [
    createChatBotMessage(`Hi, Welcome to our Website Yummato`, {
      withAvatar: true,
      delay: 500,
    }),
    createChatBotMessage(`I'd be happy to help you find the perfect meal.`, {
      withAvatar: true,
      delay: 1000,
    }),
    createChatBotMessage(
      `What type of cuisine are you in the mood for today ?`,
      {
        withAvatar: true,
        delay: 1500,
        widget: "Cuisineoptions",
      }
    ),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
  widgets: [
    {
      widgetName: "Cuisineoptions",
      widgetFunc: (props) => <CuisineOptions {...props} />,
    },
    {
      widgetName: "CuisineLink",
      widgetFunc: (props) => <CuisineLink {...props} />,
    },
  ],
};
export default config;
