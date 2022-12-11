// @ts-check
import { observer } from "mobx-react";
import { Navigate } from "react-router-dom";
import rootStores from "../../Stores/Main";
const authStore = rootStores.AUTH_STORE;

/**
 * @typedef {{page: React.ReactElement}} RestrictedRouteProps
 * @type {React.FC<RestrictedRouteProps>}
 */
const RestrictedRoute = ({ page }) => {
  const { isUserLoggedIn } = authStore;
  return isUserLoggedIn ? page : <Navigate to="/login" />;
};

export default observer(RestrictedRoute);
