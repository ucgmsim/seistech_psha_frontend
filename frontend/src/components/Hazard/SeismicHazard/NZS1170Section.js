import React, { useState, useContext } from "react";
import { GlobalContext } from "context";
import TextField from "@material-ui/core/TextField";

import "assets/style/NZS1170Section.css";

const NZS1170Section = () => {
  const {
    nzs1170ComputeClick,
    setNZS1170ComputeClick,
    showNZS1170,
    setShowNZS1170,

    nzs1170Input,
    setNZS1170Input,
    nzs1170SiteClass,
    setNZS1170SiteClass,
  } = useContext(GlobalContext);
  // TODO - See whether this can be an another one-liner as we are not dealing with this at this point
  const onChangeComputeNZS1170 = (e) => {
    setNZS1170ComputeClick(nzs1170ComputeClick === "true" ? "false" : "true");
  };

  const onChangeShowNZS1170 = (e) => {
    setShowNZS1170(showNZS1170 === "true" ? "false" : "true");
  };

  // TODO - See whether this can be an another one-liner as we are not dealing with this at this point
  const onChangeNZS1170Input = (e) => {
    setNZS1170Input(e.target.value);
  };

  const onChangeNZS1170SiteClass = (e) => {
    setNZS1170SiteClass(e.target.value);
  };
  // Z-factor
  const [localZFactor, setLocalZFactor] = useState(0);

  return (
    <div>
      <div className="form-group form-section-title">
        <span>NZS1170</span>
      </div>

      <div className="form-group">
        <input type="checkbox" onChange={onChangeShowNZS1170} disabled />
        <span className="show-nzs">&nbsp;Show NZS1170.5 hazard</span>
      </div>

      <div className="form-group">
        <div className="d-flex align-items-center">
          <label
            id="label-z-factor"
            htmlFor="z-factor"
            className="control-label"
          >
            Z Factor
          </label>
          <TextField
            id="z-factor"
            className="flex-grow-1"
            type="number"
            value={localZFactor}
            onChange={(e) => setLocalZFactor(e.target.value)}
            variant="outlined"
          />
        </div>
      </div>

      <div className="form-group">
        <button
          id="prob-update"
          type="button"
          className="btn btn-primary"
          disabled
        >
          Compute
        </button>
      </div>
    </div>
  );
};

export default NZS1170Section;
