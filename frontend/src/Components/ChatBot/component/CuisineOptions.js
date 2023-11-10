import axios from "axios";
import React, { useEffect, useState } from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import Loading from "./Loading";

const CuisineOptions = ({ setState }) => {
  const [cuisines, setCuisines] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/v1/cuisines`).then((res) => {
      setCuisines(res.data);
    }).catch((err)=>{
      setState((prevState)=>({
        ...prevState ,
        messages:[
          ...prevState.messages,
          createChatBotMessage(`We are facing some issue, Please try again later`)
        ]
      }))
    })
  }, []);

  const handleOnClick = (e) => {
    setState((prevState) => ({
      ...prevState,
      messages: [
        ...prevState.messages,
        createChatBotMessage(
          `Please visit following link for ${e.target.value} cuisine foods. I hope you enjoy your meal.`,
          {
            withAvatar: true,
            delay: 1000,
            widget: "CuisineLink",
            payload: { selectedCuisine: e.target.value },
          }
        ),
        // createChatBotMessage(
        //   <p>
        //     <a
        //       style={customStyle}
        //       href={`http://localhost:3000/shoppingcart?cuisine=${e.target.value}`}
        //     >
        //       {e.target.value}
        //     </a>
        //   </p>,
        //   {
        //     withAvatar: true,
        //     delay: 1500,
        //   }
        // ),
      ],
    }));
  };

  return (
    <>
      {cuisines.length === 0 ? (
        <Loading />
      ) : (
        <div className="cuisineOption">
          {cuisines?.map((cuisine) => {
            return (
              <button
                key={cuisine}
                className="cusineOptBtn"
                onClick={handleOnClick}
                value={cuisine}
              >
                {cuisine}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
};

export default CuisineOptions;
