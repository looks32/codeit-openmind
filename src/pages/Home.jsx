import FeedCard from "../components/FeedCard/FeedCard";
function Home() {
  return (
    <>
    <FeedCard answerProps={{ state: "pending" }} />
    <FeedCard answerProps={{ state: "answered" }} />
    </>
  );
}

export default Home;
