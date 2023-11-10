import chi from "../images/noodles.jpg";
import idli from "../images/idli.jpg";
import northIndia from "../images/northIndia.jpg";
import { useNavigate , Link} from "react-router-dom";
import salads from "../images/salads.jpg";
// import diverse from "../images/diverse.jpg";
//import { useState } from "react";

const Cousines = () => {
  const navigate = useNavigate();
  

  return (
    <div className="container bg-secondary">
      <div
        className="modal fade "
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content " style={{ backgroundColor: "#d85a33" }}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Cuisines
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <div className="col">
                <div className="row bg-warning  mb-3 ">
                  <button onClick={()=>{navigate("/shoppingcart" , {state:{cuisine : "chinese"}})}} data-bs-dismiss="modal" className="d-flex flex-row justify-content-between">
                    <div className="fs-2"> Chinese</div>
                    <img src={chi} alt="chinese" style={{ height: "75px" }} />
                  </button>
                </div>
                <div className="row bg-warning mb-3">
                  <button onClick={()=>{navigate("/shoppingcart" , {state:{cuisine : "southindian"}})}} data-bs-dismiss="modal" className="d-flex flex-row justify-content-between">
                    <div className="fs-2">South Indian</div>
                    <img src={idli} alt="southIndian" style={{ height: "75px" }} />
                  </button>
                </div>
                <div className="row bg-warning mb-3">
                  <button onClick={()=>{navigate("/shoppingcart" , {state:{cuisine : "northindian"}})}} data-bs-dismiss="modal" className="d-flex flex-row justify-content-between">
                    <div className="fs-2">North Indian</div>
                    <img src={northIndia} alt="northIndian" style={{ height: "75px" }} />
                  </button>
                </div>
                <div className="row bg-warning mb-3">
                   <button onClick={()=>{navigate("/shoppingcart" , {state:{cuisine : "salads"}})}} data-bs-dismiss="modal" className="d-flex flex-row justify-content-between">
                    <div className="fs-2">Salads</div>
                    <img src={salads} alt="salad" style={{ height: "75px" }} />
                  </button>
                </div>
                <div className="row bg-warning mb-3">
                   <button onClick={()=>{navigate("/shoppingcart" , {state:{cuisine : "All"}})}} data-bs-dismiss="modal" className="d-flex flex-row justify-content-between">
                    <div className="fs-2">Menu</div>
                    <img src={salads} alt="salad" style={{ height: "75px" }} />
                  </button>
                </div>
      
                
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cousines;
