import React from "react";
import { action } from "@storybook/addon-actions";

import Failed from "./Failed";

export default {
  component: Failed,
  title: "Failed",
  excludeStories: /.*Data$/,
};

export const failedData = {
  message:
    "Tidak berhasil menambahkan sumber data mustahik. Silakan dicoba lagi",
  confirmButton: "OK",
};

const actionsData = {
  onConfirm: action("onConfirm"),
};

export const Default = () => <Failed {...failedData} {...actionsData} />;
