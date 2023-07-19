import React, { Component } from "react";
import LargeChart from "../components/LargeChart/LargeChart";
import SmallChart from "../components/SmallChart/SmallChart";
import Logo from "../components/Logo";

function getMonthlyTotal(subArray) {
  let sum = 0;
  if (subArray.length > 0) {
    for (let i = 0; i < subArray.length; i++) {
      if (subArray[i].active) {
        switch (subArray[i].frequency) {
          case "Weekly":
            sum += (subArray[i].cost * 52) / 12;
            break;
          case "Yearly":
            sum += subArray[i].cost / 12;
            break;
          case "Daily":
            sum += (subArray[i].cost * 365) / 12;
            break;
          // Monthly
          default:
            sum += subArray[i].cost;
            break;
        }
      }
    }
  }
  return Number(sum.toFixed(2));
}

function getYearlyTotal(subArray) {
  let sum = 0;
  if (subArray?.length) {
    for (let i = 0; i < subArray.length; i++) {
      if (subArray[i].active) {
        switch (subArray[i].frequency) {
          case "Weekly":
            sum += subArray[i].cost * 52;
            break;
          case "Monthly":
            sum += subArray[i].cost * 12;
            break;
          case "Daily":
            sum += subArray[i].cost * 365;
            break;
          // Yearly
          default:
            sum += subArray[i].cost;
            break;
        }
      }
    }
  }
  return Number(sum.toFixed(2));
}

function setChartData(subArr) {
  let result = [];
  let sum = 0;
  if (subArr?.length) {
    subArr.forEach((elem) => {
      if (elem.active) {
        switch (elem.frequency) {
          case "Weekly":
            sum = Number(((elem.cost * 52) / 12).toFixed(2));
            break;
          case "Yearly":
            sum = Number((elem.cost / 12).toFixed(2));
            break;
          case "Daily":
            sum = Number(((elem.cost * 365) / 12).toFixed(2));
            break;
          default:
            // Monthly
            sum = Number(elem.cost.toFixed(2));
            break;
        }
        result.push({ name: elem.name, cost: sum, color: elem.color });
      }
    });
  }
  return result;
}

function incomeRatio(subArr, income) {
  const total = getMonthlyTotal(subArr);
  const ratio = ((total / income) * 100).toFixed(2) + "%";
  return ratio;
}

//set up subscription array for state
function setUpSubs(subArr) {
  const colors = [
    "#7FFFD4",
    "#FFBB28",
    "#FF8042",
    "#98F5FF",
    "#FF69B4",
    "#8470FF",
    "#FFFFE0",
  ];
  let temp = [];
  if (subArr?.length) {
    subArr.forEach((elem, i) => {
      temp.push({
        name: elem.name,
        cost: elem.cost,
        frequency: elem.frequency,
        active: true,
        color: colors[i],
      });
    });
  }
  return temp;
}

