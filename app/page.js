import HomePage from "@/app/home/page"
export default function Home() {
  return (
    <div>
      {/* This will render the App at localhost:3000/ and localhost:3000/home both links will work.. I did this to higlight and tell the user at which page he is currently in..in order to edit the homepage, please go to the respective homepage component and edit it there.*/}
      <HomePage/>
    </div>
  );
}
