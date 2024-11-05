import Navbar from "@/components/navbar/Navbar";

const LoggedInLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className="app">{children}</main>
        </>
    );
};

export default LoggedInLayout;
