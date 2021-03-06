import React, { Fragment, useContext, useState, useEffect } from "react";

import { Tabs, Tab } from "react-bootstrap";

import { GlobalContext } from "context";

import {
  HazardViewerHazardCurve,
  HazardViewerDisaggregation,
  HazardViewerUHS,
} from "components/Hazard/SeismicHazard";

import "assets/style/HazardForms.css";

const HazardViewer = () => {
  const {
    hasPermission,
    selectedIM,
    hazardCurveComputeClick,
    disaggComputeClick,
    uhsComputeClick,
  } = useContext(GlobalContext);

  const [selectedTab, setSelectedTab] = useState("hazardCurve");

  // Hazard Form, IM selected and "Compute" clicked
  useEffect(() => {
    if (
      hazardCurveComputeClick !== null &&
      selectedIM !== null &&
      hasPermission("hazard:hazard")
    ) {
      setSelectedTab("hazardCurve");
    }
  }, [hazardCurveComputeClick]);

  useEffect(() => {
    if (
      disaggComputeClick !== null &&
      selectedIM !== null &&
      hasPermission("hazard:disagg")
    ) {
      setSelectedTab("disagg");
    }
  }, [disaggComputeClick]);

  useEffect(() => {
    if (uhsComputeClick !== null && hasPermission("hazard:uhs")) {
      setSelectedTab("uhs");
    }
  }, [uhsComputeClick]);

  return (
    <Fragment>
      <Tabs
        activeKey={selectedTab}
        className="hazard-viewer-tabs"
        onSelect={(k) => setSelectedTab(k)}
      >
        <Tab eventKey="hazardCurve" title="Hazard Curve">
          <HazardViewerHazardCurve />
        </Tab>
        <Tab eventKey="disagg" title="Disaggregation">
          <HazardViewerDisaggregation />
        </Tab>
        <Tab eventKey="uhs" title="Uniform Hazard Spectrum">
          <HazardViewerUHS />
        </Tab>
      </Tabs>
    </Fragment>
  );
};

export default HazardViewer;
