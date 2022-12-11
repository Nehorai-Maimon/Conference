// @ts-check
import { observer } from "mobx-react";
import rootStores from "../../Stores/Main";
const authStore = rootStores.AUTH_STORE;

const Home = () => {
  const { setUser, user } = authStore;

  return (
    <div>
      <button onClick={() => setUser(null)}>Logout</button>
      <h1>
        {user.firstName} {user.lastName}
      </h1>
      <h2>{user.email}</h2>
      <h3>{user.phone}</h3>

      <pre style={{ textAlign: "left", fontSize: "10px" }}>
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  );
};

export default observer(Home);
