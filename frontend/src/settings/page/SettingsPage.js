import React from "react";
import AppLayout from "../../app/AppLayout";
import {SettingsDetails} from "../dump/SettingsDetails";

class SettingsPage extends React.Component {
  render() {
      return (
          <AppLayout>
            <SettingsDetails />
          </AppLayout>
      )
  }
}

export default SettingsPage;