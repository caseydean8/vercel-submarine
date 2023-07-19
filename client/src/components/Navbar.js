import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

class Navbar extends Component {
  redirect = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <nav>
        <div className="container">
          <div className="row">
            <div className="col center-mobile">
              <Link to={"/"} label={"Home"} className={"font"}>
                Submarine
              </Link>
            </div>
            <div className="button-holder">
              <button
                className="buttons nav-buttons"
                onClick={(event) =>
                  this.props.handleLogout(event, this.redirect)
                }
              >
                Logout
              </button>
              {this.props.page === "stats" ? (
                <Link to={"/main"} label={"Subscriptions"}>
                  <button className="buttons nav-buttons">Subscriptions</button>
                </Link>
              ) : (
                <Link to={"/stats"} label={"Statistics"}>
                  <button className="buttons nav-buttons">Statistics</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
