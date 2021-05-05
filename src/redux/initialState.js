import { defaultStyles, defaultTitle } from "@/constans";
import { clone } from "@core/utils";

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: "",
  title: defaultTitle,
  currentStyles: defaultStyles,
  openedDate: new Date().toJSON(),
};

const normalize = (state) => ({
  ...state,
  currentText: "",
  currentStyles: defaultStyles,
});

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState);
}