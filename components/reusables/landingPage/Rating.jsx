import React from "react";
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";

const Rating = ({ rating }) => {
  const getStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<IoMdStar key={i} size={20} color="#FFCE31" />);
    }

    if (halfStar) {
      stars.push(<IoMdStarHalf key="half" size={20} color="#FFCE31" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <IoMdStarOutline key={fullStars + i + 1} size={20} color="#FFCE31" />
      );
    }

    return stars;
  };

  return <span className="flex items-center">{getStars(rating)}</span>;
};

export default Rating;
