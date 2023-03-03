import * as hotelsActions from "./hotels";
import * as servicesActions from "./services";
import * as amenitiesActions from "./amenities";
import * as getRoomsCities from "./rooms";

const allActions = {
  ...hotelsActions,
  ...servicesActions,
  ...amenitiesActions,
  ...getRoomsCities
};

export default allActions;
