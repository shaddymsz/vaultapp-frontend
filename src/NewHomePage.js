import React from "react";
import "./Home.css";
import HealthIcon from "./Assets/svg/Health_Insurance.svg";
import TwoWheelerIcon from "./Assets/svg/2wheeler-insurance.svg";
import CarIcon from "./Assets/svg/car.svg";
import ChildInvestIcon from "./Assets/svg/Child-Investment.svg";
import FamilyIcon from "./Assets/svg/Family_health_insurance.svg";
import HeartIcon from "./Assets/svg/heart-insurance.svg";
import InvestmentIcon from "./Assets/svg/investment-plans.svg";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";
import "./Animations.css";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import Configs from "./configs/config";

const url = Configs.endpoint;

const NewHomePage = (props) => {
  let { company } = useParams();
  const [products, setProducts] = React.useState([]);
  const history = useHistory();
  const clientId = localStorage.getItem("clientId");

  const getProducts = async () => {
    try {
      if (!clientId && !company) {
        const response = await axios.get(`${url}/insurance/getProductList`);
        if (response) {
          setProducts(response.data.products);
        }
      } else {
        try {
          const response = await axios.get(
            `${url}/insurance/getInsuranceProduct/${clientId}`
          );
          if (response) {
            setProducts(response.data.products);
          }
        } catch (err) {
          setProducts([]);
        }
      }
    } catch (error) {
      setProducts([]);
    }
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  const renderComponent = (product) => {
    let path;
    switch (product) {
      case "Car Insurance":
        path = `${company}/vehicle-details`;
        break;

      case "Health Insurance":
        path = `${company}/health-details`;
        break;

      case "2 Wheeler Insurance":
        path = `${company}/2wheeler-details`;
        break;

      case "Child Savings Plan":
        path = `${company}/child-savings`;
        break;

      case "Family Health Insurance":
        path = `${company}/housing-society`;
        break;

      case "Investment Plans":
        path = `${company}/investment-plans`;
        break;

      case "Heart Insurance":
        path = `${company}/heart-insurance`;
        break;

      case "Group Protection":
        path = `${company}/gmcproducts`;
        break;

      default:
        path = "/";
        break;
    }

    history.push(path);
  };

  return (
    <div>
      <section>
        <div className="top-banner">
          <div>
            <h1 className="top-text">
              Let's find you
              <br /> the <span style={{ fontWeight: 800 }}>Best Insurance</span>
            </h1>
            <div>
              <div className="lowest_price">
                <img
                  src="https://www.flaticon.com/svg/vstatic/svg/758/758930.svg?token=exp=1620478001~hmac=85d495decb12c913ed090b5f4824295a"
                  alt=""
                  style={{ width: "27px", marginRight: "12px" }}
                />
                50+ insurers with the lowest prices
              </div>
              <div className="hassle_free">
                <img
                  src="https://www.flaticon.com/svg/vstatic/svg/819/819398.svg?token=exp=1620477723~hmac=c2fdbf699e4da7a69ca7701a07d691c8"
                  alt=""
                  style={{ width: "27px", marginRight: "12px" }}
                />
                Quick, easy & hassle free
              </div>
            </div>
          </div>
          <div>
            <h4 className="promise-text">XPC Promise</h4>
            <div>
              <h1 className="mid-text">
                A commitment <br /> to our customers
              </h1>
            </div>
            <div className="button_knowMOre">Know More</div>
          </div>
        </div>
      </section>
      <section
        style={{
          background: "white",
          height: "350px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="product-section">
          {products.length ? (
            products.map((product, index) =>
              index <= 10 ? (
                <div
                  onClick={() => {
                    renderComponent(product.product_name);
                  }}
                  className="product_card"
                >
                  <img
                    src={product.product_icon}
                    alt=""
                    style={{ width: "34px" }}
                  />

                  <div className="product_title">{product.product_name}</div>
                </div>
              ) : index == 11 ? (
                <div
                  onClick={() => {
                    history.push(`${company}/allproducts`);
                  }}
                  className="product_card"
                >
                  <div
                    className="product_title"
                    style={{
                      color: "#1185e0",
                      fontSize: "15px",
                      "&:hover": {
                        TextDecoder: "underline",
                      },
                    }}
                  >
                    {"View More Products"}
                  </div>
                </div>
              ) : null
            )
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <h1 style={{ fontSize: "25px" }}>No Product Found</h1>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default NewHomePage;