// ==================================================
class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthlyTotal: 0,
      yearlyTotal: 0,
      ratio: "",
      subscriptions: [],
      chartData: [],
      toggleMonthly: true,
      windowWidth: 0,
      dimensions: {
        width: 800,
        height: 400,
        cx: 400,
        cy: 300,
        innerRadius: 140,
        outerRadius: 220,
      },
    };
  }

  componentDidMount() {
    if (this.props.income) {
      const subData = setUpSubs(this.props.subscriptions);
      this.setState(
        {
          subscriptions: subData,
          chartData: setChartData(subData),
          yearlyTotal: getYearlyTotal(subData),
          monthlyTotal: getMonthlyTotal(subData),
          ratio: incomeRatio(subData, this.props.income),
        },
        () => this.storeSubs()
      );
    } else {
      let subscriptions = JSON.parse(localStorage.getItem("subscriptions"));
      let chartData = JSON.parse(localStorage.getItem("chartData"));
      let yearlyTotal = JSON.parse(localStorage.getItem("yearlyTotal"));
      let monthlyTotal = JSON.parse(localStorage.getItem("monthlyTotal"));
      let ratio = JSON.parse(localStorage.getItem("ratio"));
      this.setState({
        subscriptions,
        chartData,
        yearlyTotal,
        monthlyTotal,
        ratio,
      });
    }
    this.updateWindowSize();
    window.addEventListener("resize", this.updateWindowSize);
  }

  handleCheckboxChange(index, event) {
    let tempArr = this.state.subscriptions;
    event ? (tempArr[index].active = false) : (tempArr[index].active = true);
    this.setState(
      {
        subscriptions: tempArr,
        chartData: setChartData(tempArr),
        monthlyTotal: getMonthlyTotal(tempArr),
        yearlyTotal: getYearlyTotal(tempArr),
        ratio: incomeRatio(tempArr, this.props.income),
      },
      () => this.storeSubs()
    );
  }

  handleToggle(toggle) {
    this.setState({ toggleMonthly: toggle });
  }

  storeSubs() {
    localStorage.setItem(
      "subscriptions",
      JSON.stringify(this.state.subscriptions)
    );
    localStorage.setItem("chartData", JSON.stringify(this.state.chartData));
    localStorage.setItem("yearlyTotal", JSON.stringify(this.state.yearlyTotal));
    localStorage.setItem(
      "monthlyTotal",
      JSON.stringify(this.state.monthlyTotal)
    );
    localStorage.setItem("ratio", JSON.stringify(this.state.ratio));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowSize);
  }

  updateWindowSize = () => {
    this.setState({ windowWidth: window.innerWidth });
    if (window.innerWidth < 993) {
      this.setState({
        dimensions: {
          width: 600,
          height: 300,
          cx: 300,
          cy: 250,
          innerRadius: 85,
          outerRadius: 135,
        },
      });
    } else {
      this.setState({
        dimensions: {
          width: 800,
          height: 400,
          cx: 400,
          cy: 300,
          innerRadius: 140,
          outerRadius: 220,
        },
      });
    }
  };

  render() {
    return (
      <div className="container justify-content-center">
        <Logo />
        <div className="row justify-content-center">
          <div className="header-font">Statistics</div>
        </div>
        <div className="all-content">
          <div id="sub-checklist" className="row mobile-margin">
            <div className="col-xl-3 col-lg-12">
              <h3 className="group-header no-mobile">Your Subscriptions</h3>
              {this.state.subscriptions?.length
                ? this.state.subscriptions.map((elem, i) => {
                    return (
                      <div
                        className="form-check"
                        key={i}
                        style={{ color: elem.color }}
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultChecked={elem.active}
                          id={elem.name}
                          name={elem.name}
                          style={{ background: elem.color }}
                          onClick={() =>
                            this.handleCheckboxChange(i, elem.active)
                          }
                        />
                        <label className="form-check-label" htmlFor={elem.name}>
                          {elem.name}, (${elem.cost})
                        </label>
                      </div>
                    );
                  })
                : null}
            </div>
            <div className="col" id="guage-chart">
              {this.state.windowWidth > 766 ? (
                <h3 className="group-header">
                  Subscription Percent Adjusted to
                  {this.state.toggleMonthly ? " Monthly" : " Yearly"}
                </h3>
              ) : null}
              {this.state.windowWidth > 766 ? (
                <LargeChart
                  data={this.state.chartData}
                  dimensions={this.state.dimensions}
                />
              ) : (
                <SmallChart data={this.state.chartData} />
              )}
            </div>
          </div>
          <div id="total-display" className="row mobile-margin">
            <div className="toggleGroup">
              <span
                className={this.state.toggleMonthly ? "toggleOn" : "toggleOff"}
                onClick={() => this.handleToggle(true)}
              >
                Monthly{" "}
              </span>
              <span
                className={this.state.toggleMonthly ? "toggleOff" : "toggleOn"}
                onClick={() => this.handleToggle(false)}
              >
                {" "}
                Yearly
              </span>
            </div>
            <div className="group-text">
              <p>
                You are spending a total of $
                {this.state.toggleMonthly
                  ? `${this.state.monthlyTotal} per month, `
                  : `${this.state.yearlyTotal} per year, `}
                {this.state.ratio} of your income on subscriptions.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Stats;
