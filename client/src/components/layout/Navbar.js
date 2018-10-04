import React, { Component } from "react";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      submit: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newSummoner = {
      name: this.state.name
    };
    console.log(newSummoner);
  }

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <a className="navbar-brand" href="landing.html">
            LOL Stats Viewer
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="leaderboards.html">
                  {" "}
                  Leaderboards
                </a>
              </li>
            </ul>

            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                placeholder="Search..."
                name="name"
                value={this.state.name}
                required
                autoComplete="off"
                onChange={this.onChange}
              />
              <span className="input-group-btn">
                <button
                  className="btn-primary search-submit"
                  target="#search-nav"
                  type="button"
                >
                  <span className="fa fa-search" />
                </button>
              </span>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;

{
  /* <input
id="search-nav"
type="text"
placeholder="Search..."
autoComplete="off"
/>
<span className="input-group-btn">
<button
  className="btn-primary search-submit"
  target="#search-nav"
  type="button"
>
  <span className="fa fa-search" />
</button>
</span> */
}
