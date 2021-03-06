import React, { Fragment, useContext, useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { GlobalContext } from "context";
import { useAuth0 } from "components/common/ReactAuth0SPA";
import * as CONSTANTS from "constants/Constants";

import { ProjectSelect, GuideTooltip } from "components/common";
import { handleErrors, sortIMs, renderSigfigs } from "utils/Utils";

import "assets/style/HazardForms.css";

const SiteSelectionForm = () => {
  const {
    setProjectIMs,
    setProjectDisagRPs,
    setProjectUHSRPs,
    setProjectId,
    setProjectVS30,
    setProjectLocation,
    setProjectLocationCode,
    setProjectLat,
    setProjectLng,
    setProjectSiteSelectionGetClick,
  } = useContext(GlobalContext);

  const { getTokenSilently } = useAuth0();

  // Response for Project ID option and is an array, can use straightaway
  const [projectIdOptions, setProjectIdOptions] = useState([]);

  const [localProjectId, setLocalProjectId] = useState(null);
  const [localLocation, setLocalLocation] = useState(null);
  const [localVS30, setLocalVS30] = useState(null);
  const [localProjectLocations, setLocalProjectLocations] = useState({});
  // Using localProjectLocations which is an object to create two different arrays for dropdowns
  const [locationOptions, setLocationOptions] = useState([]);
  const [vs30Options, setVs30Options] = useState([]);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  // Getting Project IDs
  useEffect(() => {
    // Also resetting those to default to disable tabs
    setProjectId(null);
    setProjectLocation(null);
    setProjectVS30(null);

    const abortController = new AbortController();
    const signal = abortController.signal;

    const getProjectID = async () => {
      try {
        const token = await getTokenSilently();

        await fetch(
          CONSTANTS.CORE_API_BASE_URL +
            CONSTANTS.PROJECT_API_PROJECT_IDS_ENDPOINT,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: signal,
          }
        )
          .then(handleErrors)
          .then(async (response) => {
            const responseData = await response.json();
            setProjectIdOptions(responseData);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    };

    getProjectID();

    return () => {
      abortController.abort();
    };
  }, []);

  // Getting location, IMs (for Hazard Curve) and RPs (for Disaggregation and UHS) when ID gets changed
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const getLocation = async () => {
      if (localProjectId !== null) {
        try {
          const token = await getTokenSilently();

          await Promise.all([
            fetch(
              CONSTANTS.CORE_API_BASE_URL +
                CONSTANTS.PROJECT_API_SITES_ENDPOINT +
                `?project_id=${localProjectId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                signal: signal,
              }
            ),
            fetch(
              CONSTANTS.CORE_API_BASE_URL +
                CONSTANTS.PROJECT_API_IMS_ENDPOINT +
                `?project_id=${localProjectId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                signal: signal,
              }
            ),
            fetch(
              CONSTANTS.CORE_API_BASE_URL +
                CONSTANTS.PROJECT_API_HAZARD_DISAGG_RPS_ENDPOINT +
                `?project_id=${localProjectId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                signal: signal,
              }
            ),
            fetch(
              CONSTANTS.CORE_API_BASE_URL +
                CONSTANTS.PROJECT_API_HAZARD_UHS_RPS_ENDPOINT +
                `?project_id=${localProjectId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                signal: signal,
              }
            ),
          ])
            .then(handleErrors)
            .then(async ([location, im, disaggRPs, uhsRPs]) => {
              const responseLocationData = await location.json();
              const responseIMData = await im.json();
              const responseDisaggRPData = await disaggRPs.json();
              const responseUHSRPData = await uhsRPs.json();
              // Need to create another object based on the response (Object)
              // To be able to use in Dropdown, react-select
              setLocalProjectLocations(responseLocationData);
              // Setting IMs
              setProjectIMs(sortIMs(responseIMData["ims"]));
              // Setting RPs
              setProjectDisagRPs(responseDisaggRPData["rps"]);
              setProjectUHSRPs(responseUHSRPData["rps"]);
              // Reset dropdowns
              setLocalLocation(null);
              setLocalVS30(null);
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          console.log(error);
        }
      }
    };

    getLocation();

    return () => {
      abortController.abort();
    };
  }, [localProjectId]);

  // Based on the location's response, we create an array for Location dropdown
  // Also create a special object to create
  useEffect(() => {
    // We originally set localProjectLocations as an array but after update with the response
    // It changes to object and object.length is undefined which is not 0
    if (Object.values(localProjectLocations).length > 0) {
      let tempOptionArray = [];
      let tempLocationCodeObj = {};
      for (const key of Object.keys(localProjectLocations)) {
        // Only pushing names into an array, ex: Christchurch and Dunedin
        tempOptionArray.push(localProjectLocations[key]["name"]);
        // Looks like { Christchurch: chch, Dunedin: dud}, to get station code easy
        tempLocationCodeObj[localProjectLocations[key]["name"]] = key;
      }
      setLocationOptions(tempOptionArray);
      setProjectLocationCode(tempLocationCodeObj);
    }
  }, [localProjectLocations]);

  // Based on the chosen Location, we create an array for Vs30 dropdown
  useEffect(() => {
    if (localLocation !== null) {
      setVs30Options([]);
      for (const key of Object.keys(localProjectLocations)) {
        if (localLocation === localProjectLocations[key]["name"]) {
          setVs30Options(localProjectLocations[key]["vs30"]);
          setLat(localProjectLocations[key]["lat"]);
          setLng(localProjectLocations[key]["lon"]);
          // Reset the Vs30 value
          setLocalVS30(null);
        }
      }
    }
  }, [localLocation]);

  // Reset dropdowns when Project ID gets changed
  useEffect(() => {
    if (localProjectId !== null) {
      setLocalLocation(null);
      setLocalVS30(null);
      setLocationOptions([]);
      setVs30Options([]);
    }
  }, [localProjectId]);

  const setGlobalVariables = () => {
    setProjectId(localProjectId);
    setProjectLocation(localLocation);
    setProjectVS30(localVS30);
    setProjectSiteSelectionGetClick(uuidv4());
    setProjectLat(renderSigfigs(lat, CONSTANTS.APP_UI_SIGFIGS));
    setProjectLng(renderSigfigs(lng, CONSTANTS.APP_UI_SIGFIGS));
  };

  return (
    <Fragment>
      <div className="form-group form-section-title">
        Project ID
        <GuideTooltip
          explanation={
            CONSTANTS.TOOLTIP_MESSAGES["PROJECT_SITE_SELECTION_PROJECT_ID"]
          }
        />
      </div>
      <div className="form-group">
        <ProjectSelect
          id="project-id-select"
          value={localProjectId}
          setSelect={setLocalProjectId}
          options={projectIdOptions}
          isProjectID={true}
        />
      </div>

      <div className="form-group form-section-title">
        Location
        <GuideTooltip
          explanation={
            CONSTANTS.TOOLTIP_MESSAGES["PROJECT_SITE_SELECTION_LOCATION"]
          }
        />
      </div>
      <div className="form-group">
        <ProjectSelect
          id="location-select"
          value={localLocation}
          setSelect={setLocalLocation}
          options={locationOptions}
          placeholder={
            localProjectId === null
              ? "Please select the Project ID first..."
              : "Loading..."
          }
        />
      </div>

      <div className="form-group form-section-title">
        <span>
          V<sub>S30</sub>
        </span>
        <GuideTooltip
          explanation={
            CONSTANTS.TOOLTIP_MESSAGES["PROJECT_SITE_SELECTION_VS30"]
          }
        />
      </div>
      <div className="form-group">
        <ProjectSelect
          id="vs-30-select"
          value={localVS30}
          setSelect={setLocalVS30}
          options={vs30Options}
          placeholder={
            localLocation === null
              ? "Please select the Location first..."
              : "Loading..."
          }
        />
      </div>

      <div className="form-group">
        <button
          id="project-site-selection-get"
          type="button"
          className="btn btn-primary mt-2"
          disabled={
            localProjectId === null ||
            localLocation === null ||
            localVS30 === null
          }
          onClick={() => setGlobalVariables()}
        >
          Get
        </button>
      </div>
    </Fragment>
  );
};

export default SiteSelectionForm;
