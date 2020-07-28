import React from "react";
import homeImg from "../assets/home.svg";
import styles from "../scss/home.module.css";
import { CardBody, CardTitle } from "shards-react";
const Home = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm">
          <div className="container-fluid">
            <img
              src={homeImg}
              className={`img-fluid ${styles.image}`}
              alt="Responsive image"
            ></img>
          </div>
        </div>
        <div className={`col-sm ${styles.card}`}>
          <div className="card text-center">
              <CardBody className={styles.cardBody}>
                <CardTitle>Hola 😎 Start saving your URL in the Pit </CardTitle>
                Sign in the app and get stated.
              </CardBody>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
