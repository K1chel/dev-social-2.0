import { toast } from "sonner";

const App = () => {
  return (
    <div>
      <p onClick={() => toast("Hello sonner")}>Hello DevSocial</p>
    </div>
  );
};

export default App;
