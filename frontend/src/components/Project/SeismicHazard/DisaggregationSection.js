import React, { useState, useContext, useEffect, Fragment } from "react";

import { v4 as uuidv4 } from "uuid";

import { GlobalContext } from "context";
import * as CONSTANTS from "constants/Constants";

import { ProjectSelect, GuideTooltip } from "components/common";

const DisaggregationSection = () => {
  const {
    projectDisagRPs,
    projectSelectedIM,
    projectSelectedDisagRP,
    setProjectSelectedDisagRP,
    setProjectDisaggGetClick,
  } = useContext(GlobalContext);

  const [localSelectedRP, setLocalSelectedRP] = useState(null);

  // Reset local variable to null when global changed to null (Reset)
  useEffect(() => {
    if (projectSelectedDisagRP === null) {
      setLocalSelectedRP(null);
    }
  }, [projectSelectedDisagRP]);

  const getDisagg = () => {
    setProjectSelectedDisagRP(localSelectedRP);
    setProjectDisaggGetClick(uuidv4());
  };

  return (
    <Fragment>
      <div className="form-group form-section-title">
        Disaggregation
        <GuideTooltip
          explanation={CONSTANTS.TOOLTIP_MESSAGES["PROJECT_DISAGG"]}
        />
      </div>
      <div className="form-group">
        <label
          id="label-disagg-return-period"
          htmlFor="disagg-return-period"
          className="control-label"
        >
          Return Period
        </label>
        <ProjectSelect
          id="project-rp"
          value={localSelectedRP}
          setSelect={setLocalSelectedRP}
          options={projectDisagRPs}
        />
      </div>

      <div className="form-group">
        <button
          id="project-hazard-curve-get-btn"
          type="button"
          className="btn btn-primary"
          disabled={localSelectedRP === null || projectSelectedIM === null}
          onClick={() => {
            getDisagg();
          }}
        >
          Get
        </button>
      </div>
    </Fragment>
  );
};

export default DisaggregationSection;
