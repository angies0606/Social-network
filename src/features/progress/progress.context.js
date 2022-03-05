import {createContext, useContext} from 'react';

export const ProgressContext = createContext(null); // null - значение по умолчанию контекста

export function useProgressContext() {
  return useContext(ProgressContext);
}