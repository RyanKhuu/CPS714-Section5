import "./HomePage.css"
import { MdManageAccounts, MdAnalytics, MdWarning } from "react-icons/md";

interface Props {
    setPage: (page: "home" |"member" | "analytics" | "overdue") => void;
}

export default function HomePage({setPage}: Props) {
    return (
        <div className= "home-container">
            <h1 className= "home-title">Welcome to LibraLite Admin Dashboard!</h1>
            <div className="home-buttons">
            <button className="home-btn" onClick={() => setPage("member")}>
                <span className= "icon"><MdManageAccounts size={30}></MdManageAccounts></span>
                Member Management
            </button>
            <button className="home-btn" onClick={() => setPage("analytics")}>
                <span className= "icon"><MdAnalytics size={30}></MdAnalytics></span>
                System Analytics 
            </button>
            <button className="home-btn" onClick={() => setPage("overdue")}>
                <span className= "icon"><MdWarning size={30}></MdWarning></span>
                Overdue Items 
            </button>
            </div>
        </div>
    )
}