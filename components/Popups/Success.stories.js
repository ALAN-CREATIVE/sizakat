import React from "react";
import { action } from "@storybook/addon-actions";

import Success from "./Success";

export default {
  component: Success,
  title: "Success",
  excludeStories: /.*Data$/,
};

export const successData = {
  message: "RT 04 RW 016 Penggilingan berhasil ditambahkan",
  confirmButton: "OK",
};

const actionsData = {
  onConfirm: action("onConfirm"),
};

export const Default = () => <Success {...successData} {...actionsData} />;
