import React from "react";
import AppLayout from "../../app/AppLayout";
import {SettingsDetails} from "../dump/SerttingsDetails;

const SettingsPage = () => {
  const [settings, setSettings] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
        const result = await axios(`/private/settings`);
        setSettings(result.data);
    };
    
    fetchData();
  }, [projectId]);

  return (
    <AppLayout>
      <SettingsDetails />
    </AppLayout>

  );
};

export default SettingsPage;