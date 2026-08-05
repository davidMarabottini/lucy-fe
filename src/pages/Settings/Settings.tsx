import Card from "@/components/atoms/Card/Card";
import Switch from "@/components/atoms/Switch/Switch";
import { useViewStore } from "@/zustand/listViewAsCard";

const Settings = () => {
  const { isCardView, toggleView } = useViewStore();
  return(
  <Card additionalClassName="p-settings">
    <Switch label="Visualizza come Card" onChange={toggleView} value={isCardView} />
  </Card>)
}

export default Settings;