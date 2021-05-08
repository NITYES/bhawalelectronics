import React from "react";
import NewArrival from "../components/home/NewArrival";
import BestSellers from "../components/home/BestSellers";
import Carousel from '../components/home/Carousel'
import ShowCategoryCount from '../components/home/ShowCategoryCount'




function Home() {

  return (
    <div className="marginheader" style={{background:"white"}}>
    
{/* <div className="jumbotron text-danger h1 font-weight-bold text-center">
  <Jumbotrons text={['Latest Product','New Arrivals','Best Sellers']}/>
</div> */}
<Carousel images={[]} />

<h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron " style={{background:"#C3003C",color:"white"}}>
  New Arrivals
</h4>
<NewArrival />
<br/>
<h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron" style={{background:"#C3003C",color:"white"}} >
  Best Seller
</h4>
<BestSellers />
<br/>
<h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron" style={{background:"#C3003C",color:"white"}} >
    Shop By category
</h4>
<ShowCategoryCount />
</div>


  );
}

export default Home;
