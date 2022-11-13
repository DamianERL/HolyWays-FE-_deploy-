
//component
import Layout from "../components/utils/layout";
import Header from "../components/pages/index/header";
import Navbar from "../components/Navbar/navbar";
import Main from "../components/pages/index/main";
import Footer from "../components/pages/index/footer";
import { useState } from "react";

export default function Home() {

  

  const [showMLogin, setShowMLogin] = useState(false);
  
  return (
    <div>
      <Layout title="HolyWays">
        <Navbar showMLogin={showMLogin} setShowMLogin={setShowMLogin} />
        <div>
          <Header />
          <Main />
          <Footer setShowMLogin={setShowMLogin} />
        </div>
      </Layout>
    </div>
  );
}
