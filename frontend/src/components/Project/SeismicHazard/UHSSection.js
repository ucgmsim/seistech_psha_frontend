import React, { useState, useContext, useEffect, Fragment } from "react";

import { v4 as uuidv4 } from "uuid";
import { GlobalContext } from "context";

import { createSelectArray } from "utils/Utils";

import Select from "react-select";
import makeAnimated from "react-select/animated";

const UHSSection = () => {
  const {
    projectDisagRPs,
    projectSelectedUHSRP,
    setProjectSelectedUHSRP,
    setProjectUHSGetClick,
  } = useContext(GlobalContext);

  const animatedComponents = makeAnimated();
  const [localRPs, setLocalRPs] = useState([]);

  const options = createSelectArray(projectDisagRPs);

  useEffect(() => {
    if (projectSelectedUHSRP.length === 0) {
      setLocalRPs([]);
    }
  }, [projectSelectedUHSRP]);

  const displayInConsole = () => {
    setProjectSelectedUHSRP(localRPs);
    setProjectUHSGetClick(uuidv4());
  };

  return (
    <Fragment>
      <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group form-section-title">
          <span>Uniform Hazard Spectrum</span>
        </div>
        <div className="form-group">
          <label
            id="label-uhs-return-period"
            htmlFor="uhs-return-period"
            className="control-label"
          >
            Return Period
          </label>
          <Select
            id="uhs-return-period"
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            placeholder={options.length === 0 ? "Loading..." : "Select..."}
            value={localRPs.length === 0 ? [] : localRPs}
            onChange={(value) => setLocalRPs(value || [])}
            options={options}
            isDisabled={options.length === 0}
          />
        </div>
      </form>

      <div className="form-group">
        <button
          id="uhs-update-plot"
          type="button"
          className="btn btn-primary mt-2"
          disabled={localRPs.length === 0}
          onClick={() => {
            displayInConsole();
          }}
        >
          Get
        </button>
      </div>
    </Fragment>
  );
};

export default UHSSection;
