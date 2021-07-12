import storageSession from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: "gobarber",
      storage: storageSession,
      whitelist: ["auth", "user"]
    },
    reducers
  );
  return persistedReducer;
};
