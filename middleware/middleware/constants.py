# Core API Endpoints - Hazard Analysis tab
# Site Selection
CORE_API_ENSEMBLE_IDS_ENDPOINT = "/coreAPI/ensembleids/get"
CORE_API_IMS_ENDPOINT = "/coreAPI/ims/get"
CORE_API_CONTEXT_MAP_ENDPOINT = "/coreAPI/contextmap/get"
CORE_API_VS30_MAP_ENDPOINT = "/coreAPI/vs30map/get"
CORE_API_STATION_ENDPOINT = "/coreAPI/station/get"

# Seismic Hazard
CORE_API_HAZARD_ENDPOINT = "/coreAPI/hazard/get"
CORE_API_HAZARD_NZ11705_ENDPOINT = "/coreAPI/hazard/nz1170p5/get"
CORE_API_HAZARD_NZ11705_SOIL_CLASS_ENDPOINT = "/coreAPI/hazard/nz1170p5/soil_class/get"
CORE_API_HAZARD_NZ11705_DEFAULT_PARAMS_ENDPOINT = "/coreAPI/hazard/nz1170p5/default/get"
CORE_API_HAZARD_DISAGG_ENDPOINT = "/coreAPI/disagg/get"
CORE_API_HAZARD_UHS_ENDPOINT = "/coreAPI/uhs/get"
CORE_API_HAZARD_UHS_NZ11705_ENDPOINT = "/coreAPI/uhs/nz1170p5/get"

# Ground Motion Selection
CORE_API_GMS_ENDPOINT = "/coreAPI/gms/ensemble_gms/get"
CORE_API_GMS_DEFAULT_IM_WEIGHTS_ENDPOINT = "/coreAPI/gms/default_im_weights/get"
CORE_API_GMS_DEFAULT_CAUSAL_PARAMS_ENDPOINT = "/coreAPI/gms/default_causal_params/get"
CORE_API_GMS_DATASETS_ENDPOINT = "/coreAPI/gms/ensemble_gms/datasets/get"
CORE_API_GMS_IMS_ENDPOINT_ENDPOINT = "/coreAPI/gms/ensemble_gms/ims/get"

# Download Endpoints
CORE_API_HAZARD_CURVE_DOWNLOAD_ENDPOINT = "/coreAPI/hazard_download"
CORE_API_HAZARD_DISAGG_DOWNLOAD_ENDPOINT = "/coreAPI/disagg_download"
CORE_API_HAZARD_UHS_DOWNLOAD_ENDPOINT = "/coreAPI/uhs_download"
CORE_API_GMS_DOWNLOAD_ENDPOINT = "/coreAPI/gms_download"

# Project API Endpoints - Project tab
# Site Selection
PROJECT_API_PROJECT_IDS_ENDPOINT = "/projectAPI/ids/get"
PROJECT_API_SITES_ENDPOINT = "/projectAPI/sites/get"
PROJECT_API_IMS_ENDPOINT = "/projectAPI/ims/get"
PROJECT_API_MAPS_ENDPOINT = "/projectAPI/maps/get"

# Seismic Hazard
PROJECT_API_HAZARD_ENDPOINT = "/projectAPI/hazard/get"
PROJECT_API_HAZARD_DISAGG_ENDPOINT = "/projectAPI/disagg/get"
PROJECT_API_HAZARD_DISAGG_RPS_ENDPOINT = "/projectAPI/disagg/rps/get"
PROJECT_API_HAZARD_UHS_ENDPOINT = "/projectAPI/uhs/get"
PROJECT_API_HAZARD_UHS_RPS_ENDPOINT = "/projectAPI/uhs/rps/get"

# Download Endpoints
PROJECT_API_HAZARD_CURVE_DOWNLOAD_ENDPOINT = "/projectAPI/hazard_download"
PROJECT_API_HAZARD_DISAGG_DOWNLOAD_ENDPOINT = "/projectAPI/disagg_download"
PROJECT_API_HAZARD_UHS_DOWNLOAD_ENDPOINT = "/projectAPI/uhs_download"
PROJECT_API_GMS_DOWNLOAD_ENDPOINT = "/projectAPI/gms_download"