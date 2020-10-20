import React, { Fragment, useContext, useState, useEffect } from "react";
import Tabs from "react-bootstrap/Tabs";
import { Tab } from "react-bootstrap";
import Select from "react-select";
import { GlobalContext } from "context";

import FirstPlot from "./FirstPlot";
import LoadingSpinner from "components/common/LoadingSpinner";

import "assets/style/GMSViewer.css"

const GMSViewer = () => {
  const { isLoading, computedGMS, selectedIMVectors } = useContext(
    GlobalContext
  );

  const [specifiedIM, setSpecifiedIM] = useState([]);
  const [localIMVectors, setLocalIMVectors] = useState([]);

  useEffect(() => {
    let localIMs = selectedIMVectors.map((IM) => ({
      value: IM,
      label: IM,
    }));
    setLocalIMVectors(localIMs);
  }, [selectedIMVectors]);

  return (
    <div className="gms-viewer">
      <Tabs defaultActiveKey="firstPlot">
        <Tab eventKey="firstPlot" title="Specific IM">
          {isLoading === true && <LoadingSpinner />}
          {isLoading === false && computedGMS !== null && (
            <Fragment>
              <Select
                id="im-vectors"
                onChange={(value) => setSpecifiedIM(value || [])}
                defaultValue={specifiedIM}
                options={localIMVectors}
              />
              <FirstPlot gmsData={computedGMS} IM={specifiedIM.value} />
            </Fragment>
          )}
        </Tab>
        <Tab eventKey="secondPlot" title="Second Plot">
          <div>HELLO</div>
        </Tab>
        <Tab eventKey="thirdPlot" title="Third Plot">
          <div>HELLO</div>
        </Tab>
        <Tab eventKey="fourthPlot" title="Fourth Plot">
          <div>HELLO</div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default GMSViewer;
