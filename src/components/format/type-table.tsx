import React from "react";
import { FunctionComponent } from "react";
import { Picker } from "zmp-ui";

interface TableOrderTypePickerProps {
  selectedType: string;
  onChange: (type: string) => void;
}

const TableOrderTypePicker: FunctionComponent<TableOrderTypePickerProps> = ({
  selectedType,
  onChange,
}) => {
  return (
    <Picker
      mask
      maskClosable
      title="Loại bàn"
      action={{
        text: "Chọn",
        close: true,
      }}
      placeholder="Chọn loại bàn"
      defaultValue={{ value: selectedType }}
      onChange={({ type }) => onChange(type.value as string)}
      data={[
        {
          options: [
            { value: "normal", displayName: "Bàn thường" },
            { value: "party", displayName: "Bàn tiệc" },
          ],
          name: "type",
        },
      ]}
    />
  );
};

export default TableOrderTypePicker;
