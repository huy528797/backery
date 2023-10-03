import React from "react";
import { FunctionComponent } from "react";
import { Picker } from "zmp-ui";

interface TypeTableBookerProps {
  selectedType: string;
  onChange: (type: string) => void;
}

const TypeTableBooker: FunctionComponent<TypeTableBookerProps> = ({
  selectedType,
  onChange,
}) => {
  return (
    <div className="mb-4"> {/* Thêm lớp CSS để đẩy xuống dưới */}
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
    </div>
  );
};

export default TypeTableBooker;
