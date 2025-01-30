import ExpenseList from "@/components/ExpenseList";
import Header from "@/components/Header";
import Insight from "@/components/Insights";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/v1/users/logout");
      toast({ title: response.data.message, variant: "default" });
      navigate("/");
    } catch (error) {
      console.error("Error logout user:", error);
    }
  };

  return (
    <>
      {/* <Button variant="destructive" onClick={() => handleLogout()}>
        Logout
      </Button> */}
      <Header />
      <ExpenseList />;
      <Insight />
    </>
  );
};

export default Dashboard;
