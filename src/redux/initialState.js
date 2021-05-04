import { storage } from "@core/utils";
import { defaultStyles, defaultTitle } from "@/constans";

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: "",
  title: defaultTitle,
  currentStyles: defaultStyles,
};

const normalize = (state) => ({
  ...state,
  currentText: "",
  currentStyles: defaultStyles,
});

export const initialState = storage("excel-state")
  ? normalize(storage("excel-state"))
  : defaultState;
