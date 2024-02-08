import { useCallback, useState } from "react";
import { useAppDispatch } from "./hooks";

function useThunk(thunk: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRan, setIsRan] = useState(false);
  const dispatch = useAppDispatch();

  //emptying the error & stop loading immediately
  const reset = () => {
    setLoading(false);
    setError(null);
    setIsRan(false);
  };

  //reseting the is ran state
  const resetIsRan = () => {
    setIsRan(false);
  };

  const runThunk = useCallback(
    async (arg: any) => {
      try {
        setLoading(true);
        await dispatch(thunk(arg)).unwrap();
        setIsRan(true);
      } catch (err: any) {
        setError(err.message);
        setIsRan(false);
      } finally {
        setLoading(false);
      }
    },
    [thunk, dispatch]
  );

  return [runThunk, loading, error, reset, isRan, resetIsRan];
}

export { useThunk };
