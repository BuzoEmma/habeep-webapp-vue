import house1 from "../../assets/images/house-1.png";
import house2 from "../../assets/images/house-2.png";
import house3 from "../../assets/images/house-3.png";
import house4 from "../../assets/images/house-4.png";
import house6 from "../../assets/images/house-6.png";

function getgetFormattedDate() {
  const date = new Date(); // get the current date
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}



const dateBlog = [
  {
    name: "Chibuzo Emma",
    title:
      "Customer Support at Your Fingertips: How to Reach Habeep Support Team",
    link: "https://www.youtube.com/watch?v=q9DI2JgfISg&list=RDQBKm9UCbXrM&index=9",
    route: "",
    date: getgetFormattedDate(),
    image: house6,
  },
  {
    name: "Chibuzo Emmanuel",
    title:
      "Customer Support at Your Fingertips: How to Reach Habeep Support Team",
    link: "https://www.youtube.com/watch?v=q9DI2JgfISg&list=RDQBKm9UCbXrM&index=9",
    route: "",
    date: getgetFormattedDate(),
    image: house6,
  },
  {
    name: "Chike Emma",
    title:
      "Customer Support at Your Fingertips: How to Reach Habeep Support Team",
    link: "",
    route: "/terms-of-service",
    date: getgetFormattedDate(),
    image: house6,
  },
  {
    name: "Chima Emma",
    title:
      "Customer Support at Your Fingertips: How to Reach Habeep Support Team",
    link: "https://www.youtube.com/watch?v=q9DI2JgfISg&list=RDQBKm9UCbXrM&index=9",
    route: "",
    date: getgetFormattedDate(),
    image: house6,
  },
  {
    name: "Frank Mike",
    title:
      "Customer Support at Your Fingertips: How to Reach Habeep Support Team",
    link: "",
    route: "/listings/search",
    date: getgetFormattedDate(),
    image: house6,
  },
  {
    name: "House Chaw",
    title:
      "Customer Support at Your Fingertips: How to Reach Habeep Support Team",
    link: "",
    date: getgetFormattedDate(),
    route: "/help",
    image: house6,
  },
  {
    name: "Micheal Obama",
    title:
      "Customer Support at Your Fingertips: How to Reach Habeep Support Team",
    link: "https://www.youtube.com/watch?v=DGpwNm0A6gI&list=RDQBKm9UCbXrM&index=19",
    route: "",
    image: house6,
    date: getgetFormattedDate(),
  },
  {
    name: "Misandris Catilage",
    title:
      "Customer Support at Your Fingertips: How to Reach Habeep Support Team",
    link: "",
    route: "/help",
    date: getgetFormattedDate(),
    image: house6,
  },
  {
    name: "Cho-cho Nwinwo",
    title:
      "Customer Support at Your Fingertips: How to Reach Habeep Support Team",
    link: "https://www.youtube.com/watch?v=DGpwNm0A6gI&list=RDQBKm9UCbXrM&index=19",
    route: "",
    image: house6,
    date: getgetFormattedDate(),
  },
];

export default dateBlog;
